import React from 'react';
import { useHistory } from 'react-router';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Header from '../../components/cart/Header';
import QnA from '../../components/cart/QnA';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

const Cart = () => {
  const history = useHistory();

  return (
    <>
      <SEOHelmet title={'장바구니'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <Header />
              <div className="cart_func">
                <div className="cart_func_check">
                  <div className="check">
                    <input type="checkbox" className="inp_check check_all"
                           id="check_cart_items" name="check_cart_item" />
                    <label htmlFor="check_cart_items">전체</label>
                  </div>
                </div>
                <div className="cart_func_buttons">
                  <button type="button"
                          className="button button_negative button-s button_del_checked_items">선택
                    삭제
                  </button>
                  <button type="button"
                          className="button button_positive button-s button_print_esimate popup_comm_btn"
                          data-popup-name="estimate">견적서 출력
                  </button>
                </div>
              </div>
              <div className="col_table_wrap order_list">
                <div className="col_table">
                  <div className="col_table_head">
                    <div className="col_table_row">
                      <div className="col_table_cell">제품</div>
                      <div className="col_table_cell">가격</div>
                      <div className="col_table_cell">수량</div>
                      <div className="col_table_cell">합계</div>
                      <div className="col_table_cell ir">삭제</div>
                    </div>
                  </div>
                  <div className="col_table_body">
                    <div className="col_table_row">
                      <div className="col_table_cell prd_wrap tal">
                        <div className="prd">
                          <div className="check check_only">
                            <input type="checkbox" className="inp_check"
                                   name="check_cart_item" />
                          </div>
                          <div className="prd_thumb">
                            <img className="prd_thumb_pic"
                                 src="../../images/_tmp/item640x640_03.png"
                                 alt="상품명입력" />
                          </div>
                          <div className="prd_info">
                            <div className="prd_info_name">PLAYSTATION 5 DIGITAL
                              (CFI-1018B01)
                            </div>
                            <p className="prd_info_option">4K HDR(HLG), Fast
                              Hybrid AF가 탑재된 전문가급 1인치 핸디캠/ LIMITED EDITION(사일런트
                              화이트)</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell prd_price">
                        4,299,000 <span className="won">원</span>
                      </div>
                      <div className="col_table_cell prd_count">
                        <div className="count_ui_box">
                          <button className="minus">감소</button>
                          <input type="text" readOnly="readonly"
                                 defaultValue={1} className="count" />
                          <button className="plus">증가</button>
                        </div>
                      </div>
                      <div className="col_table_cell prd_total">
                        4,299,000 <span className="won">원</span>
                      </div>
                      <div className="col_table_cell">
                        <button type="button" className="btn_del_prd"><img
                          src="../../images/common/ic_close.svg" alt="제품 삭제" />
                        </button>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell prd_wrap tal">
                        <div className="prd">
                          <div className="check check_only">
                            <input type="checkbox" className="inp_check"
                                   name="check_cart_item" />
                          </div>
                          <div className="prd_thumb">
                            <img className="prd_thumb_pic"
                                 src="../../images/_tmp/item640x640_02.png"
                                 alt="상품명입력" />
                          </div>
                          <div className="prd_info">
                            <div className="prd_info_name">AK-74 Hi-Res Aux
                              3.5mm 케이블 (16.5m)
                            </div>
                            <p className="prd_info_option">AK-47 전용 고해상도 Aux
                              케이블</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell prd_price">
                        9,000 <span className="won">원</span>
                      </div>
                      <div className="col_table_cell prd_count">
                        <div className="count_ui_box">
                          <button className="minus">감소</button>
                          <input type="text" readOnly="readonly"
                                 defaultValue={1} className="count" />
                          <button className="plus">증가</button>
                        </div>
                      </div>
                      <div className="col_table_cell prd_total">
                        18,000 <span className="won">원</span>
                      </div>
                      <div className="col_table_cell">
                        <button type="button" className="btn_del_prd"><img
                          src="../../images/common/ic_close.svg" alt="제품 삭제" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col_table_foot">
                  <div className="prd_summary">
                    <span className="prd_summary_length">결제 예정 금액 (총 1개)</span>
                    <span className="prd_summary_price">200,000,000,000 <span
                      className="won">원</span></span>
                    <p className="prd_summary_warning">* 최종 결제금액은 고객님의 <span
                      className="mo_block">쿠폰 / 마일리지 적용에 따라 달라질 수 있습니다.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="button_wrap">
                <a className="button button_negative">쇼핑 계속 하기</a>
                <button type="submit"
                        className="button button_positive popup_comm_btn"
                        data-popup-name="login_chk_order" onClick={() => {
                  history.push('/order/sheet');
                }}>구매하기
                </button>
              </div>
              <QnA />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;