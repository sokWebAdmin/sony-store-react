import React from "react"
import { Link } from "react-router-dom";
import { formatDateWithDot } from "../../utils/dateFormat";
export default function EventResult({ eventList, eventCount }) {
  return (
    <>
      <div className="section_top">
        <h2 className="title">기획전<span>({eventCount})</span></h2>
        <div className="itemsort" aria-label="게시판 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#none" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#none" className="itemsort__item__link">오래된순</a></li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="product_List grid">
        {
          eventList.map(event => (
          <li key={event.eventNo}>
            <div className="grid_inner">
              <div className="grid_img">
                <Link to={`/event/detail/${event.eventNo}`}>
                  {/* pcImageUrl mobileimageUrl */}
                  <img src={ event.pcImageUrl } alt={event.label} />
                </Link>
              </div>
              <dl className="grid_info">
                <dt>
                  <Link to={`/event/detail/${event.eventNo}`}>{ event.label }</Link>
                </dt>
                <dd>{`${formatDateWithDot(event.startYmdt)} ~ ${formatDateWithDot(event.endYmdt)}`}</dd>
              </dl>
            </div>
          </li>
          ))
        }
      </ul>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="기획전 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/*// 기획전 리스트 영역 */}
          </>
  )
}