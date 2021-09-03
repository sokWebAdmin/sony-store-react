import React, { useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getDisplayEvents, getEventByEventNo } from '../../api/display';

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';

// TODO: 기획전 리스트 api 연결까지 진행

export default function EventList() {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  const [events, setEvents] = useState([]);

  const fetchDisplayEvents = async () => {
    const { data } = await getDisplayEvents();
    setEvents(data);
  }

  useEffect(() => {
    fetchDisplayEvents();
  }, []);

  const formatYmdt = (ymdt) => new Date(ymdt).toISOString().slice(0, 10);

  const onClickEventDetail = async (eventNo) => {
    const test = await getEventByEventNo(eventNo, {});
    console.log(test.data);
  };

  const openShareEventLayer = () => {
    alert('TODO: share event layer')
  }

  return (
    <>
      <SEOHelmet title='기획전' />
      <div className="contents events">
        <div className="container full">{/* full : max-width 1920 */}
          <div className="content">
            <div className="event_slider swiper-container">
              <Swiper className="swiper-wrapper"
                      slidesPerView={1}
                      loop={true}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      pagination={{
                        el: '.event-banner-pagination',
                        type: 'custom',
                        renderCustom: (swiper, current, total) => {
                          let _current = current;
                          let _total = total;
                          if (current < 10) _current = '0' + current;
                          if (total < 10) _total = '0' + total;
                          return '<span class=\'swiper-pagination-current\'>' + _current + '</span> / ' +
                            '<span class=\'swiper-pagination-total\'>' + _total + '</span>';
                        },
                      }}
                      on={{
                        init: swiper => {
                          swiper.slides.forEach(e => {
                            let _bgSrc = e.querySelector('.bg_img').getAttribute('src'),
                              $bgBox = e.querySelector('.slider_box');
                            $bgBox.setAttribute('style', 'background:url(\'' + _bgSrc + '\') no-repeat center top;');
                          });
                        },
                      }}
              >
                <SwiperSlide className="swiper-slide">
                  <div className="slider_box"
                       style={{ background: `url('/images/_tmp/pc_eventMain_img01.png') center 80% / cover no-repeat` }}>
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
              <div className="tab_ui scroll category_evnet" data-scroll-view={6}
                   data-tab-scroll-view={5}>{/* 스크롤탭 : class: scroll / data-scroll-view 보여지는 탭 수 */}
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
                <div className="tab_ui_inner view">
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
                            <li className="itemsort__item itemsort__item--active"><a href="#"
                                                                                     className="itemsort__item__link">최신순</a>
                            </li>
                            <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                          </ul>
                        </div>
                      </div>
                      <a href="../../html/evnet/endList.html" className="button button_positive button-s link_btn">종료된
                        기획전</a>
                    </div>
                    <div className="item_list">
                      <div className="item_row">
                        {events?.map(({eventNo, label, pcImageUrl, startYmdt, endYmdt}) => {
                          return (
                            <div className="event_item" key={eventNo} onClick={() => onClickEventDetail(eventNo)}>
                              <a href="javascript:" className="item">
                                <div className="img"><img src={pcImageUrl} alt={label} /></div>
                                <div className="event_desc">
                                  <p className="tit">{label}</p>
                                  <p className="event_duration">{formatYmdt(startYmdt)} ~ {formatYmdt(endYmdt)}</p>
                                </div>
                              </a>
                              <a href="#" className="event_share popup_comm_btn" onClick={() => openShareEventLayer()}>공유하기</a>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  {/* 등록된 이벤트가 없을 경우 */}
                  {events.length === 0 && (<div className="no_data">
                    <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
                  </div>)}
                </div>
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