import {
  useEffect,
  useCallback,
  useState,
  useContext,
  useMemo,
  forwardRef,
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
import DiscountForm from '../../components/order/DiscountForm';
import PaymentForm from '../../components/order/PaymentForm';
import GuestPasswordForm from '../../components/order/GuestPasswordForm';
import Calculator from '../../components/order/Calculator';

//api
import { getOrderSheets, postOrderSheetCalculate } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// functions
import { getUrlParam } from '../../utils/location';
import { truncate } from '../../utils/unit';
import qs from 'qs';
import { useGuestState } from '../../context/guest.context';

const OrderStep1 = ({ location }) => {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);
  const { orderAgree } = useGuestState();

  const [products, setProducts] = useState([]);
  const [deliveryGroups, setDeliveryGroups] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);

  // form refs
  const ordererForm = createRef();
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
    receiverName: null,
    receiverZipCd: null,
    receiverAddress: null,
    receiverDetailAddress: null,
    receiverJibunAddress: null,
    receiverContact1: null,
    receiverContact2: null,
    customsIdNumber: null,
    deliveryMemo: null, // not a shipping address member
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

    const { data: { paymentInfo } } = await postOrderSheetCalculate(request);
    if (paymentInfo) {
      setPaymentInfo(paymentInfo);
    }
  };
  useEffect(() => calculate(), [discount]);
  useEffect(() => {
    const prevZip = prevShippingAddress?.shippingAddress.receiverZipCd;
    const zip = shippingAddress.receiverZipCd;

    if (prevZip !== zip) {
      calculate();
    }

  }, [shippingAddress]);

  const init = useCallback(() => ({
    async start () {
      if (!isLogin) {
        this.guestAgreeCheck();
      }
      await this.fetchOrderSheet(orderSheetNo);
    },
    guestAgreeCheck () {
      if (!orderAgree) {
        console.log(location);
        history.push(`/order/agree?accessOrderSheetNo=${orderSheetNo}`);
      }
    },
    async fetchOrderSheet (orderSheetNo) {
      const { data: { deliveryGroups, paymentInfo } } = await getOrderSheets(
        orderSheetNo);
      setPaymentInfo(paymentInfo);
      setDeliveryGroups(deliveryGroups);
    },
  }), []);

  const getPaymentInfo = () => ({
    orderSheetNo: getUrlParam('orderSheetNo'),
    orderTitle: truncate(representativeProductName),
    ...payment, // payType, pgType
    orderer: { ...orderer },
    member: isLogin,
    updateMember: isLogin,
    tempPassword: isLogin ? null : '111111a!', // TODO. 비회원 임시 비번 넣으라
    shippingAddress: { ...shippingAddress },
    saveAddressBook: true, // TODO. 북마크 기능?
    useDefaultAddress: true, // TODO. 기본 주소?
    paymentAmt: paymentInfo.paymentAmt,
    accumulationAmt: paymentInfo.accumulationAmt,
    availableMaxAccumulationAmt: paymentInfo.availableMaxAccumulationAmt,
    ...discount,
  });

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
    if (!fieldValidation()) {
      return;
    }
    const paymentInfo = getPaymentInfo();
    orderPayment.run(paymentInfo);
  };

  const fieldValidation = () => {
    ordererForm.current.callMe();

    return false;
  };

  useEffect(() => {
    init().start();
  }, [init]);

  const representativeProductName = useMemo(
    () => deliveryGroups[0]?.orderProducts[0]?.productName);

  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <h2 className="order_box__tit">주문·결제</h2>
              <ol className="order_box__list">
                <li className="d_type">{/* 주문결제 상태일때 장바구니 d_type 클래스 추가 */}
                  <i className="step_ico cart" />
                  <p>장바구니</p>
                </li>
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
                <div className="order_info">
                  {/* alpha test element */}
                  {/* 왼쪽메뉴 */}
                  <div className="order_left">
                    <div className="acc acc_ui_zone">
                      <Accordion title={'주문자 정보'} defaultVisible={true}>
                        <p className="acc_dsc_top">표시는 필수입력 정보</p>
                        <OrdererForm ref={ordererForm}
                                     orderer={orderer}
                                     setOrderer={setOrderer} />
                      </Accordion>

                      <Accordion title={'배송지 정보'} defaultVisible={true}>
                        <p className="acc_dsc_top">표시는 필수입력 정보</p>
                        <ShippingAddressForm shipping={shippingAddress}
                                             orderer={orderer}
                                             setShipping={setShippingAddress} />
                      </Accordion>

                      {isLogin &&
                      <Accordion title={'할인 정보'} defaultVisible={true}>
                        <DiscountForm discount={discount}
                                      setDiscount={setDiscount}
                                      paymentInfo={paymentInfo}
                                      orderSheetNo={orderSheetNo}
                                      orderProducts={products}
                                      calculate={calculate}
                        />
                      </Accordion>}

                      <Accordion title={'결제 방법'} defaultVisible={true}>
                        <PaymentForm
                          payment={payment}
                          setPayment={setPayment} />
                      </Accordion>

                      {!isLogin &&
                      <Accordion title={'비밀번호 설정'} defaultVisible={true}>
                        <GuestPasswordForm
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
                      <Accordion title={'결제 예정 금액'} defaultVisible={true}>
                        <Calculator payment={submit}
                                    paymentInfo={paymentInfo} />
                      </Accordion>
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

export default OrderStep1;