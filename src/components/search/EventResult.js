import { useState } from 'react';
import { Link } from 'react-router-dom';
import { unescape } from 'lodash';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { PAGE_SIZE } from 'const/search';
import ViewMore from 'components/common/ViewMore';
import Newest from 'components/search/Newest';

export default function EventResult({
    fetchEvent,
    eventList,
    eventCount,
    newest,
    setNewest,
}) {
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

    return (
        <>
            <div className='section_top'>
                <h2 className='title'>
                    기획전<span>({eventCount})</span>
                </h2>
                <div
                    className={`itemsort ${
                        mobileOrderOpen ? 'itemsort--open' : ''
                    }`}
                    aria-label='게시판 정렬'
                >
                    <button
                        className='itemsort__button'
                        onClick={() => {
                            setMobileOrderOpen((prev) => !prev);
                        }}
                    >
                        <span className='itemsort__button__label sr-only'>
                            정렬기준:
                        </span>
                        <span className='itemsort__button__selected'>
                            최신순
                        </span>
                    </button>
                    <Newest newest={newest} setNewest={setNewest} />
                </div>
            </div>
            <ul className='product_List grid'>
                {eventList.map(
                    ({
                        eventNo,
                        pcImageUrl,
                        label,
                        startYmdt,
                        endYmdt,
                        displayPeriodType,
                    }) => (
                        <li key={eventNo}>
                            <div className='grid_inner'>
                                <div className='grid_img'>
                                    <Link to={`/event/detail/${eventNo}`}>
                                        {/* pcImageUrl mobileimageUrl */}
                                        <img src={pcImageUrl} alt={label} />
                                    </Link>
                                </div>
                                <dl className='grid_info'>
                                    <dt>
                                        <Link to={`/event/detail/${eventNo}`}>
                                            {unescape(label)}
                                        </Link>
                                    </dt>
                                    <dd>{`${dayjs(startYmdt).format(
                                        'YYYY. MM. DD',
                                    )} ~ ${
                                        displayPeriodType === 'REGULAR'
                                            ? '재고 소진 시'
                                            : dayjs(endYmdt).format(
                                                  'YYYY. MM. DD',
                                              )
                                    }`}</dd>
                                </dl>
                            </div>
                        </li>
                    ),
                )}
            </ul>
            {eventCount >= 10 && (
                <ViewMore
                    totalCount={eventCount}
                    viewMore={fetchEvent}
                    pageSize={PAGE_SIZE.EVENT}
                />
            )}
        </>
    );
}

EventResult.propTypes = {
    fetchEvent: PropTypes.func.isRequired,
    eventList: PropTypes.array.isRequired,
    eventCount: PropTypes.number.isRequired,
    newest: PropTypes.bool.isRequired,
    setNewest: PropTypes.func.isRequired,
};
