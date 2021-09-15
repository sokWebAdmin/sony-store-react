import React from "react"
export default function CategoryResult({ categoryCount }) {
  return (
    <>
                {/* 카테고리 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">카테고리<span>({categoryCount})</span></h2>
      </div>
      <div className="result_list">
        <ul className="category">
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">          엠프</strong>
            </a>
          </li>
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">헤드폰 엠프헤드폰 엠프헤드폰 엠프</strong>
            </a>
          </li>
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">헤드폰 엠프헤드폰</strong>
            </a>
          </li>
        </ul>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="카테고리 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/* 카테고리 리스트 영역 */}
          </>
  )
}