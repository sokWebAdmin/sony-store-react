import {
  useEffect,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
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
import Calculator from '../../components/order/Calculator';

//api
import { getOrderSheets, postOrderSheetCalculate } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// functions
import { getUrlParam } from '../../utils/location';
import GlobalContext from '../../context/global.context';
import { truncate } from '../../utils/unit';
import { usePrevious } from '../../hooks';

const OrderStep1 = ({ location }) => {
  const { isLogin } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const [deliveryGroups, setDeliveryGroups] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);

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
      await this.fetchOrderSheet(orderSheetNo);
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
    const paymentInfo = getPaymentInfo();
    orderPayment.run(paymentInfo);
    console.log('submit');
  };

  const testRun = () => { // TODO. 주문서 협업용
    setOrderer({
      ordererName: '주문자이름',
      ordererContact1: '00000000000',
      ordererEmail: 'orderer@nhn-commerce.com',
    });

    setShippingAddress({
      addressName: '주소명',
      addressNo: 0,
      countryCd: 'KR',
      receiverAddress: '전라남도 해남군 송지면 산정길 60',
      receiverContact1: '01035186502',
      receiverContact2: '',
      receiverDetailAddress: '312',
      receiverJibunAddress: '전라남도 해남군 송지면 산정리 707-3',
      receiverName: 'receiverName',
      receiverZipCd: '59063',
    });

    setPayment({
      pgType: 'INICIS',
      payType: 'VIRTUAL_ACCOUNT',
    });

    alert('완료');
  };

  useEffect(() => {
    init().start({});/**/
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
                  {process.env.NODE_ENV === 'development' &&
                  <button className="button" onClick={testRun} style={{
                    display: 'block',
                    width: '100%',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#ea3c36',
                    margin: '0 0 50px 0',
                  }}>⛹️ 이거 누르면 필드 자동입력. Case : [ 회원 ]</button>}

                  {/* 왼쪽메뉴 */}
                  <div className="order_left">
                    <div className="acc acc_ui_zone">
                      <Accordion title={'주문자 정보'} defaultVisible={true}>
                        <p className="acc_dsc_top">표시는 필수입력 정보</p>
                        <OrdererForm orderer={orderer}
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
                      {/* // acc_item */}
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