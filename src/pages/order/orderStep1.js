import { React, useEffect, useCallback, useState, useContext } from 'react';
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

//api
import { getOrderSheets } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// functions
import { getUrlParam } from '../../utils/location';
import GlobalContext from '../../context/global.context';

const OrderStep1 = ({ location }) => {
  const { isLogin } = useContext(GlobalContext);

  const [deliveryGroups, setDeliveryGroups] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);

  // form data
  const [orderer, setOrderer] = useState({
    ordererName: '',
    ordererContact1: '',
    ordererEmail: '',
  });

  const [shipping, setShipping] = useState({
    addressNo: '',
    countryCd: '',
    addressName: '',
    receiverName: '',
    receiverZipCd: '',
    receiverAddress: '',
    receiverDetailAddress: '',
    receiverJibunAddress: '',
    receiverContact1: '',
    receiverContact2: '',
    customsIdNumber: '',
    deliveryMemo: '', // not a shipping address member
  });

  const [discount, setDiscount] = useState({
    subPayAmt: 0,
    coupons: {},
  });

  const [payment, setPayment] = useState({
    pgType: paymentType.creditCard.pgType,
    payType: paymentType.creditCard.payType,
  });

  const init = useCallback(() => ({
    async start () {
      orderPayment.init();
      await this.fetchOrderSheet(this.orderSheetNo);
    },
    get orderSheetNo () {
      return getUrlParam('orderSheetNo') ?? -1;
    },
    async fetchOrderSheet (orderSheetNo) {
      const { data: { deliveryGroups, paymentInfo } } = await getOrderSheets(
        orderSheetNo);
      setPaymentInfo(paymentInfo);
      setDeliveryGroups(deliveryGroups);
    },
  }), []);

  useEffect(() => {
    init().start();
  }, [init]);

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

                    <Products data={deliveryGroups} />
                  </div>
                </div>
                <div className="order_info">
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
                        <ShippingAddressForm shipping={shipping}
                                             orderer={orderer}
                                             setShipping={setShipping} />
                      </Accordion>

                      {isLogin &&
                      <Accordion title={'할인 정보'} defaultVisible={true}>
                        <DiscountForm discount={discount}
                                      setDiscount={setDiscount}
                                      paymentInfo={paymentInfo} />
                      </Accordion>}

                      <Accordion title={'결제 방법'} defaultVisible={true}>
                        <PaymentForm
                          payment={payment}
                          setPayment={setPayment} />
                      </Accordion>

                      <div className="acc_item on">
                        <div className="acc_head">
                          <a className="acc_btn" title="결제 방법 열기">
                            <span className="acc_tit">결제 방법</span>
                            <span className="acc_arrow">상세 보기</span>
                          </a>
                        </div>
                        <div className="acc_inner">

                        </div>
                      </div>
                      {/* // acc_item */}
                    </div>
                    {/* // acc */}
                  </div>
                  {/*// 왼쪽메뉴 */}
                  {/* 오른쪽메뉴 */}
                  <div className="order_right">
                    <div className="acc acc_ui_zone">
                      {/* acc_item */}
                      <div className="acc_item on">
                        <div className="acc_head pc_none">
                          <a className="acc_btn" title="결제 예정 금액열기">
                            <span className="acc_tit">결제 예정 금액</span>
                            <span className="acc_arrow">상세 보기</span>
                          </a>
                        </div>
                        <div className="acc_inner">
                          <div className="payment_box">
                            <div className="inner">
                              <div className="payment_list">
                                <dl className="total">
                                  <dt className="tit">결제 예정 금액</dt>
                                  <dd className="price">4,299,000<span
                                    className="unit">원</span></dd>
                                </dl>
                                <div className="order_detailbox">
                                  <div className="view_headline">
                                    <span className="view_tit">주문 금액</span>
                                    <em
                                      className="view_price"><strong>4,299,000</strong>원</em>
                                  </div>
                                  <div className="view_detail">
                                    <span className="view_tit">제품 금액</span>
                                    <em
                                      className="view_price"><strong>4,299,000</strong>원</em>
                                  </div>
                                  <div className="view_detail">
                                    <span className="view_tit">구매 수량</span>
                                    <em
                                      className="view_price"><strong>1</strong>개</em>
                                  </div>
                                </div>
                                <div className="saleToggle">
                                  <div className="sale_item">{/* on 클래스 제어 */}
                                    <div className="sale_head">
                                      <a href="#none" className="sale_btn"
                                         title="할인 금액 열기">
                                        <div className="view_headline">
                                          <span
                                            className="sale_tit">할인 금액</span>
                                          <em
                                            className="view_price minus"><strong>-
                                            2,300</strong>원</em>
                                        </div>
                                        <span className="acc_arrow">상세 보기</span>
                                      </a>
                                    </div>
                                    <div className="sale_inner"
                                         style={{ display: 'none' }}>
                                      <div className="sale_box">
                                        <div className="view_detail">
                                          <span
                                            className="sale_tit">프로모션 할인</span>
                                          <em className="view_price"><strong>-
                                            0</strong>원</em>
                                        </div>
                                        <div className="view_detail">
                                          <span
                                            className="sale_tit">쿠폰 사용</span>
                                          <em className="view_price"><strong>-
                                            0</strong>원</em>
                                        </div>
                                        <div className="view_detail">
                                          <span
                                            className="sale_tit">마일리지 사용</span>
                                          <em className="view_price"><strong>-
                                            0</strong>원</em>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* // acc_item */}
                                </div>
                              </div>
                              <div className="essential">
                                <div className="check">
                                  <input type="checkbox" className="inp_check"
                                         id="essential" />
                                  <label htmlFor="essential">[필수] 주문할 제품의 거래조건을
                                    확인 하였으며, 구매에 동의하시겠습니까? (전자상거래법 제8조
                                    제2항)</label>
                                </div>
                                {/* pc 결제 버튼 */}
                                <div className="pc_pay_btn">
                                  <button
                                    className="button button_positive button-full"
                                    type="button">결제
                                  </button>
                                </div>
                              </div>
                            </div>
                            <ul className="list_dot">
                              <li>결제가 팝업창에서 이루어집니다.</li>
                              <li>브라우저 설정에서 팝업창 차단을 해제해 주세요.</li>
                            </ul>
                            {/* 모바일일때 버튼 */}
                            <div className="mo_pay_btn">
                              <button
                                className="button button_positive button-full"
                                type="button">총 <em>4,299,000</em> 원
                                (1개) <span>결제하기</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
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
}

export default OrderStep1;