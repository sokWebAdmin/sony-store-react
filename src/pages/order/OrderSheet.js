import {
  useEffect,
  useCallback,
  useState,
  useContext,
  useMemo,
  createRef,
} from 'react';
import GlobalContext from '../../context/global.context';
import { useHistory } from 'react-router';
import { usePrevious } from '../../hooks';

import orderPayment from '../../components/order/orderPayment.js';
import paymentType from '../../const/paymentType';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Products from '../../components/order/Products';
import Accordion from '../../components/common/surface/Accordion';

import OrdererForm from '../../components/order/OrdererForm';
import ShippingAddressForm from '../../components/order/ShippingAddressForm';
import GiftReceiverForm from '../../components/order/GiftReceiverForm';
import DiscountForm from '../../components/order/DiscountForm';
import PaymentForm from '../../components/order/PaymentForm';
import GuestPasswordForm from '../../components/order/GuestPasswordForm';
import Calculator from '../../components/order/Calculator';

//api
import { getOrderSheets, postOrderSheetCalculate } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';
import '../../assets/scss/partials/orderBreadcrum.scss';
import '../../assets/scss/partials/orderSheet.scss';

// functions
import { getUrlParam } from '../../utils/location';
import { truncate } from '../../utils/unit';
import { useGuestState } from '../../context/guest.context';
import { getAgent } from '../../utils/detectAgent';

const agent = getAgent();

const OrderSheet = ({ location }) => {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);
  const { orderAgree } = useGuestState();

  const [products, setProducts] = useState([]);
  const [deliveryGroups, setDeliveryGroups] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [recentAddresses, setRecentAddresses] = useState([]);

  const orderCnt = useMemo(() => {
    return deliveryGroups.flatMap(group => group.orderProducts).
      flatMap(orderProduct => orderProduct.orderProductOptions).
      reduce((acc, { orderCnt }) => orderCnt + acc, 0);
  }, [deliveryGroups]);

  // form refs
  const ordererForm = createRef();
  const shippingAddressForm = createRef();
  const giftReceiverForm = createRef();
  const guestPasswordForm = createRef();

  // form data
  const [orderer, setOrderer] = useState({
    ordererName: '',
    ordererContact1: '',
    ordererEmail: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    addressNo: null,
    countryCd: null,
    addressName: null,
    receiverName: '',
    receiverZipCd: null,
    receiverAddress: null,
    receiverDetailAddress: null,
    receiverJibunAddress: null,
    shippingInfoLaterInputContact: '',
    receiverContact1: '',
    receiverContact2: null,
    customsIdNumber: null,
    requestShippingDate: null,
    deliveryMemo: null,
  });
  const prevShippingAddress = usePrevious(
    { shippingAddress, setShippingAddress });

  const [discount, setDiscount] = useState({
    subPayAmt: 0,
    coupons: {
      productCoupons: [],
    },
  });

  const [tempPassword, setTempPassword] = useState(null);

  const orderSheetNo = useMemo(() => getUrlParam('orderSheetNo'), [location]);
  const isGiftOrder = useMemo(() => location.pathname.includes('/gift'),
    [location]);

  const [payment, setPayment] = useState({
    pgType: paymentType.creditCard.pgType,
    payType: paymentType.creditCard.payType,
  });

  const calculate = async () => {
    const request = {
      pathVariable: {
        orderSheetNo,
      },
      requestBody: getCalculateInfo(),
    };

    try {
      const { data: { paymentInfo } } = await postOrderSheetCalculate(request);
      if (paymentInfo) {
        setPaymentInfo(paymentInfo);
      }
    }
    catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!discount.subPayAmt && !discount.coupons.productCoupons.length) {
      return;
    }
    calculate();
  }, [discount]);
  useEffect(() => {
    const prevZip = prevShippingAddress?.shippingAddress.receiverZipCd;
    const zip = shippingAddress.receiverZipCd;
    if (!zip) {
      return;
    }

    if (prevZip !== zip) {
      calculate();
    }

  }, [shippingAddress]);

  const init = useCallback(() => ({
    async start () {
      if (!isLogin && isGiftOrder) {
        alert('로그인시 선물하기가 가능합니다.');
        history.goBack();
        return;
      }

      if (!isLogin) {
        const notAgree = !this.guestAgreeCheck();
        if (notAgree) {
          return;
        }
      }

      /* DEVELOPMENT ONLY */
      if (process.env.NODE_ENV === 'development') {
        window['kcpInject'] = () => setPayment({
          ...payment, pgType: 'KCP',
        });
      }

      try {
        await this.fetchOrderSheet(orderSheetNo);
      }
      catch (err) {
        alert(err.message);
        history.goBack();
      }
    },
    guestAgreeCheck () {
      if (!orderAgree) {
        history.push(
          `/order/agree?accessOrderSheetNo=${orderSheetNo}`);
      }

      return orderAgree;
    },
    async fetchOrderSheet (orderSheetNo) {
      try {
        const res = await getOrderSheets(
          orderSheetNo);
        if (res.status === 400) {
          return Promise.reject(res.data);
        }
        const { data: { ordererContact, deliveryGroups, paymentInfo, orderSheetAddress } } = res;
        isLogin && setOrderer(ordererContact);
        setPaymentInfo(paymentInfo);
        setDeliveryGroups(deliveryGroups);
        orderSheetAddress &&
        setRecentAddresses(orderSheetAddress.recentAddresses.slice(0, 5));
      }
      catch (err) {
        console.error(err);
      }
    },
  }), []);

  const getPaymentInfo = () => {
    const result = {
      orderSheetNo: getUrlParam('orderSheetNo'),
      orderTitle: truncate(representativeProductName),
      ...payment, // payType, pgType
      orderer: { ...orderer },
      member: isLogin,
      updateMember: false,
      tempPassword,
      shippingAddress: { ...shippingAddress },
      paymentAmt: paymentInfo.paymentAmt,
      accumulationAmt: paymentInfo.accumulationAmt,
      availableMaxAccumulationAmt: paymentInfo.availableMaxAccumulationAmt,
      ...discount,
      deliveryMemo: shippingAddress.deliveryMemo,
      inAppYn: agent.isApp ? 'Y' : 'N',
    };

    delete result.shippingAddress.deliveryMemo;

    return result;
  };

  const getGiftPaymentInfo = () => {
    const result = {
      orderSheetNo: getUrlParam('orderSheetNo'),
      orderTitle: truncate(representativeProductName),
      ...payment, // payType, pgType
      orderer: { ...orderer },
      member: isLogin,
      updateMember: false,
      tempPassword,
      shippingAddress: { ...shippingAddress },
      paymentAmt: paymentInfo.paymentAmt,
      accumulationAmt: paymentInfo.accumulationAmt,
      availableMaxAccumulationAmt: paymentInfo.availableMaxAccumulationAmt,
      ...discount,
      inAppYn: agent.isApp ? 'Y' : 'N',
    };

    delete result.shippingAddress.deliveryMemo;
    delete shippingAddress.receiverContact1;

    return result;
  };

  const getCalculateInfo = () => ({
    accumulationUseAmt: discount?.subPayAmt || 0,
    addressRequest: { ...shippingAddress },
    couponRequest: {
      productCoupons: discount?.coupons?.productCoupons?.[0]
        ? [{ ...discount.coupons.productCoupons[0] }]
        : null,
    },
  });

  const submit = () => {
    if (!formValidation()) {
      return;
    }
    const paymentInfo = getPaymentInfo();
    orderPayment.run(paymentInfo);
  };

  const formValidation = () => {
    const entries = [
      ordererForm.current.fieldValidation,
    ];

    if (!isLogin) {
      entries.push(guestPasswordForm.current.fieldValidation);
    }
    isGiftOrder
      ? entries.push(giftReceiverForm.current.fieldValidation)
      : entries.push(shippingAddressForm.current.fieldValidation);

    return entries.every(func => func());
  };

  useEffect(() => {
    init().start();
  }, [init]);

  useEffect(() => {
    !isLogin 
      && shippingAddressForm?.current?.sameAsOrderer 
      && ordererForm.current.fieldValidation(true);
  });

  const representativeProductName = useMemo(
    () => deliveryGroups[0]?.orderProducts[0]?.productName);

  return (
    <>
      <SEOHelmet title={'주문/결제'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <h2 className="order_box__tit">주문·결제</h2>
              <ol className="order_box__list">
                {!isGiftOrder &&
                <li className="d_type">
                  <i className="step_ico cart" />
                  <p>장바구니</p>
                </li>
                }
                <li className="on">
                  <i className="step_ico order" />
                  <p>주문·결제</p>
                </li>
                <li>
                  <i className="step_ico confirm" />
                  <p>주문 완료</p>
                </li>
              </ol>
              <div className="order_box__cont">
                {/* 제품 정보 */}
                <div className="col_table_wrap order_list">
                  <div className="col_table">
                    <div className="col_table_head">
                      <div className="col_table_row">
                        <div className="col_table_cell">제품</div>
                        <div className="col_table_cell">가격</div>
                        <div className="col_table_cell">수량</div>
                        <div className="col_table_cell">합계</div>
                      </div>
                    </div>

                    <Products data={deliveryGroups} products={products}
                              setProducts={setProducts} />
                  </div>
                </div>
                <div className="clearFix" style={{ marginTop: '99px' }}>
                  {/* 왼쪽메뉴 */}
                  <div className="order_left">
                    <div className="acc acc_ui_zone">
                      <Accordion title={'주문자 정보'} defaultVisible={true}>
                        <p className="acc_dsc_top">표시는 필수입력 정보</p>
                        <OrdererForm ref={ordererForm}
                                     orderer={orderer}
                                     setOrderer={setOrderer} />
                      </Accordion>

                      {!isGiftOrder ?
                        <Accordion title={'배송지 정보'}
                                   defaultVisible={true}>
                          <p className="acc_dsc_top">표시는 필수입력 정보</p>
                          <ShippingAddressForm ref={shippingAddressForm}
                                               shipping={shippingAddress}
                                               orderer={orderer}
                                               setShipping={setShippingAddress}
                                               recentAddresses={recentAddresses}
                          />
                        </Accordion>
                        :
                        <Accordion title={'선물 받으실 분'}
                                   defaultVisible={true}>
                          <p className="acc_dsc_top">표시는 필수입력 정보</p>
                          <GiftReceiverForm
                            ref={giftReceiverForm}
                            shipping={shippingAddress}
                            setShipping={setShippingAddress}
                          />
                        </Accordion>
                      }

                      {isLogin &&
                      <Accordion title={'할인 정보'} defaultVisible={true}>
                        <DiscountForm discount={discount}
                                      setDiscount={setDiscount}
                                      paymentInfo={paymentInfo}
                                      orderSheetNo={orderSheetNo}
                                      orderProducts={products}
                        />
                      </Accordion>}

                      <Accordion title={'결제 방법'} defaultVisible={true}>
                        <PaymentForm
                          payment={payment}
                          setPayment={setPayment}
                          orderSheetNo={orderSheetNo}
                        />
                      </Accordion>

                      {!isLogin &&
                      <Accordion title={'비밀번호 설정'} defaultVisible={true}>
                        <GuestPasswordForm
                          ref={guestPasswordForm}
                          tempPassword={tempPassword}
                          setTempPassword={setTempPassword}
                        />
                      </Accordion>}
                    </div>
                    {/* // acc */}
                  </div>
                  {/*// 왼쪽메뉴 */}
                  {/* 오른쪽메뉴 */}
                  <div className="order_right">
                    <div className="acc acc_ui_zone">
                      {/* acc_item */}                  
                      <Calculator payment={submit}
                                  paymentInfo={paymentInfo}
                                  orderCnt={orderCnt} />
                    </div>
                  </div>
                  {/*// 오른쪽메뉴 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSheet;