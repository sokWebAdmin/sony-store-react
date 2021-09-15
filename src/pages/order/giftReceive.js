//SEO
import SEOHelmet from '../../components/SEOHelmet';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

const GiftReceive = () => {
  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      <div className="orderPresent_container">
        <div className="orderPresent_info">
          <i className="present"><img src="../../images/order/ic_present.svg"
                                      alt="선물상자 이미지" /></i>
          <h2 className="orderPresent_tit">소니스토어 선물하기</h2>
          <p className="orderPresent_dsc">선물 받으실 상품의 배송지 정보를 입력해 주세요!</p>
        </div>
        <div className="order_box__cont">
          <div className="acc">
            <div className="acc_item">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="배송지 정보">
                  <span className="acc_tit">배송지 정보</span>
                </a>
              </div>
              <div className="acc_inner">
                <div className="acc_box">
                  <p className="acc_dsc_top">표시는 필수입력 정보</p>
                  <div className="acc_form">
                    <div className="acc_cell">
                      <label htmlFor="user_name">수령인 이름<i
                        className="necessary"></i></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent error">
                        <div className="acc_inp type3">
                          <input type="text" className="inp" id="user_name"
                                 placeholder="이름을 입력하세요. (띄어쓰기 없이 입력하세요.)" />
                          <span className="focus_bg"></span>
                        </div>
                        <p className="error_txt"><span className="ico"></span>이름을
                          입력해 주세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell">
                      <label htmlFor="user_number">휴대폰 번호<i
                        className="necessary"></i></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent error">
                        <div className="acc_inp type3">
                          <input type="text" className="inp" id="user_number"
                                 placeholder="휴대폰 번호를 입력해 주세요. (-없이 입력하세요.)" />
                          <span className="focus_bg"></span>
                        </div>
                        <p className="error_txt"><span className="ico"></span>휴대폰
                          번호를 입력해 주세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell vat">
                      <label htmlFor="user_address">주소<i
                        className="necessary"></i></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent error">
                        <div className="acc_inp type4">
                          <input type="text" className="inp" id="user_address"
                                 placeholder="주소를 입력하세요." />
                          <span className="focus_bg"></span>
                          <div className="delivery_btn_box">
                            <button
                              className="button button_negative button-s"
                              type="button">우편 번호
                            </button>
                          </div>
                          <p className="error_txt"><span
                            className="ico"></span>배송 받으실 주소를 입력해 주세요.</p>
                        </div>
                      </div>
                      <div className="acc_group parent">
                        <div className="acc_inp type5">
                          <input type="text" className="inp" placeholder="" />
                          <span className="focus_bg"></span>
                        </div>
                      </div>
                      <div
                        className="acc_group parent error">
                        <div className="acc_inp type5">
                          <input type="text" className="inp"
                                 placeholder="상세 주소를 입력하세요." />
                          <span className="focus_bg"></span>
                        </div>
                        <p className="error_txt"><span className="ico"></span>상세
                          주소를 입력해 주세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell vat">
                      <label htmlFor="delivery_request">배송 요청 사항</label>
                    </div>
                    <div className="acc_cell">
                      <div className="acc_group parent">
                        <div className="acc_inp type3">
                          <div className="select_ui_zone btm_line">
                            <a href="#" className="selected_btn"
                               data-default-text="택배 기사님께 요청하실 내용을 선택하세요.">
                              택배 기사님께 요청하실 내용을 선택하세요.
                            </a>
                            <div className="select_inner">
                              <p className="prd_tag">요청사항</p>
                              <ul className="select_opt">
                                <li>
                                  <a href="#"
                                     className="opt_list">
                                    <div className="item">배송 전 연락바랍니다.</div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" className="opt_list">
                                    <div className="item">부재 시 경비실에 맡겨 주세요.
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" className="opt_list">
                                    <div className="item">부재 시 무인 택배함에 맡겨주세요.
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" className="opt_list">
                                    <div className="item">부재 시 집 문앞에 놔주세요.</div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" className="opt_list">
                                    <div className="item">부재 시 휴대폰으로 연락 주세요.
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" className="opt_list">
                                    <div className="item">파손의 위험이 있는 상품이니 조심히
                                      다뤄주세요.
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="acc_group parent">
                        <div className="acc_inp type3">
                          <input type="text" className="inp"
                                 placeholder="배송 메모를 입력하세요." />
                          <span className="focus_bg"></span>
                        </div>
                      </div>
                      <ul className="list_dot">
                        <li>선물하기로 배송 받으시는 경우 상품의 배송조회는 주문하신 분만 조회가 가능합니다.</li>
                        <li>소니스토어의 모든 상품은 무료 배송입니다.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="parent">
            <button className="button button_positive button-full"
                    type="button">입력 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftReceive;