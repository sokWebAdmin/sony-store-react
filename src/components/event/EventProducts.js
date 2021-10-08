import React, {useState, useEffect, useContext} from 'react';
import { toCurrencyString } from '../../utils/unit';
import { Link, useHistory } from 'react-router-dom';
import { postCart, postOrderSheets } from '../../api/order';
import gc from '../../storage/guestCart';
import GlobalContext from '../../context/global.context';
import { getProductOptions } from '../../api/product';
import qs from 'qs';
import { useAlert } from '../../hooks';
import Notification from '../products/Notification';
import Alert from '../common/Alert';

const ERROR_CODE_MAPPING_ROUTE = {
  O8001: {
    msg: `회원만 구매 가능한 상품입니다.<br/>로그인해 주세요.`,
    route: '/member/login',
  },
};

const EventProducts = ({event, filterLabel, grade, gift = false}) => {
  const { isLogin } = useContext(GlobalContext);
  const history = useHistory();
  const [section, setSection] = useState(event?.section.flatMap(({ products }) => products));
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [giftVisible, setGiftVisible] = useState(false);

  const goCart = async (productNo) => {
    const {data} = await getProductOptions(productNo);
    const products = [data.flatOptions[0]].map((option) => {
      return {
        productNo,
        orderCnt: 1,
        channelType: null,
        optionInputs: null,
        ...option
      }
    })

    try {
      if (isLogin) {
        await postCart(products);
      } else {
        gc.set(products);
      }
      history.push('/cart');
    } catch(e) {
      console.error(e);
    }
  }

  const getOrderSheetNo = async (productNo, selectedOption) => {
    try {
      const { data } = await postOrderSheets({
        productCoupons: null,
        trackingKey: null,
        cartNos: null,
        channelType: null,
        products: selectedOption.map(p => ({
          channelType: null,
          orderCnt: p.buyCnt,
          optionInputs: null,
          optionNo: p.optionNo,
          productNo: p.productNo
        }))
      });
      return data;
    } catch(e) {
      console.error(e);
    }
  };

  const getHistoryInfo = pathname => ({
    pathname,
    state: { next: history.location.pathname },
  });

  const _getOrderSheetNo = async (productNo, pathname) => {
    try {
      const {data} = await getProductOptions(productNo);

      const result = await getOrderSheetNo(productNo, [{ ...data.flatOptions[0], buyCnt: 1, productNo }]);

      if (result?.code) {
        ERROR_CODE_MAPPING_ROUTE[result.code]?.msg
          ?
          openAlert(
            ERROR_CODE_MAPPING_ROUTE[result.code]?.msg,
            () => () => history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[result.code]?.route))
          )
          :
          openAlert(result?.message);
      } else {
        history.push({
          pathname,
          search: '?' + qs.stringify(result),
        });
      }

    } catch(e) {
      e?.message && openAlert(e.message);
      console.log(e);
    }
  }

  const order = async (productNo, pathname = '/order/sheet') => {
    if (!isLogin) {
      const GUEST_ERROR = 'O8001';
      openAlert(
        ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.msg,
        () => () => history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.route))
      );
      return;
    }

    _getOrderSheetNo(productNo, pathname);
  }

  const giftProduct = (productNo) => {
    if (isLogin) {
      order(productNo, '/gift/sheet');
    } else {
      setGiftVisible(true);
    }
  }

  useEffect(() => {
    if (!filterLabel || filterLabel === '전체') {
      setSection(event?.section.flatMap(({ products }) => products));
      return;
    }
    const newSection = event.section.find(({label}) => label === filterLabel).products;
    newSection && setSection(newSection);
  }, [filterLabel]);

  useEffect(() => {
    if (!grade) return;

    const newSection = !filterLabel || filterLabel === '전체' ? event?.section.flatMap(({ products }) => products) : event.section.find(({label}) => label === filterLabel).products;
    if (grade === '전체') {
      newSection && setSection(newSection);
      return;
    }
    const newGradeSection = newSection.filter(({stickerLabels}) => stickerLabels.length > 0 && stickerLabels[0] === grade)
    newGradeSection && setSection(newGradeSection);
  }, [grade, filterLabel]);

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {giftVisible && <Notification setNotificationVisible={setGiftVisible} type='gift' />}
      <div className="event_prd_list">
        {section.length > 0 ? section.map((product) => {
          return (
            <div className="product" key={product.productNo}>
              {product.immediateDiscountAmt + product.additionDiscountAmt > 0 && <span className="badge_txt">
                          {toCurrencyString(product.immediateDiscountAmt + product.additionDiscountAmt)}
                <span className="unit">원</span> OFF
                        </span>}
              {product.stickerLabels.length > 0 && <span className={`badge_state state_${product.stickerLabels[0].substring(0, 1).toLowerCase()}`}>{product.stickerLabels[0].substring(0, 1)}<span className="txt">급</span></span>}
              <div className="product_pic">
                <Link className="product_link" to={`/product-view/${product.productNo}`}>
                  <img
                    src={product.imageUrls[0]}
                    alt={product.productName}
                  />
                </Link>
                {!product.stockCnt && <div className="sold_out">
                  <span>SOLD OUT</span>
                </div>}
              </div>
              <div className="product_name">
                <a href="javascript:void(0)" className="product_name_title">
                  {product.productName}
                </a>
                <p className="product_name_desc">
                  {product.productNameEn}
                </p>
                <div className="product_name_price">
                  {product.salePrice !== product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt ?
                    <>
                      <div className="original">
                        {toCurrencyString(product.salePrice)} <span className="unit">원</span>
                      </div>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </> :
                    <>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </>}
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s view" onClick={() => history.push(`/product-view/${product.productNo}`)}><i
                    className="ico search" />제품 보기
                  </button>
                  {gift && <button type="button" className="button button_secondary button-s" onClick={() => giftProduct(product.productNo)}>
                    <i className="ico gift"></i>선물
                  </button>}
                  <button
                    type="button"
                    className="button button_positive button-s"
                    onClick={() => goCart(product.productNo)}
                  >
                    바로 구매
                  </button>
                </div>
              </div>
            </div>
          );
        }) : <div className="no_data">
          <span className="ico_no_data">등록된 상품이 없습니다.</span>
        </div>}
      </div>
      <div className="button_wrap">
        <Link to="/event/list" className="button button_positive">목록</Link>
      </div>
    </>
  );
};

export default EventProducts;
