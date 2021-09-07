import { React, useEffect, useCallback, useState } from 'react';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Products from '../../components/order/Products';
import Accordion from '../../components/common/surface/Accordion';

import OrdererForm from '../../components/order/OrdererForm';
import ShippingAddressForm from '../../components/order/ShippingAddressForm';

//api
import { getOrderSheets } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// functions
import { getUrlParam } from '../../utils/location';

export default function OrderStep1 ({ location }) {
  const [deliveryGroups, setDeliveryGroups] = useState([]);

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
  });

  const init = useCallback(() => ({
    async start () {
      await this.fetchOrderSheet(this.orderSheetNo);
    },
    get orderSheetNo () {
      return getUrlParam('orderSheetNo') ?? -1;
    },
    async fetchOrderSheet (orderSheetNo) {

      const { data: { deliveryGroups } } = await getOrderSheets(orderSheetNo);
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
                                             setShipping={setShipping} />
                      </Accordion>

                      <div className="acc_item on">
                        <div className="acc_head">
                          <a className="acc_btn" title="할인 정보 열기">
                            <span className="acc_tit">할인 정보</span>
                            <span className="acc_arrow">상세 보기</span>
                          </a>
                        </div>
                        <div className="acc_inner">
                          <div className="acc_box">
                            <div className="acc_form">
                              <div className="acc_cell vat">
                                <label htmlFor="coupon">쿠폰</label>
                              </div>
                              <div className="acc_cell">
                                <div className="acc_group">
                                  <div className="acc_inp disable_type">
                                    <input type="text" id="coupon"
                                           className="inp" defaultValue={3000}
                                           disabled /><span
                                    className="unit">원</span>
                                    <span className="focus_bg" />
                                  </div>
                                  <div className="acc_btn_box">
                                    <button
                                      className="button button_negative button-s popup_comm_btn"
                                      data-popup-name="coupon_inquiry"
                                      type="button">쿠폰 조회
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="acc_form">
                              <div className="acc_cell vat">
                                <label htmlFor="mileage">멤버십 마일리지</label>
                              </div>
                              <div className="acc_cell parent">
                                <div className="acc_group">
                                  <div className="acc_inp disable_type">
                                    <input type="text" id="mileage"
                                           className="inp"
                                           placeholder="0" /><span
                                    className="unit">점</span>
                                    <span className="focus_bg" />
                                  </div>
                                  <div className="acc_btn_box">
                                    <button
                                      className="button button_negative button-s"
                                      type="button">모두 사용
                                    </button>
                                    <span
                                      className="my_point">(<em>800,000 M</em> 보유)</span>
                                  </div>
                                </div>
                                <p className="membership_info">* 멤버십 마일리지는 최소
                                  5,000점 부터 사용 가능합니다.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* // acc_item */}
                      {/* // acc_item */}
                      <div className="acc_item on">
                        <div className="acc_head">
                          <a className="acc_btn" title="결제 방법 열기">
                            <span className="acc_tit">결제 방법</span>
                            <span className="acc_arrow">상세 보기</span>
                          </a>
                        </div>
                        <div className="acc_inner">
                          <div className="acc_box">
                            <div className="acc_form">
                              <div className="acc_cell vat">
                                <label htmlFor="payment1">결제 수단 선택</label>
                              </div>
                              <div className="acc_cell vat">
                                <div className="acc_group parent">
                                  <div className="acc_radio">
                                    <div className="radio_box">
                                      <input type="radio"
                                             className="inp_radio"
                                             id="radio_tab1" name="tabradio"
                                             defaultChecked="checked" />
                                      <label htmlFor="radio_tab1"
                                             className="contentType">신용카드</label>
                                    </div>
                                    <div className="radio_box">
                                      <input type="radio"
                                             className="inp_radio"
                                             id="radio_tab2"
                                             name="tabradio" />
                                      <label htmlFor="radio_tab2"
                                             className="contentType">가상계좌</label>
                                    </div>
                                    <div className="radio_box">
                                      <input type="radio"
                                             className="inp_radio"
                                             id="radio_tab3"
                                             name="tabradio" />
                                      <label htmlFor="radio_tab3"
                                             className="contentType">네이버
                                        페이</label>
                                    </div>
                                  </div>
                                  <div className="tabResult">
                                    <div
                                      className="result_cont radio_tab1 on">
                                      <div className="check">
                                        <input type="checkbox"
                                               className="inp_check"
                                               id="chk01" />
                                        <label htmlFor="chk01">지금 선택한 결제수단을
                                          다음에도
                                          사용</label>
                                      </div>
                                      <strong className="info_tit">신용카드 무이자 할부
                                        유의사항</strong>
                                      <ul className="list_dot">
                                        <li>무이자 할부 개월 수가 다른 제품을 한꺼번에 결제하면 할부
                                          개월
                                          수가 낮은 제품을 기준으로 할부가 됩니다.
                                        </li>
                                        <li>무이자 할부 개월 수가 다른 제품을 따로 결제하면 해당 제품에
                                          적용된 무이자 할부 혜택을 받으실 수 없습니다.
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="result_cont radio_tab2">
                                      <div className="check">
                                        <input type="checkbox"
                                               className="inp_check"
                                               id="chk02" />
                                        <label htmlFor="chk02">지금 선택한 결제수단을
                                          다음에도
                                          사용</label>
                                      </div>
                                      <div className="bg_recipe_box">
                                        <strong className="info_tit2">전자 세금
                                          계산서
                                          발행</strong>
                                        <ul className="list_dot">
                                          <li>2011년 1월부터 전자세금서 제도를 시행하고 있습니다.
                                          </li>
                                          <li>구매 후 다음달 8일 이후에 요청되는 세금계산서는 발행이
                                            불가합니다.
                                          </li>
                                        </ul>
                                        <div className="btn_recipe_box">
                                          <button
                                            className="button button_negative button-m popup_comm_btn"
                                            data-popup-name="tax_invoice1"
                                            type="button">전자 세금계산서 발행 안내
                                          </button>
                                          <button
                                            className="button button_positive button-m popup_comm_btn"
                                            data-popup-name="tax_invoice2"
                                            type="button">전자 세금계산서 신청하기
                                          </button>
                                        </div>
                                      </div>
                                      <strong className="info_tit3">[소비자
                                        피해보상보험
                                        서비스 안내]</strong>
                                      <ul className="list_dot">
                                        <li>고객님은 안전거래를 위해 현금 결제 시 소니스토어가 가입한
                                          구매안전서비스 소비자피해보상보험서비스를 이용하실 수 있습니다.
                                        </li>
                                        <li>보상대상 : 미배송, 반송/환불거부, 쇼핑몰부도</li>
                                        <li>구매안전서비스를 통하여 주문하시고 서울보증보험에서 발행하는
                                          보험계약체결내역서를 반드시 확인하시기 바랍니다.
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="result_cont radio_tab3">
                                      <div className="check">
                                        <input type="checkbox"
                                               className="inp_check"
                                               id="chk03" />
                                        <label htmlFor="chk03">지금 선택한 결제수단을
                                          다음에도
                                          사용</label>
                                      </div>
                                      <strong className="info_tit">신용카드 무이자 할부
                                        유의사항</strong>
                                      <ul className="list_dot">
                                        <li>무이자 할부 개월 수가 다른 제품을 한꺼번에 결제하면 할부
                                          개월
                                          수가 낮은 제품을 기준으로 할부가 됩니다.
                                        </li>
                                        <li>무이자 할부 개월 수가 다른 제품을 따로 결제하면 해당 제품에
                                          적용된 무이자 할부 혜택을 받으실 수 없습니다.
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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