import React, { useState, useEffect, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import { useMediaQuery } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { getEventByEventNo } from '../../api/display';
import { tabUiClick } from '../../utils/utils';
import { getUrlParam } from '../../utils/location';
import EventProducts from '../../components/event/EventProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';

const _scrollView = {
  pc : 5,
  tb : 3,
  mo : 2
};

export default function Refurbish() {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { eventNo } = useParams();
  const onlyMo = useMediaQuery('(max-width: 640px)');
  const [event, setEvent] = useState(null);
  const [tabState, setTabState] = useState(getUrlParam('tab') || '전체');
  const [showLayer, setShowLayer] = useState(false);
  const [grade, setGrade] = useState('A급');

  const fetchDetailEvent = async () => {
    const response = await getEventByEventNo(eventNo, { soldout: true });
    setEvent(response.data);
  };

  const closeLayer = () => {
    document.body.style.overflow = 'auto';
    setShowLayer(false);
  }

  useEffect(() => {
    fetchDetailEvent();
    tabUiClick();
  }, []);


  return (
    <>
      <SEOHelmet title={'리퍼비시몰'} />
      {showLayer && <div className="layer agree_layer popup_refurbish" style={{display: 'block'}}>
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>리퍼비시 제품 구매시 유의사항</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <ul className="list_dot">
                    <li>리퍼비시 제품은 미세한 스크래치 및 사용 흔적이 있을 수 있고, 이로 인한 반품이나 교환은 불가합니다.</li>
                    <li>리퍼비시 제품은 추가 보증 연장, 마일리지 적립, 이벤트 대상에서 제외됩니다.</li>
                    <li>리퍼비시 제품의 경우 1주일 정도의 배송기간이 소요됩니다.</li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기" onClick={() => closeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>}
      {event && <div className="contents events">
        <div className="container full">
          <div className="content employee">
            <div className="event_header">
              <div className="event_header_inner"
                   style={{ background: `url('${onlyMo ? event.top.mobile.url : event.top.pc.url}') no-repeat 0 0` }}>
                <h1 className="event_header_title">{event.label}</h1>
                <p className="event_header_desc">{event.promotionText}</p>
                <div className="event_header_link"><a href="javascript:void(0)" onClick={() => {
                  document.body.style.overflow = "hidden";
                  setShowLayer(true);
                }}>임직원몰 이용규정</a></div>
              </div>
            </div>
            <div className="event_tablist">
              <div className="tab_ui scroll category_evnet swiper-container">
                <Swiper
                  className="swiper-wrapper"
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  slidesPerView={_scrollView.pc}
                  breakpoints={{
                    320: {
                      slidesPerView: _scrollView.mo,
                    },
                    641: {
                      slidesPerView: _scrollView.tb,
                    },
                    1281: {
                      slidesPerView: _scrollView.pc,
                    },
                  }}
                  on={{
                    init: swiper => {
                      swiper.params.navigation.prevEl = prevRef.current
                      swiper.params.navigation.nextEl = nextRef.current
                      swiper.navigation.update()
                    },
                  }}
                >
                  <SwiperSlide className={`tabs swiper-slide ${tabState === '전체' ? 'on' : ''}`}>
                    <Link to={`?tab=전체`} onClick={() => setTabState('전체')} className="btn">전체</Link>
                  </SwiperSlide>
                  {event.section.map(({label}) => {
                    return (
                      <SwiperSlide key={`tab_${label}`} className={`tabs swiper-slide ${tabState === label ? 'on' : ''}`}>
                        <Link to={`?tab=${label}`} onClick={() => setTabState(label)} className="btn">{label}</Link>
                      </SwiperSlide>
                    )
                  })}
                  <div className="swiper-button-prev" ref={prevRef}></div>
                  <div className="swiper-button-next" ref={nextRef}></div>
                </Swiper>
              </div>
              <div className="tab_ui_info">
                <div className="tab_ui_inner view">
                  <div className="employee_prd">
                    <div className="section_top">
                      <h2 className="title">{tabState}</h2>
                      <div className="itemsort" aria-label="상품 정렬">
                        <button className="itemsort__button">
                          <span className="itemsort__button__label sr-only">정렬기준:</span>
                          <span className="itemsort__button__selected">선택</span>
                        </button>
                        <div className="itemsort__drawer">
                          <ul className="itemsort__items">
                            <li className={`itemsort__item ${grade === 'A급' ? 'itemsort__item--active' : ''}`}><a href="javascript:void(0)" onClick={() => setGrade('A급')}
                                                                                                                  className="itemsort__item__link">A급</a></li>
                            <li className={`itemsort__item ${grade === 'B급' ? 'itemsort__item--active' : ''}`}><a href="javascript:void(0)" onClick={() => setGrade('B급')} className="itemsort__item__link">B급</a></li>
                            <li className={`itemsort__item ${grade === 'C급' ? 'itemsort__item--active' : ''}`}><a href="javascript:void(0)" onClick={() => setGrade('C급')} className="itemsort__item__link">C급</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <EventProducts event={event} filterLabel={tabState} grade={grade} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}