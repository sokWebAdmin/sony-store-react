import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

//utils
import { useHistory } from 'react-router-dom';

export default function Cart () {
  const history = useHistory();

  return (
    <>
      <SEOHelmet title={'장바구니'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <h2 className="order_box__tit">장바구니</h2>
              <ol className="order_box__list">
                <li className="on">
                  <i className="step_ico cart" />
                  <p>장바구니</p>
                </li>
                <li>
                  <i className="step_ico order" />
                  <p>주문·결제</p>
                </li>
                <li>
                  <i className="step_ico confirm" />
                  <p>주문 완료</p>
                </li>
              </ol>
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
                  history.push('//order/step/1');
                }}>구매하기
                </button>
              </div>
              <div className="acc acc_ui_zone acc_faq acc_cart">
                <div className="acc_item on">
                  <div className="acc_head">
                    <a className="acc_btn" title="상세 내용 토글">
                      <span className="acc_tit">장바구니 이용 안내</span>
                      <span className="acc_arrow">선택됨/상세 닫기</span>
                    </a>
                  </div>
                  <div className="acc_inner" style={{ display: 'block' }}>
                    <div className="acc_box">
                      {/* 앞에 불릿이 들어 갈 것 같다. 그땐 tag 교체 */}
                      <p>모든 이벤트는 결제완료시간 기준으로 적용됩니다.</p>
                      <p>견적서를 클릭하시면 견적서 프린트가 가능합니다.</p>
                      <p>소니스토어 멤버십 회원에 한하여 플레이스테이션 및 주변기기, ESP를 제외한 제품의 총 구매액 2%
                        / 5% / 7%(회원 등급별 차등)가 마일리지로 적립됩니다.</p>
                      <p>동일한 제품군별로만 장바구니에 담으실 수 있습니다. (예, 마일리지 상품과 일반 상품은 함께
                        장바구니에담으실 수 없습니다.)</p>
                    </div>
                  </div>
                </div>
                <div className="acc_item">
                  <div className="acc_head">
                    <a className="acc_btn" title="상세 내용 토글">
                      <span className="acc_tit">AS관련 제품 주의사항</span>
                      <span className="acc_arrow">상세 보기</span>
                    </a>
                  </div>
                  <div className="acc_inner">
                    <div className="acc_box">
                      <p>ESP(Extended Service Plan)를 주문하시는 것은 ESP 이용약관에 기재된 내용을
                        모두 이해하고 준수하는 데 동의하신 것으로 간주됩니다.</p>
                      <p>ESP(Extended Service Plan) 구입 후 7일 이내에 고객지원사이트의 My
                        SCS에서 연장된 서비스 기간 조회가 가능합니다. (구입 확인은 내부 사정에 따라 조정될 수
                        있습니다.)</p>
                    </div>
                  </div>
                </div>
                <div className="acc_item">
                  <div className="acc_head">
                    <a className="acc_btn" title="상세 내용 토글">
                      <span className="acc_tit">인터넷 주문이 어려우세요?</span>
                      <span className="acc_arrow">상세 보기</span>
                    </a>
                  </div>
                  <div className="acc_inner">
                    <div className="acc_box">
                      <p>제품 주문 시 어려움이 있으시다면 고객지원센터(1588-0911)로 전화주세요. 소니 전문 상담원이
                        제품 설명과 함께 고객님의 주문을 도와 드립니다.</p>
                    </div>
                  </div>
                </div>
                {/* // acc_item */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}