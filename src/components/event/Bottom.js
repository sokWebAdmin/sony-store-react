import React, { useEffect, useState } from 'react';
import { getDisplayEvents, getEventByEventNo } from '../../api/display';
import { Link } from 'react-router-dom';
import { getUrlParam } from '../../utils/location';
import moment from 'moment';

const tabs = [
  {key: 'all', label: '전체'},
  {key: 'only', label: '소니스토어 단독'},
  {key: 'benefit-zone', label: '혜택존'},
  {key: 'pre-order', label: '예약판매'},
  {key: 'refined', label: '정품등록 이벤트'},
  {key: 'live-on', label: 'LIVE ON'},
]
const tags = {
  all: '',
  only: '단독',
  'benefit-zone': '혜택존',
  'pre-order': '예약판매',
  refined: '정품등록',
  'live-on': 'LIVE_ON',
}

const EventBottom = () => {
  const [events, setEvents] = useState([]);
  const [tabState, setTabState] = useState(getUrlParam('tab') || 'all');
  const [newest, setNewest] = useState(true);

  const fetchDisplayEvents = async () => {
    const keyword = tags[tabState];
    const { data } = await getDisplayEvents(keyword);
    sortEvents(data);
  }

  const sortEvents = (data = events) => {
    const sortByLatestCreationDate = (a, b) => {
      const dateL = moment(a.startYmdt)
        .toDate()
        .getTime();
      const dateR = moment(b.startYmdt)
        .toDate()
        .getTime();
      return dateL < dateR ? 1 : -1;
    };
    const sortByOldestCreationDate = (a, b) => {
      const dateL = moment(a.startYmdt)
        .toDate()
        .getTime();
      const dateR = moment(b.startYmdt)
        .toDate()
        .getTime();
      return dateL > dateR ? 1 : -1;
    };
    const sortData = newest ? [...data].sort(sortByLatestCreationDate) : [...data].sort(sortByOldestCreationDate);
    setEvents(sortData);
  }

  const formatYmdt = (ymdt) => new Date(ymdt).toISOString().slice(0, 10);

  const onClickEventDetail = async (eventNo) => {
    const test = await getEventByEventNo(eventNo, {});
    console.log(test.data);
  };

  const openShareEventLayer = () => {
    alert('TODO: share event layer')
  }

  useEffect(() => {
    fetchDisplayEvents();
  }, [tabState]);

  useEffect(() => {
    events.length && sortEvents();
  }, [newest])

  return (
    <>
      <div className="event_zone">
        <div className="tab_ui scroll category_evnet">
          <ul>
            {tabs.map(({key, label}) => {
              return (
                <li key={`tab_${key}`} className={`tabs ${tabState === key ? 'on' : ''}`}>
                  <Link to={`?tab=${key}`} onClick={() => setTabState(key)} className="btn">{label}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="tab_ui_info">
          <div className="tab_ui_inner view">
            <div className="event_list">
              <div className="category_head">
                <p className="tit">전체</p>
                <div className="itemsort" aria-label="기획전 전체 정렬">
                  <div className="itemsort__drawer">
                    <ul className="itemsort__items">
                      <li className={`itemsort__item ${newest ? 'itemsort__item--active' : ''}`}>
                        <a href="javascript:void(0)"
                           className="itemsort__item__link" onClick={() => setNewest(true)}>최신순</a>
                      </li>
                      <li className={`itemsort__item ${!newest ? 'itemsort__item--active' : ''}`}>
                        <a href="javascript:void(0)" className="itemsort__item__link" onClick={() => setNewest(false)}>오래된 순</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <Link to="/event/expired" className="button button_positive button-s link_btn">종료된 기획전</Link>
              </div>
              <div className="item_list">
                <div className="item_row">
                  {events && events.map(({eventNo, label, pcImageUrl, startYmdt, endYmdt}) => {
                    return (
                      <div className="event_item" key={eventNo} onClick={() => onClickEventDetail(eventNo)}>
                        <a href="javascript:" className="item">
                          <div className="img"><img src={pcImageUrl} alt={label} /></div>
                          <div className="event_desc">
                            <p className="tit">{label}</p>
                            <p className="event_duration">{formatYmdt(startYmdt)} ~ {formatYmdt(endYmdt)}</p>
                          </div>
                        </a>
                        <a href="javascript:void(0)" className="event_share popup_comm_btn" onClick={() => openShareEventLayer()}>공유하기</a>
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
        </div>
      </div>
    </>
  );
};

export default EventBottom;
