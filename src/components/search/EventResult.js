import React from "react"
export default function EventResult({ eventList, eventCount }) {
  console.log(eventList);
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
        </div>      </div>
      <ul className="product_List grid">
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img04.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">5월의 선물</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img05.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">톡톡, 우리 친구할까요?</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img06.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">다시, 음악의 계절</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img07.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">눈부신너의 스무 살을 축하해</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img08.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">산뜻한 일상의 시작 올인원 스피커<br />CMT-X3CD</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img09.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">소니스토어 압구정 디퓨저 사운드<br />스피커 청음 이벤트</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
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