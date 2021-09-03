import { React ,useState, useEffect, useContext, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';


//css
import "../../assets/scss/category.scss";
import "../../assets/scss/contents.scss";
import "../../assets/scss/esp.scss";


//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"
import { getCategoryList } from '../../api/display';
import { getProductListByCategoryNo, getProductSearch } from '../../api/product';
import EspProduct from '../../components/EspProduct';


export default function EspList({history}) {


    // 왜 있는지 모르겠지만 다른데도 다 있길래 추가했습니다.
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    // TODO api 호출
    // TODO 호출 결과에 따라 화면 분기 처리
    // TODO 구매 신청 후 약관 동의 팝업 노출 후 장바구니 추가



    const openGenuineRegisterSite = () => {
        window.open("https://www.sony.co.kr/scs/handler/SCSWarranty-Start", "_blank");
    }

    return (
        <>
            <SEOHelmet title={`연장서비스플랜 ESP`} />
            <div className="category">
                <div className="contents">
                    <div className="container">
                        <div className="content esp_page">
                            <div className="common_head first_tit">
                                <a href="#" className="common_head_back" onClick={e => {
                                    history.goBack();
                                    e.preventDefault();
                                }}>연장서비스플랜 ESP</a>
                                <h1 className="common_head_name">정품/보증기간/연장서비스플랜</h1>
                            </div>
                            <div className="empty_buy_box">
                                <i className="empty_buy_ico"></i>
                                <strong className="empty_tit">구매 가능한 ESP가 없습니다.</strong>
                                <p className="empty_desc">My SCS에서 정품등록 여부를 먼저 확인하세요!</p>
                                <div className="button_wrap">
                                    <button type="button" className="button button_negative" onClick={() => {
                                        openGenuineRegisterSite();
                                    }}>정품등록 바로가기</button>
                                </div>
                            </div>
                            <div className="esp_list_box">
                                <div className="esp_tbl_wrap">
                                    <div className="col_table_wrap">
                                        <div className="col_table">
                                            <div className="col_table_head">
                                                <div className="col_table_row">
                                                    <div className="col_table_cell">모델명</div>
                                                    <div className="col_table_cell">정품등록일</div>
                                                    <div className="col_table_cell">보증기간 만료일 (제품번호)</div>
                                                    <div className="col_table_cell">연장서비스플랜 구매 신청</div>
                                                </div>
                                            </div>
                                            <div className="col_table_body">
                                                <div className="col_table_row">
                                                    <div className="col_table_cell">
                                                        <div className="prd_name">CMT-GPZ6</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_date">21.07.22</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_num">27.10.22 (9165530)</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <button className="button button_secondary button-s popup_comm_btn"
                                                                data-popup-name="esp_pop" type="button">구매 신청
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col_table_row">
                                                    <div className="col_table_cell">
                                                        <div className="prd_name">CMT-GPZ6</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_date">21.07.22</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_num">27.10.22 (9165530)</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <button className="button button_secondary button-s popup_comm_btn"
                                                                data-popup-name="esp_pop" type="button">구매 신청
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col_table_row">
                                                    <div className="col_table_cell">
                                                        <div className="prd_name">CMT-GPZ6</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_date">21.07.22</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_num">27.10.22 (9165530)</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <button className="button button_secondary button-s popup_comm_btn"
                                                                data-popup-name="esp_pop" type="button">구매 신청
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col_table_row">
                                                    <div className="col_table_cell">
                                                        <div className="prd_name">CMT-GPZ6</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_date">21.07.22</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <div className="prd_num">27.10.22 (9165530)</div>
                                                    </div>
                                                    <div className="col_table_cell">
                                                        <button className="button button_secondary button-s popup_comm_btn"
                                                                data-popup-name="esp_pop" type="button">구매 신청
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn_area">
                                        <button type="button" className="btn_more" title="기획전 더보기">더보기<span
                                          className="ico_plus"></span></button>
                                    </div>
                                </div>
                                <div className="esp_info">
                                    <strong className="esp_tit">[안내]</strong>
                                    <ul className="list_dot">
                                        <li>고객님의 아이디로 정품등록 되어진 모델에 대한 정보입니다.</li>
                                        <li>연장서비스플랜을 구매하실 수 있는 경우 &lt;구매신청&gt;버튼이 노출되며, 클릭하시면 장바구니 페이지로 이동합니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}