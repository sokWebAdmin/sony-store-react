import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/mypage.scss"

//utils
import { useHistory } from "react-router-dom";

export default function MyPageMain() {

    const history = useHistory();

    return (
        <>
        <SEOHelmet title={"마이페이지"} />
        <div className="contents mypage">
        <div className="my_wrap">
            <div className="my_head">
                <h2 className="title">마이페이지</h2>
                <div className="my_user">
                <div className="user_profile">
                    <p className="user_name"><span className="name">김소니</span>님 안녕하세요 :)</p>
                    <a  className="user_modify under_line">회원정보 수정</a>
                </div>
                <div className="user_info">
                    <ul>
                    <li className="user_item grade">
                        <a  className="user_tabs">
                        <span className="ico_txt"><span className="txt_arrow">회원등급</span></span>
                        <span className="val_txt">
                            <span className="val vvip">VVIP</span>{/* class: 별 등급 색상 지정 vvip / vip / family */}
                        </span>
                        </a>
                    </li>
                    <li className="user_item mileage">
                        <a  className="user_tabs">
                        <span className="ico_txt"><span className="txt_arrow">마일리지</span></span>
                        <span className="val_txt"><span className="val">153,248</span>M</span>
                        </a>
                    </li>
                    <li className="user_item coupon">
                        <a  className="user_tabs">
                        <span className="ico_txt"><span className="txt_arrow">쿠폰</span></span>
                        <span className="val_txt"><span className="val">0</span> 장</span>
                        </a>
                    </li>
                    <li className="user_item like">
                        <a  className="user_tabs">
                        <span className="ico_txt"><span className="txt_arrow">찜</span></span>
                        <span className="val_txt"><span className="val">0</span></span>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            {/* s: 임직원/B2B 배너 버튼 */}
            <div className="cont_inner">
                <div className="b2b_banner">
                <a  onClick={()=>{history.push('/event/refurbish')}} className="b2b_link refurbish">
                    <div className="txt_box">
                    <p className="tit">리퍼비시몰</p>
                    <p className="txt">소니 제품을 리퍼비시몰에서 더 저렴하게 만나보세요!</p>
                    </div>
                </a>
                <a  onClick={()=>{history.push('/event/employee')}} className="b2b_link executives">
                    <div className="txt_box">
                    <p className="tit">임직원몰</p>
                    <p className="txt">맞춤형 임직원몰에서 특별한 혜택 누리세요!</p>
                    </div>
                </a>
                <a  onClick={()=>{history.push('/event/refined')}} className="b2b_link refined_article">
                    <div className="txt_box">
                    <p className="tit">정품등록 특가몰</p>
                    <p className="txt">정품등록을 완료하신 고객님께 특별한 혜택을 드립니다!</p>
                    </div>
                </a>
                <a  onClick={()=>{history.push('/event/asc')}} className="b2b_link asc">
                    <div className="txt_box">
                    <p className="tit">ASC몰</p>
                    <p className="txt">ASC 임직원을 위해 준비한 다양한 제품을 특별한 가격으로 만나보세요!</p>
                    </div>
                </a>
                </div>
            </div>
            {/* // e: 임직원/B2B 배너 버튼 */}
            <div className="cont_inner">
                <div className="cont history_order">
                <div className="tit_head">
                    <h3 className="cont_tit">주문/배송 내역</h3>
                    <div className="btn_article right">
                    <a  className="button button_secondary button-s">자세히 보기</a>
                    </div>
                </div>
                <div className="history_inner">
                    <div className="my_order">
                    <ul className="order_list">
                        <li className="step_1 on">{/* 1건 이상 부터 class: on 추가 */}
                        <div className="ship_box">
                            <span className="ico_txt">입금대기</span>
                            <a  className="val_txt"><span className="val">4</span><span>건</span></a>
                        </div>
                        </li>
                        <li className="step_2">
                        <div className="ship_box">
                            <span className="ico_txt">결제완료</span>
                            <a  className="val_txt"><span className="val">0</span><span>건</span></a>
                        </div>
                        </li>
                        <li className="step_3">
                        <div className="ship_box">
                            <span className="ico_txt">배송준비</span>
                            <a  className="val_txt"><span className="val">0</span><span>건</span></a>
                        </div>
                        </li>
                        <li className="step_4 on">
                        <div className="ship_box">
                            <span className="ico_txt">배송중</span>
                            <a  className="val_txt"><span className="val">1</span><span>건</span></a>
                        </div>
                        </li>
                        <li className="step_5 on">
                        <div className="ship_box">
                            <span className="ico_txt">배송완료</span>
                            <a  className="val_txt"><span className="val">1</span><span>건</span></a>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="my_claim">
                    <p className="txt cancel on">주문 취소 <a  title="주문 취소 건"><strong className="val_txt"><span className="val">4</span> 건</strong></a></p>
                    <p className="txt return">교환 반품 <a  title="교환 반품 건"><strong className="val_txt"><span className="val">0</span> 건</strong></a></p>
                    </div>
                </div>
                </div>
                <div className="cont history_mileage">
                <h3 className="cont_tit">마일리지</h3>
                <div className="history_inner">
                    <div className="my_mileage">
                    <p className="txt">사용 가능
                        <span className="mileage_val">153,248</span>
                        <span className="extinction">
                        (<strong className="val_txt"><span className="val">300</span>M</strong>당월 소멸 예정)
                        </span>
                    </p>
                    </div>
                    <div className="mileage_inquiry">
                    <div className="date_box">
                        <ul className="date3_tab">
                        <li className="tabs on">
                            <a  className="date3_btn">3개월</a>
                        </li>
                        <li className="tabs">
                            <a  className="date3_btn">6개월</a>
                        </li>
                        <li className="tabs">
                            <a  className="date3_btn">1년</a>
                        </li>
                        </ul>
                        <div className="date_rang">
                        <div className="calendar_box">
                            <input type="text" id="datepicker1" className="inp datepicker" autoComplete="off" />
                        </div>
                        <div className="calendar_box">
                            <input type="text" id="datepicker2" className="inp datepicker" autoComplete="off" />
                        </div>
                        <button className="button button_positive button-s" type="button">조회</button>
                        </div>
                    </div>
                    <div className="history_list">
                        <div className="col_table_wrap mileage_table on">{/* 데이터가 있는 경우 class : on */}
                        <div className="col_table">
                            <div className="col_table_head">
                            <div className="col_table_row">
                                <div className="col_table_cell">날짜</div>
                                <div className="col_table_cell">내역</div>
                                <div className="col_table_cell">주문번호</div>
                                <div className="col_table_cell">마일리지</div>
                                <div className="col_table_cell">유효기간</div>
                            </div>
                            </div>
                            <div className="col_table_body">
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 400</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">마일리지로 제품 구입</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 800</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage up">
                                <p className="txt">+ 800</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage up">
                                <p className="txt">+ 2500</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 3000</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage up">
                                <p className="txt">- 800</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage up">
                                <p className="txt">- 800</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 400</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 400</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            <div className="col_table_row">
                                <div className="col_table_cell order_date">
                                <p className="txt">21.05.12</p>
                                </div>
                                <div className="col_table_cell order_details">
                                <p className="txt">주문 취소</p>
                                </div>
                                <div className="col_table_cell order_number">
                                <a  className="txt">20210512-663W24</a>
                                </div>
                                <div className="col_table_cell order_mileage down">
                                <p className="txt">- 400</p>
                                </div>
                                <div className="col_table_cell order_expiration">
                                <p className="txt">22.12.31</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="btn_article">
                            <a  className="more_btn">더보기</a>
                        </div>
                        </div>
                        <div className="no_data on"> {/* 데이터가 없을 경우 class : on */}
                        <span>내역이 없습니다.</span>
                        </div>
                    </div>
                    </div>
                    <div className="guide_list">
                    <p className="tit">[멤버십 마일리지 안내]</p>
                    <ul className="list_dot">
                        <li>구매 시 결제금액의 2%가 적립됩니다. (일부 품목 마일리지 적립대상 제외)</li>
                        <li><strong>VIP회원</strong>(누적 구매 금액 <strong>200만원</strong> 이상부터 적용)은 구매 시 결제금액의 4%가 적립됩니다. (2년 간 혜택 유지) </li>
                        <li>마일리지 적립은 <strong>제품 구매일 당일</strong>에만 적립 가능합니다. (온라인 소니스토어 배송 완료 후 7일 이내에 적립) </li>
                        <li><strong>5,000 마일리지 이상</strong>이면 현금처럼 사용하실 수 있습니다. </li>
                        <li>적립하신 마일리지는 소니스토어 온라인 및 직영점에서 제품 구매 시, 소니 공식 서비스 센터에서의 제품 수리 및 콘텐츠 이용 시 사용 가능합니다. </li>
                        <li>최근 1년 간의 멤버십 마일리지 내역만 조회 가능합니다. (날짜 직접 검색을 통해서 확인 가능)</li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="cont history_coupon">
                <h3 className="cont_tit">쿠폰</h3>
                <div className="history_inner">
                    <div className="history_list">
                    <div className="coupon_inner on">{/* class : on 내역이 있을 경우 on */}
                        <div className="coupon_list">
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        <div className="coupon_box">
                            <div className="coupon">
                            <span className="coupon_no">No. <span className="num">3757897055</span></span>
                            <p className="tit">정품등록감사<br /> 소니 액세서리 <span className="percentage">10%</span> 할인</p>
                            <p className="cut_txt">3만원 이상 구매 시 </p>
                            <p className="expiration_txt"><strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12</p>
                            </div>
                        </div>
                        </div>
                        <div className="btn_article line">
                        <a  className="more_btn">더보기</a>
                        </div>
                    </div>
                    <div className="no_data on">{/* class : on 내역이 없을 경우 on */}
                        <span>내역이 없습니다.</span>
                    </div>
                    </div>
                    <div className="guide_list">
                    <p className="tit">[쿠폰 사용 안내]</p>
                    <ul className="list_dot">
                        <li>쿠폰은 <strong>주문당 1매씩 사용 가능하며, 제품 1개에만 적용</strong>됩니다. </li>
                        <li>쿠폰 할인은 결제 시점에서 자동으로 할인 금액만큼 차감되며 결제 예정금액이 표시됩니다. </li>
                        <li>쿠폰은 주문 후 취소할 경우 재발급되지 않으니 사용에 유의하여 주시기 바랍니다. </li>
                        <li>소니스토어에서 발행하는 쿠폰은 행사 내용에 따라 기간 및 해당 제품 등 적용 방법이 다를 수 있습니다.</li>
                    </ul>
                    </div>
                    <div className="ico_box_link">
                    <a  className="box_link_inner ico_type1">
                        <div className="txt_box">
                        <p className="tit">소니스토어의 쿠폰 보기</p>
                        <p className="txt">첫 구매 등 소니스토어의 다양한 쿠폰 혜택을 받으세요!</p>
                        </div>
                    </a>
                    <a href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start" target="_blank" title="새 창 열림" className="box_link_inner ico_type2">
                        <div className="txt_box">
                        <p className="tit">정품등록 관리</p>
                        <p className="txt">소니 제품 구매 후 정품등록하고 쿠폰을 받으세요!</p>
                        </div>
                    </a>
                    </div>
                </div>
                </div>
                <div className="cont history_like">
                <div className="cont_head">
                    <h3 className="cont_tit">찜</h3>
                    {/* s : 찜 목록이 없을 경우 display:none */}
                    <div className="like_select_btn">
                    <button className="button button_secondary button-s" type="button">선택 삭제</button>
                    <button className="button button_positive button-s popup_comm_btn" type="button" data-popup-name="cart_pop"><span>선택 제품</span> 장바구니 담기</button>
                    </div>
                    {/* e : 찜 목록이 없을 경우 display:none */}
                </div>
                <div className="history_inner">
                    <div className="history_list">
                    <div className="like_inner on">{/* class : on 내역이 있을 경우 on */}
                        <div className="all_checked check">
                        <input type="checkbox" className="inp_check check_all" id="allChk" name="likeChk" />
                        <label htmlFor="allChk">전체</label>
                        </div>
                        <div className="like_prd_inner">
                        <ul className="like_prd_list">
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLGAF가 탑재)</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid </p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                            <li className="like_list">
                            <div className="item">
                                <div className="check check_only">
                                <input type="checkbox" className="inp_check" name="likeChk" />
                                </div>
                                <div className="img"><img src="../../images/_tmp/item640x640_01.png" alt="" /></div>
                                <div className="prd_info">
                                <p className="tit">PLAYSTATION 5 DIGITAL (CFI-1018B01)</p>
                                <p className="txt">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠</p>
                                <p className="prd_price"><span className="price">899,000</span>원</p>
                                </div>
                            </div>
                            </li>
                        </ul>
                        </div>
                        <div className="btn_article line">
                        <a  className="more_btn">더보기</a>
                        </div>
                    </div>
                    <div className="no_data on">{/* class : on 내역이 없을 경우 on */}
                        <span>내역이 없습니다.</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
</div>


        </>
    );
}