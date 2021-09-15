import React, { useEffect, useState } from 'react';
import { getDisplayEvents } from '../../api/display';
import { Link, useHistory } from 'react-router-dom';
import { getUrlParam } from '../../utils/location';
import moment from 'moment';
import LayerPopup from '../common/LayerPopup';
import { useAlert } from '../../hooks';
import Alert from '../common/Alert';

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
  only: '소니스토어단독',
  'benefit-zone': '혜택존',
  'pre-order': '예약판매',
  refined: '정품등록이벤트',
  'live-on': 'LIVEON',
}

const EventBottom = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [tabState, setTabState] = useState(getUrlParam('tab') || 'all');
  const [newest, setNewest] = useState(true);
  const [showShareLayer, setShowShareLayer] = useState(false);
  const {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  } = useAlert();
  const [productNo, setProductNo] = useState('');
  const [label, setLabel] = useState('');
  const [tag, setTag] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

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
  }

  const getLink = (origin = true, eventNo = productNo, tagName = tag, event = selectEvent) => {
    const key = Object.keys(tags).find(key => tagName.includes(tags[key]));

    if (event.url !== '') {
      return `${origin ? document.location.origin : ''}/${event.url}`;
    }
    if (key === 'all') {
      return `${origin ? document.location.origin : ''}/event/detail/${eventNo}`;
    } else if (key === 'only') {
      return `${origin ? document.location.origin : ''}/event/${key}/${eventNo}`;
    }
    return `${origin ? document.location.origin : ''}/event/${key}`;
}

  const copyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      openAlert('링크가 복사되었습니다.');
    });
  }

  const closeShareLayer = () => {
    setShowShareLayer(false);
  }

  useEffect(() => {
    fetchDisplayEvents();
  }, [tabState]);

  useEffect(() => {
    events.length && sortEvents();
  }, [newest]);

  const shareKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_SHARE_KEY)
      }
      kakao.Link.sendDefault({
        objectType: 'text',
        text: label,
        link: {
          mobileWebUrl: getLink(),
          webUrl: getLink(),
        },
      })
    }
  }

  const shareKakaoStoryButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_SHARE_KEY)
      }
      kakao.Story.share({
        text: label,
        url: getLink(),
      })
    }
  }

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {showShareLayer && <LayerPopup className="pop_share" onClose={closeShareLayer}>
        <p className="pop_tit">공유하기</p>
        <div className="copy_box">
          <span className="copy_txt">{getLink()}</span>
          <a href="javascript:void(0)" className="copy_url" onClick={() => copyLink(getLink())}>링크 복사</a>
        </div>
        <div className="share_list">
          <ul>
            <li className="lists"><a href="javascript:void(0)" className="share_btn kakaotalk" onClick={() => shareKakaoButton()}>카카오톡</a></li>
            <li className="lists"><a href="javascript:void(0)" className="share_btn kakaostory" onClick={() => shareKakaoStoryButton()}>카카오스토리</a></li>
            <li className="lists"><a href={`https://www.facebook.com/sharer/sharer.php?u=${getLink()}`} className="share_btn facebook" target="_blank">페이스북</a></li>
            <li className="lists"><a href={`https://twitter.com/intent/tweet?url=${getLink()}`} className="share_btn twitter" target="_blank">트위터</a></li>
            <li className="lists"><a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(getLink())}`} className="share_btn line" target="_blank">라인</a></li>
            <li className="lists"><a href={`https://band.us/plugin/share?body=${label}&route=${getLink()}`} className="share_btn band" target="_blank">밴드</a></li>
          </ul>
        </div>
      </LayerPopup>}
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
                  {events && events.map((event) => {
                    const {eventNo, label, pcImageUrl, startYmdt, endYmdt, tag: tagName} = event;
                    return (
                      <div className="event_item" key={eventNo} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        onClickEventDetail(eventNo, tagName, event);
                      }}>
                        <a href="javascript:" className="item">
                          <div className="img"><img src={pcImageUrl} alt={label} /></div>
                          <div className="event_desc">
                            <p className="tit">{label}</p>
                            <p className="event_duration">{formatYmdt(startYmdt)} ~ {formatYmdt(endYmdt)}</p>
                          </div>
                        </a>
                        <a href="javascript:void(0)" className="event_share popup_comm_btn" onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          openShareEventLayer(eventNo, label, tagName, event);
                        }}>공유하기</a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
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
