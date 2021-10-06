import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//css
import "../../assets/scss/contents.scss";
import "../../assets/scss/membership.scss";
// import "../../assets/scss/mypage.scss";

import Tabs from '../../components/common/Tabs';

const tabs = [
  { tabName: 'mileage', label: '마일리지' },
  { tabName: 'premium', label: '프리미엄 서비스' },
  { tabName: 'coupon', label: '쿠폰 안내' },
];

const Benefit = () => {

  const [ tabState, setTabState ] = useState('mileage');

  return (
    <>
      <SEOHelmet title={'등급/혜택 안내'} />
      <div className="contents membership full">
        <div className="content" style={{ padding: 0, margin: 0 }}>
          <div className="membership">
            <div className="membership_kvarea temp">
              <div className="membership_kvarea_titlebox">
                <span className="subtitle">등급 &amp; 혜택 안내</span>
                <h1 className="title">소니스토어 멤버십</h1>
                <p className="desc">소니스토어 회원이 되시면 다양한 멤버십 혜택을 누리실 수 있습니다!</p>
                <div className="line_box">
                  <p className="txt">소니스토어 온라인 구매 시 <strong className="amp">금액대 관계 없이 모두 <span>무</span><span>료</span><span>배</span><span>송!</span></strong></p>
                </div>
              </div>
            </div>
            <div className="membership_tabarea" style={{ marginBottom: 0 }}>
              <div className="detail_tab tab_ui size3">
                <Tabs 
                  tabs={tabs}
                  tabState={tabState}
                  setTabState={setTabState}
                />
              </div>
              <div className="detail_veiw_area tab_ui_info">

                {/* 마일리지 */}
                <div className={ `tab_ui_inner ${ tabState === 'mileage' && 'view' } temp` }>
                  <div className="mileage_info">
                    <div className="mileage_info_inner">
                      <strong className="mileage_info_inner_tit">마일리지 안내</strong>
                      <p className="mileage_info_inner_txt">소니스토어에서 제품 구매 시 결제금액의 <em>최대 4%</em>(멤버십 회원:2%)가<span className="br">적립되며, 적립된 마일리지는 적립 시점으로부터 <em>1년간</em> 사용 가능합니다.</span></p>
                      <p className="mileage_info_inner_txt">* 단, ESP, Playstation 제품 및 일부 상품은 마일리지가 적립 되지 않습니다.<br />
                        쿠폰 및 마일리지 사용 시, 쿠폰 및 마일리지 사용 금액을 제외한 결제 금액만 적립됩니다.</p>
                    </div>
                  </div>
                  {/* <!-- pc table --> */}
                  <div className="col_table_wrap pc_tbl temp">
                    <div className="col_table">
                      <div className="col_table_head">
                        <div className="col_table_row">
                          <div className="col_table_cell">구분</div>
                          
                          <div className="col_table_cell">VIP 회원</div>
                          <div className="col_table_cell">MEMBERSHIP 회원</div>
                        </div>
                      </div>
                      <div className="col_table_body">
                        <div className="col_table_row">
                          <div className="col_table_cell">
                            <strong className="emp">회원등급</strong>
                          </div>

                          <div className="col_table_cell">
                            <img src='../../images/membership/membership_vip2.svg' alt="vip" />
                          </div>
                          <div className="col_table_cell">
                            <img src='../../images/membership/membership_family2.svg' alt="membership" />
                          </div>
                        </div>
                        <div className="col_table_row">
                          <div className="col_table_cell">
                            <strong className="emp">등급기준</strong>
                          </div>
                          
                          <div className="col_table_cell">
                            구매금액(누적)이 <strong className="emp">200만원 이상</strong>이 되는 시점 익일부터 VIP 혜택 2년 간 적용
                          </div>
                          <div className="col_table_cell">
                            구매금액(누적)이 <strong className="emp">200만원 미만</strong>시 익일부터 MEMBERSHIP 혜택 2년 간 적용
                          </div>
                        </div>
                        <div className="col_table_row">
                          <div className="col_table_cell">
                            <strong className="emp">적립혜택</strong>
                          </div>
                          
                          <div className="col_table_cell">
                            제품 구매 시 결제 금액의 <strong className="emp">4%</strong> 적립
                          </div>
                          <div className="col_table_cell">
                            제품 구매 시 결제 금액의 <strong className="emp">2%</strong> 적립
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--// pc table --> */}
                  {/* <!-- mo table--> */}
                  <div className="common__table__wrap mo_tbl">
                    <table className="common__table" role="presentation">
                      <caption>소니스토어 멤버십 정보</caption>
                      <colgroup>
                        <col width="35%" />
                        <col width="65%" />
                      </colgroup>
                      <tbody>   
                        
                        <tr>
                          <th scope="row">
                            <img src='../../images/membership/membership_vip2.svg' alt="vip" />
                            <p className="name">VIP 회원</p>
                          </th>
                          <td>
                            <p className="benefit">구매 금액(누적)이 <strong>200만원 이상</strong>이 되는 시점 익일부터 VIP 혜택 2년 간 적용</p>
                            <p className="benefit">제품 구매 시 결제 금액의 <strong>4%</strong> 적립</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <img src='../../images/membership/membership_family2.svg' alt="membership" />
                            <p className="name">MEMBERSHIP <br />회원</p>
                          </th>
                          <td>
                            <p className="benefit">구매 금액(누적)이 <strong>200만원 미만</strong>시 익일부터 MEMBERSHIP 혜택이 2년 간 적용</p>
                            <p className="benefit">제품 구매 시 결제 금액의 <strong>2%</strong> 적립</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <!--// mo table--> */}
                  <div className="mileage_bgarea">
                    <div className="mileage_bgarea_inner">
                      <strong className="tit">마일리지 적립 내역 확인</strong>
                      <div className="message">
                        <div className="message_lft">
                          <div className="message_txt">
                            <p>안녕하세요, 소니스토어 !</p>
                          </div>
                          <div className="message_txt">
                            <p>제 마일리지가 얼마 있는지 확인해보고 <span className="br">싶어요 !</span></p>
                          </div>
                        </div>
                        <div className="message_rgt">
                          <div className="message_txt">
                            <p>안녕하세요, 소니스토어 회원님 <span className="emoticon"></span></p>
                          </div>
                          <div className="message_txt">
                            <p>마일리지는 로그인 후 <em className="empcolor">[마이페이지 &gt;</em><span className="br"><em className="empcolor">마일리지]</em> 탭에서 확인하실 수 있습니다.</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mileage_use">
                    <div className="mileage_use_txt">
                      <p>소니스토어 온라인 및 소니코리아 고객지원을 통한 구매 시에는 제품 수령일자 기준으로 <span className="emp">7일 이후</span>에 적립 확인 가능합니다.</p>
                      <p>소니스토어 압구정에서 구매 시에는 <span className="emp">구매 익일</span>적립 확인 가능합니다.</p>
                      <p>마일리지 유효기간은 <strong>적립 시점으로부터 1년 후</strong> 소멸됩니다. <span className="br">(2011년 8월 9일 이후 적립 마일리지부터 적용)</span></p>
                    </div>
                    <div className="mileage_use_method">
                      <strong className="tit">마일리지 사용방법</strong>
                      <ul className="mileage_use_method_list">
                        <li className="method_01">
                          소니스토어에서<br />제품 구매 시
                        </li>
                        <li className="method_02">
                          소니 공식 서비스센터<span className="m_br">에서 <span className="br">제품 수리 및 컨텐츠 이용 시</span></span>
                        </li>
                      </ul>
                      <div className="mileage_use_method_txt">
                        <p>
                          <strong>1마일리지는 1원</strong>으로 환산되며, <strong>5,000마일리지</strong>부터 현금처럼 사용하실 수 있습니다.
                        </p>
                        <p>(마일리지와 원 환산 비율은 추후 변경가능성이 있으며, 이 경우 약관 3조 4항에 따라 고지함)</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 마일리지 */}

                {/* 프리미엄 서비스 */}
                <div className={ `tab_ui_inner ${ tabState === 'premium' && 'view' }` }>
                  <div className="prmm_smry">
                    <h2 className="prmm_smry_title">프리미엄 서비스란?</h2>
                    <p className="prmm_smry_desc">고객님께서 소니제품을 구입하거나 사용 시에 보다 편리하게 사용하실<br /> 수 있도록 제공해 드리는 <strong className="primary-color">소니스토어만의 특별한 서비스</strong>입니다.</p>
                    <ul className="prmm_smry_lists">
                      <li className="prmm_smry_list">기프트<h3 className="prmm_smry_item">선물하기 서비스</h3></li>
                      <li className="prmm_smry_list">운송<h3 className="prmm_smry_item">택배/퀵/친환경<br />패키지 서비스</h3></li>
                      <li className="prmm_smry_list">비디오<h3 className="prmm_smry_item">영상 변환 서비스</h3></li>
                      <li className="prmm_smry_list">수리<h3 className="prmm_smry_item">연장 서비스 플랜</h3></li>
                    </ul>
                  </div>
                  <div className="prmm_dtl">
                    <ul className="prmm_dtl_lists">
                      <li className="prmm_dtl_list">
                        <div className="prmm_dtl_pic"><img src='../../images/membership/premium1.jpg' alt="선물하기 서비스" className="prmm_dtl_img" /></div>
                        <h3 className="prmm_dtl_title">선물하기 서비스</h3>
                        <ul className="prmm_dtl_prctns">
                          <li className="prmm_dtl_prctn">선물하기 서비스는 <strong className="primary-color">소니스토어 회원만</strong> 온라인 또는 앱에서 이용가능한 서비스입니다.</li>
                          <li className="prmm_dtl_prctn">선물하기 서비스는 <strong className="primary-color">제품 1건의 구매</strong>(결제건)에 한해 이용이 가능합니다.</li>
                        </ul>
                        <p className="prmm_dtl_note">* 제품 1건 결제(구매 수량은 여러개 가능), 복수 배송지 불가</p>
                      </li>
                      <li className="prmm_dtl_list">
                        <div className="prmm_dtl_pic"><img src='../../images/membership/premium2.jpg' alt="택배/퀵/친환경 서비스" className="prmm_dtl_img" /></div>
                        <h3 className="prmm_dtl_title">퀵/친환경 패키지 서비스</h3>
                        <ul className="prmm_dtl_prctns">
                          <li className="prmm_dtl_prctn">소니스토어에서는 온라인 주문 한정으로 친환경 패키징을 제공합니다.</li>
                          <li className="prmm_dtl_prctn">박스/완충 포장재/테이프 모두 종이를 사용하여 환경 보호에 기여합니다.</li>
                          <li className="prmm_dtl_prctn">퀵 서비스는 소니스토어에서 구매한 제품에 한하여, 제품 가격에 따라 배송 비용이 할증될 수 있습니다.</li>
                          {/* <li className="prmm_dtl_prctn">제품 운송 중 파손/분실되는 경우에 이용 가능하며, 국내 지원만 가능합니다.</li> */}
                          <li className="prmm_dtl_prctn">구매 금액이 <strong className="primary-color">5만원 이상</strong>인 경우에 이용 가능하며, 국내 지역만 가능합니다.</li>
                          <li className="prmm_dtl_prctn">퀵 서비스 : 구매금액이 <strong className="primary-color">200만원 이상</strong>인 경우에 이용 가능하며, 서울 지역에서만 가능합니다.</li>
                        </ul>
                        <p className="prmm_dtl_note">* 비용은 고객 부담입니다.</p>
                      </li>
                      <li className="prmm_dtl_list">
                        <div className="prmm_dtl_pic"><img src='../../images/membership/premium3.jpg' alt="영상변환 서비스" className="prmm_dtl_img" /></div>
                        <h3 className="prmm_dtl_title">영상변환 서비스</h3>
                        <ul className="prmm_dtl_prctns">
                          <li className="prmm_dtl_prctn">영상변환 서비스는 고객님께서 소장하고 계시는 비디오 테이프를 <strong className="primary-color">USB 메모리 또는 DVD 디스크</strong>로 변환하여 드리는 서비스입니다.</li>
                          <li className="prmm_dtl_prctn">변환 가능한 테이프는 <strong className="primary-color">6mm, 8mm 또는 VHS 테이프</strong>이며, 가까운 서비스 센터로 비디오 테이프를 가지고 방문하시면 변환 서비스를 받으실 수 있습니다.</li>
                        </ul>
                        <a href="https://www.sony.co.kr/scs/handler/Service-Media" className="prmm_dtl_link">자세히 보기</a>
                      </li>
                      <li className="prmm_dtl_list">
                        <div className="prmm_dtl_pic"><img src='../../images/membership/premium4.jpg' alt="연장 서비스 플랜" className="prmm_dtl_img" /></div>
                        <h3 className="prmm_dtl_title">연장 서비스 플랜</h3>
                        <ul className="prmm_dtl_prctns">
                          <li className="prmm_dtl_prctn">연장 서비스 플랜은 소정의 비용으로 제품 구입일로부터 2년 또는 3년 동안 횟수와 금액 상관 없이 안심하고 무상 수리를 받을 수 있는 프리미엄 서비스입니다.</li>
                          <li className="prmm_dtl_prctn">소니스토어 온라인 및 전화주문을 통해서 구매 가능합니다.</li>
                          <li className="prmm_dtl_prctn">연장 서비스 플랜 적용은 <strong className="primary-color">상품 구매일로부터 7일 이후</strong> 자동 적용됩니다.</li>
                          <li className="prmm_dtl_prctn">연장 서비스 플랜 상품은 <strong className="primary-color">무형 상품</strong>으로 별도 배송되지 않습니다.</li>
                        </ul>
                        <a href="https://www.sony.co.kr/scs/handler/SCSWarranty-ESPOrderConfirm" className="prmm_dtl_link">자세히 보기</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* 프리미엄 서비스 */}

                {/* 쿠폰 안내 */}
                <div className={ `tab_ui_inner ${ tabState === 'coupon' && 'view' }` }>
                  <div className="coupon_zone">
                    <div className="coupon_inner">
                      <div className="coupon_list">
                        <div className="coupon_box">
                          <span className="coupon_type two">ALL<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 30일</span>
                              <p className="tit">첫 구매 감사 <span className="percentage">5%</span> 할인</p>
                              <p className="cut_tit">소니스토어 온라인 회원으로서 첫 구매에 대한<br className="mo_none" />
                              배송완료 후 발급</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">발급대상</strong>
                                <p className="lists_txt">소니스토어 전 제품 (단, ESP 및 Playstation 및 관련 제품 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">3만원 이상의 소니스토어 전 제품<br />
                                  (단, ESP 및 Playstation 및 관련 제품 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">5%</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="coupon_box">
                          <span className="coupon_type two">ALL<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 60일</span>
                              <p className="tit">정품등록 감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">발급대상</strong>
                                <p className="lists_txt">카오디오/디지털카메라/카메라 바디(별매렌즈)/캠코더/
                                  워크맨(MP3플레이어)/헤드폰/이어폰/스피커/홈오디오 등</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">소니 액세서리 (일부 액세서리 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">10% (3만원 이상 구매 시 사용 가능)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* <div className="coupon_list">
                        <div className="coupon_box vvip">
                          <span className="coupon_type two">VVIP<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 90일</span>
                              <p className="tit">오디오 제품 <span className="percentage">30%</span> 할인</p>
                              <p className="cut_tit">소니스토어 회원으로 최초 VVIP 승급 시</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">헤드폰/이어폰/스피커/홈오디오/라디오/워크맨/레코더 등 오디오 카테고리 내 판매 제품</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">30% (최대 10만원 할인)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="coupon_box vvip">
                          <span className="coupon_type two">VVIP<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 30일</span>
                              <p className="tit">소니 액세서리 <span className="percentage">30%</span> 할인</p>
                              <p className="cut_tit">소니스토어 회원으로 최초 VVIP 승급 시</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">소니 액세서리 (일부 액세서리 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">30%</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="coupon_list">
                        <div className="coupon_box vvip">
                          <span className="coupon_type two">VVIP<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 90일</span>
                              <p className="tit">소니 전 제품 <span className="percentage">5%</span> 할인</p>
                              <p className="cut_tit">소니스토어 회원으로 최초 VVIP 승급 시</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">소니스토어 전 제품 (단, ESP 및 Playstation 및 관련 제품 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">5% (최대 10만원 할인)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="coupon_box vvip">
                          <span className="coupon_type two">VVIP<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 30일</span>
                              <p className="tit">소니 전 제품 <span className="percentage">15%</span> 할인</p>
                              <p className="cut_tit">소니스토어 회원으로 최초 VVIP 승급 시</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">소니스토어 전 제품 (단, ESP 및 Playstation 및 관련 제품 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">15% (최대 30만원 할인)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> 
                      <div className="coupon_list">
                        <div className="coupon_box vvip">
                          <span className="coupon_type two">VVIP<br /> COUPON</span>
                          <div className="coupon">
                            <div className="coupon_head">
                              <span className="coupon_expiration">발행일로부터 30일</span>
                              <p className="tit">생일 축하 기념 <span className="percentage">10%</span> 할인</p>
                              <p className="cut_tit">VVIP 회원 대상으로 회원 가입 시 입력된 생일<br className="mo_none" /> 당일 발급</p>
                            </div>
                            <ul className="coupon_desc">
                              <li className="lists">
                                <strong className="lists_tit">적용제품</strong>
                                <p className="lists_txt">소니스토어 전 제품 (단, ESP 및 Playstation 및 관련 제품 제외)</p>
                              </li>
                              <li className="lists">
                                <strong className="lists_tit">할&nbsp;&nbsp;인&nbsp;&nbsp;율</strong>
                                <p className="lists_txt">10% (10만원 이상 구매 시 최대 5만원)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="guide_list">
                      <p className="tit ico_tit">주의사항</p>
                      <ul className="list_dot">
                        <li>쿠폰은 특별 할인제품 구매 시 사용이 불가합니다.</li>
                        <li>쿠폰은 주문당 1매씩 사용 가능하며, 제품 1개에만 적용됩니다.</li>
                        <li>주문 시 사용한 쿠폰은 해당 주문을 취소하더라도 복원되지 않습니다.</li>
                        <li>사용처 : 소니스토어 온라인 및 전화주문, 소니스토어 압구정</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 쿠폰 안내 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefit;
