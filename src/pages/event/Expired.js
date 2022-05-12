import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import ViewMore from 'components/common/ViewMore';
import SEO from 'components/SEO';
import { getDisplayCloseEvents } from 'api/display';
import 'assets/scss/event.scss';

const Expired = () => {
    const [events, setEvents] = useState({ items: [], totalCount: 0 });
    const [keyword, setKeyword] = useState('');

    // FIXME: 인풋을 클릭할때마다 검색
    const fetchInitDisplayEvents = async (pageNumber = 1, keyword = '') => {
        const query = keyword
            ? { eventTitle: keyword.trim(), pageNumber }
            : { pageNumber };
        const { data } = await getDisplayCloseEvents({
            ...query,
            hasTotalCount: true,
        });

        const closeEvents =
            pageNumber === 1
                ? data
                : {
                      items: events.items.concat(data.items),
                      totalCount: data.totalCount,
                  };
        setEvents({
            ...closeEvents,
            items: closeEvents.items.filter(({ tag }) => tag),
        });
    };

    useEffect(() => {
        fetchInitDisplayEvents();
    }, []);

    return (
        <>
            <SEO data={{ title: '종료된 기획전' }} />
            <div className='container full expired'>
                <div className='content'>
                    <div className='common_head first_tit'>
                        <Link to='/event/list' className='common_head_back'>
                            기획전
                        </Link>
                        <h1 className='common_head_name'>종료된 기획전</h1>
                    </div>
                    <div className='end_event'>
                        <form action=''>
                            <div className='search_zone'>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: '#222',
                                        borderBottom: '1px solid #222',
                                        padding: '10px 50px 16px',
                                    }}
                                >
                                    제목
                                </span>
                                <div
                                    className='group search_box'
                                    onClick={() =>
                                        fetchInitDisplayEvents(1, keyword)
                                    }
                                >
                                    <div className='inp_box'>
                                        <input
                                            type='text'
                                            id='dd'
                                            className='search_inp'
                                            placeholder='검색어를 입력하세요.'
                                            autoComplete='off'
                                            maxLength='50'
                                            onChange={(e) =>
                                                setKeyword(e.target.value)
                                            }
                                            value={keyword}
                                            onKeyPress={(event) => {
                                                if (
                                                    event.code === 'Enter' ||
                                                    event.code === 'NumpadEnter'
                                                ) {
                                                    event.preventDefault();
                                                    fetchInitDisplayEvents(
                                                        1,
                                                        keyword,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='end_event_inner'>
                            <div className='col_table_wrap end_event_list'>
                                <div className='col_table'>
                                    <div className='col_table_head'>
                                        <div className='col_table_row'>
                                            <div className='col_table_cell'></div>
                                            <div className='col_table_cell divide'>
                                                <div className='divide_table'>
                                                    <div className='table_cell'>
                                                        제목
                                                    </div>
                                                    <div className='table_cell'>
                                                        이벤트 기간
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col_table_body'>
                                        {events?.items &&
                                            events.items.map(
                                                ({
                                                    eventNo,
                                                    label,
                                                    startYmdt,
                                                    endYmdt,
                                                }) => {
                                                    return (
                                                        <div
                                                            className='col_table_row'
                                                            key={eventNo}
                                                        >
                                                            <div className='col_table_cell event_name'></div>
                                                            <div className='col_table_cell divide'>
                                                                <div className='divide_table'>
                                                                    <div className='table_cell tal event_name'>
                                                                        <a className='txt'>
                                                                            {
                                                                                label
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                    <div className='table_cell event_duration'>
                                                                        <p className='txt'>
                                                                            {`${dayjs(
                                                                                startYmdt,
                                                                            ).format(
                                                                                'YY.MM.DD',
                                                                            )} ~ ${dayjs(
                                                                                endYmdt,
                                                                            ).format(
                                                                                'YY.MM.DD',
                                                                            )}`}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                    </div>
                                </div>
                                <ViewMore
                                    totalCount={events.totalCount}
                                    viewMore={fetchInitDisplayEvents}
                                    pageSize={10}
                                    keyword={keyword}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Expired;
