import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import qs from 'qs';
import dayjs from 'dayjs';

import Event from 'components/event/Event';
import LayerPopup from 'components/common/LayerPopup';
import Alert from 'components/common/Alert';
import { getDisplayEvents } from 'api/display';
import { useAlert, useClickOutside } from 'hooks';
import { shareKakaoButton, shareKakaoStoryButton } from 'utils/share';
import { bannerCode } from 'bannerCode';
import 'assets/scss/event.scss';

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
    pc: 10,
    tb: 10,
    mo: 3,
};

const EventBottom = () => {
    SwiperCore.use([Navigation]);
    const history = useHistory();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [tabState, setTabState] = useState('all');
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

    const query = qs.parse(history.location.search, {
        ignoreQueryPrefix: true,
    });
    useLayoutEffect(() => {
        setTabState(query.tab ?? 'all');
    }, [query.tab]);

    const fetchDisplayEvents = async () => {
        const { curation } = bannerCode;
        const keyword = tags[tabState];
        const { data } = await getDisplayEvents(keyword);
        const eventData = data.filter(({ eventNo }) => eventNo !== curation);
        sortEvents(eventData, true);
    };

    const modifyTabs = (tabData = tabs) => {
        setTabState(query.tab || 'all');
        const showLabel = tabData.find(
            ({ key }) => (query.tab || 'all') === key,
        )?.label;
        setShowLabel(showLabel);
    };

    const sortEvents = (data = events, sortNewest = newest) => {
        const sortByLatestCreationDate = (a, b) =>
            dayjs(a.startYmdt).diff(b.startYmdt) < 0 ? 1 : -1;
        const sortByOldestCreationDate = (a, b) =>
            dayjs(a.startYmdt).diff(b.startYmdt) > 0 ? 1 : -1;

        const sortData = sortNewest
            ? [...data].sort(sortByLatestCreationDate)
            : [...data].sort(sortByOldestCreationDate);
        setEvents(sortData.filter(({ tag }) => tag));
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

    const getLink = (
        origin = true,
        eventNo = productNo,
        tagName = tag,
        event = selectEvent,
    ) => {
        const key = Object.keys(tags).find((key) =>
            tagName.includes(tags[key]),
        );

        if (event.url !== '') {
            const customUrl = event.url.includes('event/live-on')
                ? `event/live-on`
                : `${event.url}`;
            return `${
                origin ? document.location.origin : ''
            }/${customUrl}/${eventNo}`;
        }
        if (key === 'all') {
            return `${
                origin ? document.location.origin : ''
            }/event/detail/${eventNo}`;
        } else if (key === 'only') {
            return `${
                origin ? document.location.origin : ''
            }/event/${key}/${eventNo}`;
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

    const onSortClick = (e) => setSortSelect((prev) => !prev);

    const onTabClick = (key, label) => {
        setTabState(key);
        setShowLabel(label);
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

    return (
        <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            {showShareLayer && (
                <LayerPopup className='pop_share' onClose={closeShareLayer}>
                    <p className='pop_tit'>공유하기</p>
                    <div className='copy_box'>
                        <span className='copy_txt'>{getLink()}</span>
                        <button
                            className='copy_url'
                            onClick={() => copyLink(getLink())}
                        >
                            링크 복사
                        </button>
                    </div>
                    <div className='share_list'>
                        <ul>
                            <li className='lists'>
                                <a
                                    href='javascript:void(0)'
                                    className='share_btn kakaotalk'
                                    onClick={() =>
                                        shareKakaoButton(getLink(), label)
                                    }
                                >
                                    카카오톡
                                </a>
                            </li>
                            <li className='lists'>
                                <a
                                    href='javascript:void(0)'
                                    className='share_btn kakaostory'
                                    onClick={() =>
                                        shareKakaoStoryButton(getLink(), label)
                                    }
                                >
                                    카카오스토리
                                </a>
                            </li>
                            <li className='lists'>
                                <a
                                    href={
                                        window.anchorProtocol +
                                        `www.facebook.com/sharer/sharer.php?u=${getLink()}`
                                    }
                                    onClick={window.openBrowser}
                                    className='share_btn facebook'
                                    target='_blank'
                                >
                                    페이스북
                                </a>
                            </li>
                            <li className='lists'>
                                <a
                                    href={
                                        window.anchorProtocol +
                                        `twitter.com/intent/tweet?url=${getLink()}`
                                    }
                                    onClick={window.openBrowser}
                                    className='share_btn twitter'
                                    target='_blank'
                                >
                                    트위터
                                </a>
                            </li>
                            <li className='lists'>
                                <a
                                    href={
                                        window.anchorProtocol +
                                        `social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                                            getLink(),
                                        )}`
                                    }
                                    onClick={window.openBrowser}
                                    className='share_btn line'
                                    target='_blank'
                                >
                                    라인
                                </a>
                            </li>
                            <li className='lists'>
                                <a
                                    href={
                                        window.anchorProtocol +
                                        `band.us/plugin/share?body=${label}&route=${getLink()}`
                                    }
                                    onClick={window.openBrowser}
                                    className='share_btn band'
                                    target='_blank'
                                >
                                    밴드
                                </a>
                            </li>
                        </ul>
                    </div>
                </LayerPopup>
            )}
            <div className='event_zone'>
                <div
                    className='tab_ui scroll category_evnet swiper-container'
                    data-scroll-view={tabs.length}
                    data-tab-scroll-view='5'
                >
                    <Swiper
                        className='swiper-wrapper'
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
                                swiper.navigation.update();
                            },
                        }}
                        onSwiper={setSwiperTab}
                    >
                        {tabs &&
                            tabs.map(({ key, label }) => {
                                return (
                                    <SwiperSlide
                                        key={`tab_${key}`}
                                        className={`tabs swiper-slide ${
                                            tabState === key ? 'on' : ''
                                        }`}
                                        style={{ flexGrow: 1 }}
                                    >
                                        <Link
                                            to={`/event/list?tab=${key}`}
                                            onClick={() =>
                                                onTabClick(key, label)
                                            }
                                            className='btn'
                                        >
                                            {label}
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
                <div className='tab_ui_info'>
                    <div className='tab_ui_inner view'>
                        <div className='event_list'>
                            <div className='category_head'>
                                <p className='tit'>{showLabel}</p>
                                <div
                                    className={`itemsort ${
                                        sortSelect ? 'itemsort--open' : ''
                                    }`}
                                    aria-label='기획전 전체 정렬'
                                    ref={sortRef}
                                >
                                    <button
                                        className='itemsort__button'
                                        onClick={onSortClick}
                                    >
                                        <span className='itemsort__button__label sr-only'>
                                            정렬기준:
                                        </span>
                                        <span className='itemsort__button__selected'>
                                            {newest ? '최신순' : '오래된 순'}
                                        </span>
                                    </button>
                                    <div className='itemsort__drawer'>
                                        <ul className='itemsort__items'>
                                            <li
                                                className={`itemsort__item ${
                                                    newest
                                                        ? 'itemsort__item--active'
                                                        : ''
                                                }`}
                                            >
                                                <button
                                                    className='itemsort__item__link'
                                                    onClick={() => {
                                                        setNewest(true);
                                                        setSortSelect(false);
                                                    }}
                                                >
                                                    최신순
                                                </button>
                                            </li>
                                            <li
                                                className={`itemsort__item ${
                                                    !newest
                                                        ? 'itemsort__item--active'
                                                        : ''
                                                }`}
                                            >
                                                <button
                                                    className='itemsort__item__link'
                                                    onClick={() => {
                                                        setNewest(false);
                                                        setSortSelect(false);
                                                    }}
                                                >
                                                    오래된 순
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Link
                                    to='/event/expired'
                                    className='button button_positive button-s link_btn'
                                >
                                    종료된 기획전
                                </Link>
                            </div>
                            <div className='item_list'>
                                {events &&
                                    [
                                        ...Array(
                                            Math.round(events.length / 2),
                                        ).keys(),
                                    ].map((index) => (
                                        <div className='item_row' key={index}>
                                            <Event
                                                event={events[index * 2]}
                                                onClickEventDetail={
                                                    onClickEventDetail
                                                }
                                                openShareEventLayer={
                                                    openShareEventLayer
                                                }
                                            />
                                            {index * 2 + 1 < events.length && (
                                                <Event
                                                    event={
                                                        events[index * 2 + 1]
                                                    }
                                                    onClickEventDetail={
                                                        onClickEventDetail
                                                    }
                                                    openShareEventLayer={
                                                        openShareEventLayer
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {events.length === 0 && (
                            <div className='no_data'>
                                <span className='ico_no_data'>
                                    등록된 이벤트가 없습니다.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventBottom;
