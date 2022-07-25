import qs from 'qs';
import React, { useContext, useState, createRef, useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import GlobalContext from '../../../context/global.context';
import { getCart, getCartCount, postCart, postGuestCart, postOrderSheets } from '../../../api/order';
import { postProfileLikeProducts, postProductsSearchByNos } from '../../../api/product';
import Alert from '../../common/Alert';
import Notification from '../Notification';
import { useAlert } from '../../../hooks';
import gc from '../../../storage/guestCart';
import HsValidator from '../../cart/HsValidator';
import _ from 'lodash';
import { debounce } from 'lodash';
import orderPayment from '../../order/orderPayment';
import { setCartCount, useHeaderDispatch } from '../../../context/header.context';

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
        productNo: p.productNo ?? productNo,
      })),
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getCartRequest = (productNo, options) => {
  return options.map(({ buyCnt, ...rest }) => ({
    productNo,
    orderCnt: buyCnt,
    channelType: null,
    optionInputs: null,
    ...rest,
  }));
};

const ERROR_CODE_MAPPING_ROUTE = {
  O8001: {
    msg: `회원만 구매 가능한 상품입니다.<br/>로그인해 주세요.`,
    route: '/member/login',
  },
};

const mergeWithOrderCnt = (accProduct, currProduct) => {
  if (accProduct.productNo === currProduct.productNo) {
    accProduct.orderCnt = accProduct.orderCnt + currProduct.orderCnt;
  } else {
    accProduct = {
      ...accProduct,
      ...currProduct,
    };
  }
  return accProduct;
};

const mapOrderCnt = (products, productNos) =>
  _.chain(products)
    .filter((o) => productNos.includes(o.productNo))
    .map(({ productNo, optionNo, orderCnt }) => ({ productNo, optionNo, orderCnt }))
    .reduce(mergeWithOrderCnt, {})
    .value();

const scrollHandle = () => {
  const $body = document.querySelector('body');
  return {
    stop() {
      $body.classList.add('no_scroll');
    },
    start() {
      $body.classList.remove('no_scroll');
    },
  };
};

const naverPayErrorHandle = (error, history) => {
  const ERROR_CODE = {
    NO_EXHIBITION: 'PPVE0019',
  };

  if (error?.code === ERROR_CODE.NO_EXHIBITION) {
    history.push('/');
    return;
  }
};

export default function ButtonGroup({
  selectedOption,
  productNo,
  canBuy,
  wish,
  setWish,
  saleStatus,
  memberOnly,
  hsCode,
  isMobileSize,
  setOptionVisible,
  optionVisible,
  limitaions,
  naverPayBtnKey,
}) {
  const history = useHistory();
  const headerDispatch = useHeaderDispatch();
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const { isLogin } = useContext(GlobalContext);
  const [giftVisible, setGiftVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [wishVisible, setWishVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);

  const maxBuyTimeCnt = useMemo(() => limitaions?.maxBuyTimeCnt, [limitaions]);

  const scroll = scrollHandle();
  useEffect(() => {
    isMobileSize && optionVisible ? scroll.stop() : scroll.start();
    return () => scroll.start();
  }, [isMobileSize, optionVisible]);

  const nextUri = history.location.pathname;
  const getHistoryInfo = (pathname) => ({
    pathname,
    state: { next: nextUri },
  });

  const goToOrderPage = (result, pathname) => {
    if (result?.code) {
      ERROR_CODE_MAPPING_ROUTE[result.code]?.msg
        ? openAlert(
            ERROR_CODE_MAPPING_ROUTE[result.code]?.msg,
            () => () => history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[result.code]?.route)),
          )
        : (result.code === 'PPVE0011' 
        ? openAlert('상품의 재고가 충분하지 않습니다.') : 
          ((result.code === 'O8002' || result.code === 'O8003' || result.code === 'O8004' 
          ? openAlert('최대 구매 가능갯수를 초과하였습니다.') :
            openAlert(result?.message))));
    } else {
      history.push({
        pathname,
        search: '?' + qs.stringify(result),
      });
    }
  };

  const fetchOrderSheetNo = async (no = productNo, option = selectedOption, pathname = '/order/sheet') => {
    try {
      const result = await getOrderSheetNo(no, option);
      goToOrderPage(result, pathname);
    } catch (e) {
      e?.message && openAlert(e.message);
    }
  };

  const order = (pathname = '/order/sheet', type) => {
    if (isMobileSize && !optionVisible) {
      setOptionVisible(true);
      return;
    }

    if (!canBuy) {
      openAlert('옵션을 선택하세요.');
      return;
    }

    if (memberOnly && !isLogin) {
      const GUEST_ERROR = 'O8001';
      openAlert(
        ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.msg,
        () => () => history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.route)),
      );
      return;
    }

    if (type === 'naverPay') {
      return;
    }

    if (isLogin) {
      fetchOrderSheetNo(productNo, selectedOption, pathname);
      return;
    }

    setOrderVisible(true);
  };

  const gift = () => {
    if (isLogin) {
      order('/gift/sheet');
    } else {
      setGiftVisible(true);
    }
  };

  const _getCartRequest = async (productNo, selectedOption) => {
    const products = getCartRequest(productNo, selectedOption);

    try {
      if (isLogin) {
        const result = await postCart(products);
        if (result?.data?.error && result?.data?.code) {
          if (result.data.code === 'PPVE0011') {
            openAlert("상품의 재고가 충분하지 않습니다.");
            return;
          }
          if (result.data.code === 'O8002' || result.data.code === 'O8003' || result.data.code === 'O8004') {
            alert('최대 구매 가능갯수를 초과하였습니다.');
            return;
          }
        }
        getCartCount().then(({ data: { count } }) => setCartCount(headerDispatch, count));
      } else {
        const resultGuest = await postGuestCart(products);
        const guestData = resultGuest?.data;
        
        if (guestData?.invalidProducts?.length) {
          let invProducts = guestData.invalidProducts;
          for (let invProduct of invProducts) {
            let invOptions = invProduct.orderProductOptions;
            let soldOutOpt = invOptions.find(invOpt => invOpt.soldOut);
            if (soldOutOpt?.soldOut) {
                openAlert("상품의 재고가 충분하지 않습니다.");
                return;
            }
          }
        }
        gc.set(products.map((product) => ({ ...product, hsCode }))); // TODO.
        // 확인필요. @jk
        gc.fetch();
        setCartCount(headerDispatch, gc.items.length);
      }

      setCartVisible(true);
    } catch (e) {
      e?.message && openAlert(e.message);
    }
  };

  const countProductsInCart = async (productNos) => {
    if (isLogin) {
      const { data } = await getCart();
      return mapOrderCnt(
        _.chain(data.deliveryGroups)
          .flatMap(({ orderProducts }) => orderProducts)
          .flatMap(({ orderProductOptions }) => orderProductOptions),
        productNos,
      );
    } else {
      return mapOrderCnt(gc.items, productNos);
    }
  };

  const hasLimitedProduct = async () => {
    if (maxBuyTimeCnt > 0) {
      const counts = await countProductsInCart(selectedOption.flatMap(({ productNo }) => productNo));
      return !_.every(counts, (c) => maxBuyTimeCnt - c.orderCnt > 0);
    }
    return false;
  };

  const cart = async () => {
    if (memberOnly && !isLogin) {
      const GUEST_ERROR = 'O8001';
      openAlert(
        ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.msg,
        () => () => history.push(getHistoryInfo(ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.route)),
      );
      return;
    }

    if (!validateOption()) {
      return;
    }

    if (await hasLimitedProduct()) {
      openAlert(`구매 수량 제한 상품입니다. (제한 수량: ${maxBuyTimeCnt})`);
      return;
    }

    const succeed = await hsValidation(!!hsCode);

    if (succeed) {
      _getCartRequest(productNo, selectedOption);
    }
  };

  function validateOption() {
    if (isMobileSize && !optionVisible) {
      setOptionVisible(true);
      return false;
    }

    if (!canBuy) {
      openAlert('옵션을 선택하세요.');
      return false;
    }
    return true;
  }

  const wishHandler = () => {
    if (!isLogin) {
      setWishVisible(true);
      return;
    }

    if (!validateOption()) {
      return;
    }

    postWish(selectedOptionsProductNos);
  };

  async function postWish(productNos) {
    try {
      const requestBody = { productNos };
      const { data } = await postProfileLikeProducts(requestBody);
      setWish(data[0].result);
    } catch (e) {
      e?.message && openAlert(e.message);
    }
  }
  const debounceClick = debounce( (productNo,type) => btnTypeEvent(productNo, type),100,);
  const handleClick = (e, type) => {
    // main
    e.preventDefault();
    debounceClick(productNo, type);
  };

  // hsValidation
  const hsValidator = createRef(null);
  const hsValidation = async (validation) => await hsValidator.current.validation(validation);

  // naverPay
  const naver = window.naver;
  const naverPayOrder = () => {
    order('', 'naverPay');

    const requestBody = selectedOption.map((o) => ({
      productNo: o.productNo,
      optionNo: o.optionNo,
      additionalProductNo: 0,
      orderCnt: o.orderCnt,
    }));

    orderPayment.naverPayOrder(requestBody, naverPayErrorHandle);
  };
  const naverPayWishHandler = () => orderPayment.naverPayWishList(productNo);

  const naverPayRef = useRef(null);
  useEffect(() => {
    if (naverPayRef?.current) {
      naverPayRef.current.innerHTML = '';

      naver.NaverPayButton.apply({
        EMBED_ID: 'naverPay',
        BUTTON_KEY: 'AAAA', // @TODO 발급받은 buttonKey를 추가해주세요
        TYPE: 'A',
        COLOR: 1,
        COUNT: 2,
        ENABLE: 'Y', // 'Y' / 'N'
        BUY_BUTTON_HANDLER: naverPayOrder,
        WISHLIST_BUTTON_HANDLER: naverPayWishHandler,
      });
    }
  }, [selectedOption]);

  const isSoldOut = useMemo(() => saleStatus === 'SOLDOUT', [saleStatus]);
  const isBackOrdered = useMemo(() => saleStatus === 'READY', [saleStatus]);
  const selectedOptionsProductNos = useMemo(() => selectedOption.map((o) => o.productNo), [selectedOption]); //selectedOptionsProductNos 22.07.25 수정

  async function btnTypeEvent(productNo, type) {
    const STOP_MSG        = "구매하실 수 없는 제품입니다.";
    const PROHIBITION_MSG = "구매하실 수 없는 제품입니다.";
    const FINISHED_MSG    = "판매 대기중인 상품입니다.";
    const SOLDOUT_MSG     = "상품의 재고가 충분하지 않습니다.";
    const ERROR_MSG       = "잠시 후 다시 시도해 주세요.";

    try { 

      if ((isLogin && ( type === 'wish')) || type === 'cart' || type === 'gift' ) {

        if (!canBuy) {
          openAlert('옵션을 선택하세요.');
          return
        }

        const request = {
          productNos: selectedOptionsProductNos,
          hasOptionValues: true,
        };

        // 제품선택 옵션의 상품번호의 판매상태 체크로 변경 22.07.25
        const { data } = await postProductsSearchByNos(request); //postProductsSearchByNos 변경 22.07.25

        data.products.forEach((products) => {
          const saleStatusType = products.status.saleStatusType;
          const isSoldOut = products.status.soldout;
          switch (saleStatusType) {
            case 'STOP': // 판매중지
              openAlert(STOP_MSG);
              return;
            case 'PROHIBITION': // 판매금지
              openAlert(PROHIBITION_MSG);
              return;
            case 'READY': // 판매대기
            case 'FINISHED': // 판매종료
              openAlert(FINISHED_MSG);
              return;
            case 'ONSALE': // 판매중
              if(isSoldOut){
                openAlert(SOLDOUT_MSG);
                return;
              }
              break;
            default:
              break;
          }
        });
      }

      switch (type) {
        case 'gift':
          gift();
          break;
        case 'order':
          order();
          break;
        case 'cart':
          cart();
          break;
        case 'wish':
          wishHandler();
          break;
        case 'reserve':
          order();
          break;
        default:
          break;
      }

    }
    catch (e) {
      e?.message && console.log(e.message);
      openAlert(ERROR_MSG);
      return;
    }
  };

  return (
    <>
      <div className="result_btn_inner">
        <div className="result_btn_box">
          <ul>
            <li className="like">
              <a href="#none" className={`btn_icon ${wish && 'on'}`} onClick={(e) => handleClick(e, 'wish')}>
                찜하기
              </a>
            </li>
            <li className="cart">
              <a href="/cart" className="btn_icon" onClick={(e) => handleClick(e, 'cart')}>
                장바구니
              </a>
              <HsValidator ref={hsValidator} />
            </li>
            <li className="gift">
              <a href="/gift/sheet" className="btn_icon" onClick={(e) => handleClick(e, 'gift')}>
                선물
              </a>
            </li>
            <li className="final">
              {saleStatus === '' && (
                <a
                  href="/order/sheet"
                  onClick={(e) => handleClick(e, 'order')}
                  className="btn_style direct"
                  style={{ backgroundColor: '#000' }}
                >
                  바로 구매하기
                </a>
              )}
              {saleStatus === 'RESERVE' && (
                <a
                  onClick={(e) => handleClick(e, 'reserve')}
                  href="#none"
                  className="btn_style reservation"
                  style={{ display: 'block', backgroundColor: '#5865F5' }}
                >
                  예약판매
                </a>
              )}
              {saleStatus === 'READY_RESERVE' && (
                <a href="#none" className="btn_style disabled" style={{ display: 'block', backgroundColor: '#ff4e4e' }}>
                  출시예정
                </a>
              )}
              {saleStatus === 'READY' && (
                <a href="#none" className="btn_style disabled" style={{ display: 'block', backgroundColor: '#888' }}>
                  일시품절
                </a>
              )}
              {saleStatus === 'SOLDOUT' && (
                <a href="#none" className="btn_style disabled" style={{ display: 'block', backgroundColor: '#ddd' }}>
                  품절
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
      <a
        href="#none"
        onClick={(e) => {
          e.preventDefault();
          setOptionVisible(false);
        }}
        className="select_closed"
        title="선택 목록 닫기"
      >
        닫기
      </a>
      {giftVisible && <Notification setNotificationVisible={setGiftVisible} type="gift" />}
      {cartVisible && <Notification setNotificationVisible={setCartVisible} type="cart" />}
      {wishVisible && <Notification setNotificationVisible={setWishVisible} unusableIcon={true} type="wish" />}
      {orderVisible && (
        <Notification
          setNotificationVisible={setOrderVisible}
          type="order"
          unusableIcon={true}
          goOrder={fetchOrderSheetNo}
          popupType="popCont"
        />
      )}
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {/* 
      @TODO 네이버페이 버튼 키 추가 후, 주석 풀기
      {naverPayBtnKey && (
        <div className="cont naver" style={{ marginTop: '24px', paddingTop: 0 }}>
          <button
            ref={naverPayRef}
            style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            id="naverPay"
          ></button>
        </div>
      )} 
      */}
    </>
  );
}
