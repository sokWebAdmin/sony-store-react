import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"


//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/event.scss"

export default function eventList() {

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents events">
        <div className="container full">{/* full : max-width 1920 */}
  <div className="content">
    <div className="event_slider swiper-container">
    <Swiper className="swiper-wrapper"
        slidesPerView= {1}
        loop={true}
        navigation ={{
          nextEl : '.swiper-button-next',
          prevEl : '.swiper-button-prev',
        }}
        pagination={{
          el: ".event-banner-pagination",
          type: "custom",
          renderCustom: (swiper, current, total) => {
            let _current = current;
            let _total = total;
            if (current < 10) _current = "0" + current;
            if (total < 10) _total = "0" + total;
            return "<span class='swiper-pagination-current'>"+_current+"</span> / " +
            "<span class='swiper-pagination-total'>"+_total+"</span>";
          },
        }}
        on= {{
          init: swiper => {
            swiper.slides.forEach(e => {
              let _bgSrc= e.querySelector('.bg_img').getAttribute("src"),
                  $bgBox = e.querySelector('.slider_box');
              $bgBox.setAttribute("style", "background:url('"+_bgSrc+"') no-repeat center top;");
            });
          },
        }}
    >
        <SwiperSlide className="swiper-slide">
          <div className="slider_box" style={{background: `url('/images/_tmp/pc_eventMain_img01.png') center 80% / cover no-repeat`}}>
            <img className="bg_img" src="/images/_tmp/pc_eventMain_img01.png" alt="" />{/* 슬라이드 배경 */}
            <div className="desc_box">
              <p className="tit">SRS-XP500<br /> 런칭 기념 이벤트</p>
              <p className="txt">한 층 더 업그레이드 된 사운드와 조명으로<br /> 공간을 밝히는 스피커</p>
              <p className="event_duration">2021.05.27 ~ 2021.06.13</p>
              <div className="btn_article">
                <a href="#" className="event_link">자세히 보기</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <div className="slider_box" style={{background: `url('/images/_tmp/pc_eventMain_img01.png') center 80% / cover no-repeat`}}>
            <img className="bg_img" src="/images/_tmp/pc_eventMain_img01.png" alt="" />{/* 슬라이드 배경 */}
            <div className="desc_box">
              <p className="tit">SRS-XP500<br /> 런칭 기념 이벤트</p>
              <p className="txt">한 층 더 업그레이드 된 사운드와 조명으로<br /> 공간을 밝히는 스피커</p>
              <p className="event_duration">2021.05.27 ~ 2021.06.13</p>
              <div className="btn_article">
                <a href="#" className="event_link">자세히 보기</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <div className="slider_box" style={{background: `url('/images/_tmp/pc_eventMain_img01.png') center 80% / cover no-repeat`}}>
            <img className="bg_img" src="/images/_tmp/pc_eventMain_img01.png" alt="" />{/* 슬라이드 배경 */}
            <div className="desc_box">
              <p className="tit">SRS-XP500<br /> 런칭 기념 이벤트</p>
              <p className="txt">한 층 더 업그레이드 된 사운드와 조명으로<br /> 공간을 밝히는 스피커</p>
              <p className="event_duration">2021.05.27 ~ 2021.06.13</p>
              <div className="btn_article">
                <a href="#" className="event_link">자세히 보기</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="arrow_btn">
        <a className="arrow swiper-button-prev"><span className="ico_btn">이전</span></a>
        <a className="arrow swiper-button-next"><span className="ico_btn">다음</span></a>
      </div>
      <div className="swiper-pagination event-banner-pagination" />
    </div>
    <div className="event_zone">
      <div className="tab_ui scroll category_evnet" data-scroll-view={6} data-tab-scroll-view={5}>{/* 스크롤탭 : class: scroll / data-scroll-view 보여지는 탭 수 */}
        <ul>
          <li className="tabs on"><a href="#" className="btn">전체</a></li>
          <li className="tabs"><a href="#" className="btn">소니스토어 단독</a></li>
          <li className="tabs"><a href="#" className="btn">혜택존</a></li>
          <li className="tabs"><a href="#" className="btn">예약판매</a></li>
          <li className="tabs"><a href="#" className="btn">정품등록 이벤트</a></li>
          <li className="tabs"><a href="#" className="btn">LIVE ON</a></li>
        </ul>
      </div>
      <div className="tab_ui_info">
        <div className="tab_ui_inner view">{/* Tab 1 : 전체 */}
          <div className="event_list">
            <div className="category_head">
              <p className="tit">전체</p>
              <div className="itemsort" aria-label="기획전 전체 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
            </div>
          </div>
          {/* 등록된 이벤트가 없을 경우 */}
          <div className="no_data" style={{display: 'none'}}>
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>{/* // tab_ui_inner */}
        <div className="tab_ui_inner">{/* TAB 2 : 소니스토어 단독 */}
          <div className="event_list" style={{display: 'none'}}>
            <div className="category_head">
              <p className="tit">소니스토어 단독</p>
              <div className="itemsort" aria-label="소니스토어 단독 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">{/* 기획전 목록 */}
            </div>
          </div>
          <div className="no_data">{/* 등록된 이벤트가 없을 경우 */}
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>
        <div className="tab_ui_inner">{/* TAB 3 : 혜택존 */}
          <div className="event_list">
            <div className="category_head">
              <p className="tit">혜택존</p>
              <div className="itemsort" aria-label="혜택 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
            </div>
          </div>
          {/* 등록된 이벤트가 없을 경우 */}
          <div className="no_data" style={{display: 'none'}}>
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>
        <div className="tab_ui_inner">{/* TAB 4 : 예약판매 */}
          <div className="event_list">
            <div className="category_head">
              <p className="tit">예약판매</p>
              <div className="itemsort" aria-label="예약판매 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
            </div>
          </div>
          {/* 등록된 이벤트가 없을 경우 */}
          <div className="no_data" style={{display: 'none'}}>
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>
        <div className="tab_ui_inner">{/* TAB 5 : 정품등록 이벤트 */}
          <div className="event_list">
            <div className="category_head">
              <p className="tit">정품등록 이벤트</p>
              <div className="itemsort" aria-label="정품등록 이벤트 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
            </div>
          </div>
          {/* 등록된 이벤트가 없을 경우 */}
          <div className="no_data" style={{display: 'none'}}>
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>
        <div className="tab_ui_inner">{/* TAB 6 : LIVE ON */}
          <div className="event_list">
            <div className="category_head">
              <p className="tit">LIVE ON</p>
              <div className="itemsort" aria-label="LIVE ON 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
              <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된 기획전</a>
            </div>
            <div className="item_list">
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
              <div className="item_row">
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_01.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
                <div className="event_item">
                  <a href="#" className="item">
                    <div className="img"><img src="/images/_tmp/tmp_event_list_02.png" alt="" /></div>
                    <div className="event_desc">
                      <p className="tit">공간을 밝히는 스피커 SRS-XP500<br />런칭 이벤트</p>
                      <p className="event_duration">2021.06.01 ~ 2021.06.20</p>
                    </div>
                  </a>
                  <a href="#" className="event_share popup_comm_btn" data-popup-name="pop_share">공유하기</a>
                </div>
              </div>
            </div>
          </div>
          {/* 등록된 이벤트가 없을 경우 */}
          <div className="no_data" style={{display: 'none'}}>
            <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
          </div>
        </div>{/* e: tab_ui_inner */}
        <div className="btn_article comm_more line">{/* 목록이 없을 경우 숨김 처리 */}
          <a href="#" className="more_btn" title="기획전 더보기">더보기</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
        </>
    );
}