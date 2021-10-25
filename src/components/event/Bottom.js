import React, { useEffect, useState, useRef, useContext } from 'react';
import { getDisplayEvents } from '../../api/display';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getUrlParam } from '../../utils/location';
import moment from 'moment';
import LayerPopup from '../common/LayerPopup';
import { useAlert, useClickOutside } from '../../hooks';
import Alert from '../common/Alert';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import { shareKakaoButton, shareKakaoStoryButton } from '../../utils/share';
import '../../assets/scss/event.scss';
import { getStrDate } from '../../utils/dateFormat';

const initTabs = [
  { key: 'all', label: '전체' },
  { key: 'only', label: '소니스토어 단독' },
  { key: 'benefit-zone', label: '혜택존' },
  { key: 'pre-order', label: '예약판매' },
  { key: 'refined', label: '정품등록 이벤트' },
  { key: 'live-on', label: 'LIVE ON' },
];
const tags = {
  all: '',
  only: '소니스토어단독',
  'benefit-zone': '혜택존',
  'pre-order': '예약판매',
  refined: '정품등록이벤트',
  'live-on': 'LIVEON',
  employee: '임직원몰',
  refurbish: '리퍼비시몰',
};
const _scrollView = {
  pc: 5,
  tb: 3,
  mo: 2,
};

const EventBottom = () => {
  SwiperCore.use([Navigation]);
  const history = useHistory();
  const location = useLocation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [tabState, setTabState] = useState(getUrlParam('tab') || 'all');
  const [newest, setNewest] = useState(true);
  const [showShareLayer, setShowShareLayer] = useState(false);
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [productNo, setProductNo] = useState('');
  const [label, setLabel] = useState('');
  const [tag, setTag] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);
  const [tabs, setTabs] = useState(initTabs);
  const [swiperTab, setSwiperTab] = useState(null);
  const [showLabel, setShowLabel] = useState('전체');
  const [sortSelect, setSortSelect] = useState(false);

  const sortRef = useRef(null);

  useClickOutside(sortRef, () => setSortSelect(false));

  const fetchDisplayEvents = async () => {
    const keyword = tags[tabState];
    const { data } = await getDisplayEvents(keyword);
    sortEvents(data, true);
  };

  const modifyTabs = (tabData = tabs) => {
    setTabState(getUrlParam('tab') || 'all');
    const showLabel = tabData.find(({ key }) => (getUrlParam('tab') || 'all') === key)?.label;
    setShowLabel(showLabel);
  };

  const sortEvents = (data = events, sortNewest = newest) => {
    const sortByLatestCreationDate = (a, b) => {
      const dateL = moment(a.startYmdt).toDate().getTime();
      const dateR = moment(b.startYmdt).toDate().getTime();
      return dateL < dateR ? 1 : -1;
    };
    const sortByOldestCreationDate = (a, b) => {
      const dateL = moment(a.startYmdt).toDate().getTime();
      const dateR = moment(b.startYmdt).toDate().getTime();
      return dateL > dateR ? 1 : -1;
    };
    const sortData = sortNewest ? [...data].sort(sortByLatestCreationDate) : [...data].sort(sortByOldestCreationDate);
    setEvents(sortData);
  };

  const onClickEventDetail = (eventNo, tagName, event) => {
    setProductNo(eventNo);
    setTag(tagName);
    setSelectEvent(event);
    history.push(getLink(false, eventNo, tagName, event));
  };

  const openShareEventLayer = (eventNo, label, tagName, event) => {
    setTag(tagName);
    setProductNo(eventNo);
    setLabel(label);
    setSelectEvent(event);
    setShowShareLayer(true);
  };

  const getLink = (origin = true, eventNo = productNo, tagName = tag, event = selectEvent) => {
    const key = Object.keys(tags).find((key) => tagName.includes(tags[key]));

    if (event.url !== '') {
      return `${origin ? document.location.origin : ''}/${event.url}/${eventNo}`;
    }
    if (key === 'all') {
      return `${origin ? document.location.origin : ''}/event/detail/${eventNo}`;
    } else if (key === 'only') {
      return `${origin ? document.location.origin : ''}/event/${key}/${eventNo}`;
    }
    return `${origin ? document.location.origin : ''}/event/${key}`;
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      openAlert('링크가 복사되었습니다.');
    });
  };

  const closeShareLayer = () => {
    setShowShareLayer(false);
  };

  useEffect(() => {
    if (!swiperTab) return;

    setNewest(true);
    fetchDisplayEvents();
    swiperTab?.slideTo(Object.keys(tags).findIndex((t) => t === tabState));
  }, [tabState, swiperTab]);

  useEffect(() => {
    events.length && sortEvents();
  }, [newest]);

  useEffect(() => {
    modifyTabs();
  }, [location]);

  const Event = ({ event }) => {
    const { eventNo, label, pcImageUrl, startYmdt, endYmdt, tag: tagName, displayPeriodType } = event;
    return (
      <div
        className="event_item"
        key={eventNo}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          onClickEventDetail(eventNo, tagName, event);
        }}
      >
        <a href="javascript:" className="item">
          <div className="img">
            <img src={pcImageUrl} alt={label} />
          </div>
          <div className="event_desc">
            <p className="tit">{label}</p>
            <p className="event_duration">
              {displayPeriodType === 'PERIOD'
                ? getStrDate(startYmdt) + ' ~ ' + getStrDate(endYmdt)
                : getStrDate(startYmdt) + ' ~ 재고 소진 시'}
            </p>
          </div>
        </a>
        <a
          href="javascript:void(0)"
          className="event_share popup_comm_btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            openShareEventLayer(eventNo, label, tagName, event);
          }}
        >
          공유하기
        </a>
      </div>
    );
  };

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {showShareLayer && (
        <LayerPopup className="pop_share" onClose={closeShareLayer}>
          <p className="pop_tit">공유하기</p>
          <div className="copy_box">
            <span className="copy_txt">{getLink()}</span>
            <a href="javascript:void(0)" className="copy_url" onClick={() => copyLink(getLink())}>
              링크 복사
            </a>
          </div>
          <div className="share_list">
            <ul>
              <li className="lists">
                <a
                  href="javascript:void(0)"
                  className="share_btn kakaotalk"
                  onClick={() => shareKakaoButton(getLink(), label)}
                >
                  카카오톡
                </a>
              </li>
              <li className="lists">
                <a
                  href="javascript:void(0)"
                  className="share_btn kakaostory"
                  onClick={() => shareKakaoStoryButton(getLink(), label)}
                >
                  카카오스토리
                </a>
              </li>
              <li className="lists">
                <a
                  href={window.anchorProtocol + `www.facebook.com/sharer/sharer.php?u=${getLink()}`}
                  onClick={window.openBrowser}
                  className="share_btn facebook"
                  target="_blank"
                >
                  페이스북
                </a>
              </li>
              <li className="lists">
                <a
                  href={window.anchorProtocol + `twitter.com/intent/tweet?url=${getLink()}`}
                  onClick={window.openBrowser}
                  className="share_btn twitter"
                  target="_blank"
                >
                  트위터
                </a>
              </li>
              <li className="lists">
                <a
                  href={window.anchorProtocol + `social-plugins.line.me/lineit/share?url=${encodeURIComponent(getLink())}`}
                  onClick={window.openBrowser}
                  className="share_btn line"
                  target="_blank"
                >
                  라인
                </a>
              </li>
              <li className="lists">
                <a
                  href={window.anchorProtocol + `band.us/plugin/share?body=${label}&route=${getLink()}`}
                  onClick={window.openBrowser}
                  className="share_btn band"
                  target="_blank"
                >
                  밴드
                </a>
              </li>
            </ul>
          </div>
        </LayerPopup>
      )}
      <div className="event_zone">
        <div
          className="tab_ui scroll category_evnet swiper-container"
          data-scroll-view={tabs.length}
          data-tab-scroll-view="5"
        >
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
              init: (swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.update();
              },
            }}
            onSwiper={setSwiperTab}
          >
            {tabs &&
              tabs.map(({ key, label }) => {
                return (
                  <SwiperSlide key={`tab_${key}`} className={`tabs swiper-slide ${tabState === key ? 'on' : ''}`}>
                    <Link
                      to={`/event/list?tab=${key}`}
                      onClick={() => {
                        setTabState(key);
                        setShowLabel(label);
                      }}
                      className="btn"
                    >
                      {label}
                    </Link>
                  </SwiperSlide>
                );
              })}
            <div className="swiper-button-prev" ref={prevRef}></div>
            <div className="swiper-button-next" ref={nextRef}></div>
          </Swiper>
        </div>
        <div className="tab_ui_info">
          <div className="tab_ui_inner view">
            <div className="event_list">
              <div className="category_head">
                <p className="tit">{showLabel}</p>
                <div
                  className={`itemsort ${sortSelect ? 'itemsort--open' : ''}`}
                  aria-label="기획전 전체 정렬"
                  ref={sortRef}
                >
                  <button className="itemsort__button" onClick={() => setSortSelect(!sortSelect)}>
                    <span className="itemsort__button__label sr-only">정렬기준:</span>
                    <span className="itemsort__button__selected">{newest ? '최신순' : '오래된 순'}</span>
                  </button>
                  <div className="itemsort__drawer">
                    <ul className="itemsort__items">
                      <li className={`itemsort__item ${newest ? 'itemsort__item--active' : ''}`}>
                        <a
                          href="javascript:void(0)"
                          className="itemsort__item__link"
                          onClick={() => {
                            setNewest(true);
                            setSortSelect(false);
                          }}
                        >
                          최신순
                        </a>
                      </li>
                      <li className={`itemsort__item ${!newest ? 'itemsort__item--active' : ''}`}>
                        <a
                          href="javascript:void(0)"
                          className="itemsort__item__link"
                          onClick={() => {
                            setNewest(false);
                            setSortSelect(false);
                          }}
                        >
                          오래된 순
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <Link to="/event/expired" className="button button_positive button-s link_btn">
                  종료된 기획전
                </Link>
              </div>
              <div className="item_list">
                {events &&
                  [...Array(Math.round(events.length / 2)).keys()].map((index) => {
                    return (
                      <div className="item_row">
                        <Event event={events[index * 2]} />
                        {index * 2 + 1 < events.length && <Event event={events[index * 2 + 1]} />}
                      </div>
                    );
                  })}
              </div>
            </div>
            {events.length === 0 && (
              <div className="no_data">
                <span className="ico_no_data">등록된 이벤트가 없습니다.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventBottom;
