import React from "react"
import { Link } from "react-router-dom";
import { formatDateWithDot } from "../../utils/dateFormat";
const getHightKeyword = (title, keyword) => {
  const [ prev, next ] = title.split(keyword);
  return `${prev}<strong class="keword">${keyword}</strong>${next}`
};

export default function NoticeResult({ noticeList, noticeCount, keyword }) {
  return (
    <>
      <div className="section_top">
        <h2 className="title">공지사항<span>({noticeCount})</span></h2>
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
      <div className="result_list">
        <ul className="noti">
          {
            noticeList.map(notice => (
              <li key={ notice.articleNo }>
                <Link to={`/notice/${notice.articleNo}`}>
                  <span className="num">{ notice.articleNo }</span>
                  <span className="tit" dangerouslySetInnerHTML={{ __html: getHightKeyword(notice.title, keyword) }}></span>
                  <span className="date">{ formatDateWithDot(notice.registerYmdt) }</span>
                </Link>
              </li>
            ))
          }
          {/* <li>
            <a href="#none">
              <span className="num">29240</span>
              <span className="tit">아이유와 함께하는 MDR HRA <strong className="keword">헤드폰</strong> 정품등록 이벤트 당첨자 발표</span>
              <span className="date">2015. 08. 11</span>
            </a>
          </li>
          <li>
            <a href="#none">
              <span className="num">29240</span>
              <span className="tit">소니 <strong className="keword">헤드폰</strong> 썸머 페스티발 당첨자 발표</span>
              <span className="date">2015. 08. 11</span>
            </a>
          </li> */}
        </ul>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="공지사항 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/* 공지사항 리스트 영역 */}
          </>
  )
}