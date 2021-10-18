import React, { useState, useEffect, useContext, createRef, useMemo } from 'react';
import { toCurrencyString } from '../../utils/unit';
import { Link, useHistory } from 'react-router-dom';
import { getCartCount, postCart, postOrderSheets } from '../../api/order';
import gc from '../../storage/guestCart';
import GlobalContext from '../../context/global.context';
import { getProductOptions } from '../../api/product';
import qs from 'qs';
import { useAlert, useMediaQuery } from '../../hooks';
import Notification from '../products/Notification';
import Alert from '../common/Alert';
import HsValidator from '../cart/HsValidator';
import { unescape } from 'lodash';
import { getSaleStatus } from '../../utils/product';
import { setCartCount, useHeaderDispatch } from '../../context/header.context';
import styled from 'styled-components';

const ERROR_CODE_MAPPING_ROUTE = {
  O8001: {
    msg: `회원만 구매 가능한 상품입니다.<br/>로그인해 주세요.`,
    route: '/member/login',
  },
};

const forGradeTags = ['liveon', 'refurbish', 'employee'];

const filterProductsByGrade = (event, isGrade) => event?.section.flatMap(({ products }) => products)?.filter(({ hsCode }) => isGrade === !!hsCode);

const EventProducts = ({ event, filterLabel, grade, gift = false, sectionImage = false }) => {
  const { isLogin } = useContext(GlobalContext);
  const headerDispatch = useHeaderDispatch();
  const history = useHistory();
  const onlyMo = useMediaQuery('(max-width: 640px)');

  const isMemberGrade = useMemo(() => {
    const splitPathname = history.location.pathname.split('/');
    return forGradeTags.includes(splitPathname[splitPathname.length - 2]);
  }, [history.location.pathname]);

  const [section, setSection] = useState(filterProductsByGrade(event, isMemberGrade));
  // const [optionInfos, setOptionInfos] = useState(null);
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [giftVisible, setGiftVisible] = useState(false);

  const goCart = async (productNo, hsCode) => {
    const succeed = await hsValidation(!!hsCode);
    if (!succeed) return;

    const { data } = await getProductOptions(productNo);
    const products = [data.flatOptions[0]].map((option) => {
      return {
        productNo,
        orderCnt: 1,
        channelType: null,
        optionInputs: null,
        ...option,
      };
    });

    try {
      if (isLogin) {
        const result = await postCart(products);
        result?.error && result?.message && openAlert(result.message);
        getCartCount().then(({ data: { count } }) => setCartCount(headerDispatch, count));
      } else {
        gc.set(products);
        gc.fetch();
        setCartCount(headerDispatch, gc.items.length);
      }
      history.push('/cart');
    } catch (e) {
      console.error(e);
    }
  };

  const getOrderSheetNo = async (productNo, selectedOption) => {
    try {
      const { data } = await postOrderSheets({
        productCoupons: null,
        trackingKey: null,
        cartNos: null,
        channelType: null,
        products: selectedOption.map((p) => ({
          channelType: null,
          orderCnt: p.buyCnt,
          optionInputs: null,
          optionNo: p.optionNo,
          productNo: p.productNo,
        })),
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getHistoryInfo = (pathname) => ({
    pathname,
    state: { next: history.location.pathname },
  });

  const _getOrderSheetNo = async (productNo, pathname) => {
    try {
      const { data } = await getProductOptions(productNo);

      const result = await getOrderSheetNo(productNo, [{ ...data.flatOptions[0], buyCnt: 1, productNo }]);

      if (result?.code) {
        ERROR_CODE_MAPPING_ROUTE[result.code]?.msg
          ? openAlert(ERROR_CODE_MAPPING_ROUTE[result.code]?.msg, () => () =>
            history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[result.code]?.route)),
          )
          : openAlert(result?.message);
      } else {
        history.push({
          pathname,
          search: '?' + qs.stringify(result),
        });
      }
    } catch (e) {
      e?.message && openAlert(e.message);
      console.log(e);
    }
  };

  const order = async (productNo, pathname = '/order/sheet') => {
    if (!isLogin) {
      const GUEST_ERROR = 'O8001';
      openAlert(ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.msg, () => () =>
        history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.route)),
      );
      return;
    }

    _getOrderSheetNo(productNo, pathname);
  };

  const giftProduct = (productNo) => {
    if (isLogin) {
      order(productNo, '/gift/sheet');
    } else {
      setGiftVisible(true);
    }
  };

  useEffect(() => {
    if (!filterLabel || filterLabel === '전체') {
      setSection(filterProductsByGrade(event, isMemberGrade));
      return;
    }
    const newSection = event.section.find(({ label }) => label === filterLabel).products?.filter(({ hsCode }) => isMemberGrade === !!hsCode);
    newSection && setSection(newSection);
  }, [filterLabel]);

  useEffect(() => {
    if (!grade) return;

    const newSection =
      !filterLabel || filterLabel === '전체'
        ? filterProductsByGrade(event, isMemberGrade)
        : event.section.find(({ label }) => label === filterLabel).products?.filter(({ hsCode }) => isMemberGrade === !!hsCode);
    if (grade === '전체') {
      newSection && setSection(newSection);
      return;
    }
    const newGradeSection = newSection.filter(
      ({ stickerLabels }) => stickerLabels.length > 0 && stickerLabels[0] === grade,
    );
    newGradeSection && setSection(newGradeSection);
  }, [grade, filterLabel]);

  // const fetchOptions = async (productNos) => {
  //   const { data: { optionInfos } } = await getProductsOptions({ productNos });
  //   setOptionInfos(optionInfos);
  //   console.log(optionInfos);
  // }
  //
  // useEffect(() => {
  //   console.log(section.map(({productNo}) => productNo));
  //   fetchOptions(section.map(({productNo}) => productNo));
  // }, [section]);

  // hsValidation
  const hsValidator = createRef(null);
  const hsValidation = async validation => await hsValidator.current.validation(validation);

  const sectionMap = (product) => {
    const isSoldOut = ['SOLDOUT', 'READY'].includes(saleStatus(product));
    return (
      <div className="product" key={product.productNo}>
        {product.immediateDiscountAmt + product.additionDiscountAmt > 0 && (
          <span className="badge_txt">
                    {toCurrencyString(product.immediateDiscountAmt + product.additionDiscountAmt)}
            <span className="unit">원</span> OFF
                  </span>
        )}
        {product.stickerLabels.length > 0 && (
          <span className={`badge_state state_${product.stickerLabels[0].substring(0, 1).toLowerCase()}`}>
                    {product.stickerLabels[0].substring(0, 1)}
            <span className="txt">급</span>
                  </span>
        )}
        <div className="product_pic">
          <Link className="product_link" to={`/product-view/${product.productNo}`}>
            <img src={product.imageUrls[0]} alt={product.productName} />
          </Link>
          {isSoldOut && (
            <div className="sold_out">
              <span>SOLD OUT</span>
            </div>
          )}
        </div>
        <div className="product_name">
          <Link to={`/product-view/${product.productNo}`} className="product_name_title">
            {unescape(product.productName)}
          </Link>
          <p className="product_name_desc">{product.productNameEn}</p>
          <div className="product_name_price">
            {product.salePrice !==
            product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt ? (
              <>
                <div className="original">
                  {toCurrencyString(product.salePrice)} <span className="unit">원</span>
                </div>
                <div className="sale">
                  {toCurrencyString(
                    product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt,
                  )}{' '}
                  <span className="unit">원</span>
                </div>
              </>
            ) : (
              <>
                <div className="sale">
                  {toCurrencyString(
                    product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt,
                  )}{' '}
                  <span className="unit">원</span>
                </div>
              </>
            )}
          </div>
          <div className="product_btn_wrap">
            {!isSoldOut && gift && (
              <button
                type="button"
                className="button button_secondary button-s"
                onClick={() => giftProduct(product.productNo)}
              >
                <i className="ico gift"></i>선물
              </button>
            )}
            <button
              type="button"
              className="button button_positive button-s"
              onClick={() => goCart(product.productNo, product.hsCode)}
              disabled={isSoldOut}
            >
              {isSoldOut ? '일시품절' : '바로 구매'}
            </button>
            <HsValidator ref={hsValidator} />
          </div>
        </div>
      </div>
    );
  };

  // 판매상태
  const saleStatus = p => getSaleStatus({ saleStatusType: p.saleStatusType }, p.reservationData, p.stockCnt, p.reservationData?.reservationStockCnt);
  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {giftVisible && <Notification setNotificationVisible={setGiftVisible} type="gift" />}
      {sectionImage ?
        event.section.map(({ imageUrl, products }, index) => {
          return (
            <>
              <SectionImage onlyMo={onlyMo}>
                <img src={imageUrl} alt="" style={{ width: '100%' }} />
              </SectionImage>
              <div className="event_tablist type1">
                <div className="employee_prd">
                  <div className="event_prd_list">
                    {products.length > 0 ? products.map(sectionMap) : null}
                  </div>
                  {index === event.section.length - 1 && <div className="button_wrap">
                    <Link to="/event/list" className="button button_positive">
                      목록
                    </Link>
                  </div>}
                </div>
              </div>
            </>
          );
        }) :
        <div className="event_tablist type1">
          <div className="employee_prd">
            <div className="event_prd_list">
              {section.length > 0 ? section.map(sectionMap) : null}
            </div>
            <div className="button_wrap">
              <Link to="/event/list" className="button button_positive">
                목록
              </Link>
            </div>
          </div>
        </div>
      }
    </>
  );
};

const SectionImage = styled.div`
  position: relative; 
  max-width: ${({ onlyMo }) => onlyMo ? '760px' : '1200px'}; 
  margin: 0 auto; 
  padding-top: 80px;
`;

export default EventProducts;
