import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE } from '../../const/search';
import { formatDateWithDot } from '../../utils/dateFormat';
import ViewMore from '../common/ViewMore';
import Newest from './Newest';
import { unescape } from 'lodash';
export default function EventResult({ fetchEvent, eventList, eventCount, newest, setNewest }) {
  return (
    <>
      <div className="section_top">
        <h2 className="title">
          기획전<span>({eventCount})</span>
        </h2>
        <div className="itemsort" aria-label="게시판 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <Newest newest={newest} setNewest={setNewest} />
        </div>
      </div>
      <ul className="product_List grid">
        {eventList.map((event) => (
          <li key={event.eventNo}>
            <div className="grid_inner">
              <div className="grid_img">
                <Link to={`/event/detail/${event.eventNo}`}>
                  {/* pcImageUrl mobileimageUrl */}
                  <img src={event.pcImageUrl} alt={event.label} />
                </Link>
              </div>
              <dl className="grid_info">
                <dt>
                  <Link to={`/event/detail/${event.eventNo}`}>{unescape(event.label)}</Link>
                </dt>
                <dd>{`${formatDateWithDot(event.startYmdt)} ~ ${
                  event.displayPeriodType === 'REGULAR' ? '재고 소진 시' : formatDateWithDot(event.endYmdt)
                }`}</dd>
              </dl>
            </div>
          </li>
        ))}
      </ul>
      {eventCount >= 10 && <ViewMore totalCount={eventCount} viewMore={fetchEvent} pageSize={PAGE_SIZE.EVENT} />}
    </>
  );
}
