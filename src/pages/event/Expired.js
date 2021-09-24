import React, { useEffect, useState } from 'react';

import "../../assets/scss/event.scss"
import { getDisplayCloseEvents } from '../../api/display';
import { getStrDate } from '../../utils/dateFormat';
import { Link } from 'react-router-dom';
import SelectBox from '../../components/common/SelectBox';
import ViewMore from '../../components/common/ViewMore';

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

const Expired = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchInitDisplayEvents = async (pageNumber = 1, keyword = '') => {
    const { data } = await getDisplayCloseEvents(keyword);
    setEvents(data);
  }

  const getLink = (origin = true, eventNo, tagName, event) => {
    const key = Object.keys(tags).find(key => tagName.includes(tags[key]));

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

  useEffect(() => {
    fetchInitDisplayEvents();
  }, []);

  return (
    <>
      <div className="container full">
        <div className="content">
          <div className="common_head first_tit">
            <Link to="/event/list" className="common_head_back">기획전</Link>
            <h1 className="common_head_name">종료된 기획전</h1>
          </div>
          <div className="end_event">
            <form action="">
              <div className="search_zone">
                <SelectBox
                  defaultInfo={{
                    type: 'dropdown',
                    placeholder: '태그',
                    className: 'search_category'
                  }}
                  selectOptions={[
                    {
                      optionNo: '01',
                      label: '태그'
                    },
                  ]}
                  selectOption={() => console.log('')}
                />
                <div className="group search_box" onClick={() => fetchInitDisplayEvents(keyword)}>
                  <div className="inp_box">
                    <input type="text" id="dd" className="search_inp" placeholder="검색어를 입력하세요." autoComplete="off"
                           maxLength="50" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                  </div>
                </div>
              </div>
            </form>
            <div className="end_event_inner">
              <div className="col_table_wrap end_event_list">
                <div className="col_table">
                  <div className="col_table_head">
                    <div className="col_table_row">
                      <div className="col_table_cell">번호</div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell">제목</div>
                          <div className="table_cell">이벤트 기간</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col_table_body">
                    {events && events.map((event, index) => {
                      const {eventNo, label, startYmdt, endYmdt, tag} = event;
                      return (
                        <div className="col_table_row" key={eventNo}>
                          <div className="col_table_cell event_num">
                            <p className="txt">{index + 1}</p>
                          </div>
                          <div className="col_table_cell divide">
                            <div className="divide_table">
                              <div className="table_cell tal event_name">
                                <Link to={getLink(false, eventNo, tag, event)} className="txt">{label}</Link>
                              </div>
                              <div className="table_cell event_duration">
                                <p className="txt">{getStrDate(startYmdt, 'YY.MM.DD')} ~ {getStrDate(endYmdt, 'YY.MM.DD')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/*TODO: API 추가개발 후 주석해제*/}
                {/*<ViewMore*/}
                {/*  totalCount={events.totalCount}*/}
                {/*  viewMore={fetchInitDisplayEvents}*/}
                {/*  pageSize={10}*/}
                {/*/>*/}
                <div className="btn_article comm_more">
                  <a href="#" className="more_btn" title="더보기">더보기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expired;
