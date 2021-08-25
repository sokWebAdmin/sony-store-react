import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/event.scss"

export default function refurbish() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents events">
        <div className="container full">{/* full : max-width 1920 */}
  <div className="content employee">
    <div className="event_header">
      <div className="event_header_inner refurbish">
        <h1 className="event_header_title">리퍼비시몰</h1>
        <p className="event_header_desc">리퍼비시란? 전시품, 반품, 기타 사유로 새 제품으로 판매하기 어려운 제품을 <span className="block">내부 절차를 거쳐 합리적인 가격으로 재판매하는 것입니다.</span></p>
        <div className="event_header_link"><a href="javascript:openModal('popup_refurbish');" data-modal-target="popup_refurbish">리퍼비시 제품 구매시 유의사항</a></div>
      </div>
    </div>
    <div className="event_tablist">
      <div className="tab_ui scroll" data-scroll-view={5}>{/* 스크롤탭 : class: scroll / data-scroll-view 보여지는 탭 수 */}
        <ul>
          <li className="tabs on"><a href="#" className="btn">전체</a></li>
          <li className="tabs"><a href="#" className="btn">렌즈교환식 카메라</a></li>
          <li className="tabs"><a href="#" className="btn">캠코더</a></li>
          <li className="tabs"><a href="#" className="btn">헤드폰/이어폰</a></li>
          <li className="tabs"><a href="#" className="btn">스피커</a></li>
          <li className="tabs"><a href="#" className="btn">기타</a></li>
        </ul>
      </div>
      <div className="tab_ui_info">
        <div className="tab_ui_inner view">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">전체</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
          </div>
        </div>
        <div className="tab_ui_inner">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">렌즈교환식 카메라</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
          </div>
        </div>
        <div className="tab_ui_inner">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">캠코더</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
          </div>
        </div>
        <div className="tab_ui_inner">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">헤드폰/이어폰</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
          </div>
        </div>
        <div className="tab_ui_inner">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">스피커</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
          </div>
        </div>
        <div className="tab_ui_inner">
          <div className="employee_prd">
            <div className="section_top">
              <h2 className="title">기타</h2>
              <div className="itemsort" aria-label="상품 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">선택</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">A급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">B급</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">C급</a></li>
                  </ul>
                </div>
              </div>              </div>
            {/* event list*/}
            <div className="event_prd_list">
              <div className="product">
                <span className="badge_state state_a">A<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                  <div className="sold_out"><span>SOLD OUT</span></div>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_b">B<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인</p>
                  <div className="product_name_price">
                    <div className="original">179,000 <span className="unit">원</span></div>
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_primary button-s">예약 구매</button>
                  </div>
                </div>
              </div>
              <div className="product">
                <span className="badge_state state_c">C<span className="txt">급</span></span>
                <div className="product_pic">
                  <a href="#" className="product_link">
                    <img src="../../images/_tmp/item640x640_01.png" alt="" />
                  </a>
                </div>
                <div className="product_name">
                  <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                  <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                    1인치 핸디캠</p>
                  <div className="product_name_price">
                    <div className="original" />
                    <div className="sale">159,000 <span className="unit">원</span></div>
                  </div>
                  <div className="product_btn_wrap">
                    <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                    <button type="button" className="button button_positive button-s">바로 구매</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
            </div>
            {/*// event list*/}
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