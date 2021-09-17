import React from 'react';

import "../../assets/scss/event.scss"

const Expired = () => {
  return (
    <>
      <div className="container full">
        <div className="content">
          <div className="common_head first_tit">
            <a href="../../html/evnet/eventList.html" className="common_head_back">기획전</a>
            <h1 className="common_head_name">종료된 기획전</h1>
          </div>
          <div className="end_event">
            <form action="">
              <div className="search_zone">
                <div className="select_ui_zone btm_line search_category">
                  <a href="#" className="selected_btn" data-default-text="제목">
                    제목
                  </a>
                  <div className="select_inner">
                    <p className="prd_tag">제목</p>
                    <ul className="select_opt">
                      <li>
                        <a href="#" className="opt_list">
                          <div className="item">제목</div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="opt_list">
                          <div className="item">내용</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="group search_box">
                  <div className="inp_box">
                    <input type="text" id="dd" className="search_inp" placeholder="검색어를 입력하세요." autoComplete="off"
                           maxLength="50" />
                  </div>
                </div>
              </div>
            </form>
            <div className="end_event_inner">
              <div className="itemsort" aria-label="종료된 기획전 정렬">
                <button className="itemsort__button">
                  <span className="itemsort__button__label sr-only">정렬기준:</span>
                  <span className="itemsort__button__selected">최신순</span>
                </button>
                <div className="itemsort__drawer">
                  <ul className="itemsort__items">
                    <li className="itemsort__item itemsort__item--active"><a href="#"
                                                                             className="itemsort__item__link">최신순</a>
                    </li>
                    <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
                  </ul>
                </div>
              </div>
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
                      <div className="col_table_cell">당첨자 발표</div>
                    </div>
                  </div>
                  <div className="col_table_body">
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">10</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">공간을 밝히는 스피커 SRS-XP500 런칭 이벤트</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <a href="#" className="button button_secondary button-s" type="button">당첨자 발표 확인</a>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">9</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"><a href="#" className="button button_secondary button-s" type="button">당첨자 발표
                          확인</a></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">8</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">7</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원 스피커 CMT-X3CD</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">6</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원 스피커 CMT-X3CD</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">5</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"><a href="#" className="button button_secondary button-s" type="button">당첨자 발표
                          확인</a></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">4</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원 스피커 CMT-X3CD</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">3</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원 스피커 CMT-X3CD</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"><a href="#" className="button button_secondary button-s" type="button">당첨자 발표
                          확인</a></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">2</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원 스피커 CMT-X3CD</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"><a href="#" className="button button_secondary button-s" type="button">당첨자 발표
                          확인</a></p>
                      </div>
                    </div>
                    <div className="col_table_row">
                      <div className="col_table_cell event_num">
                        <p className="txt">1</p>
                      </div>
                      <div className="col_table_cell divide">
                        <div className="divide_table">
                          <div className="table_cell tal event_name">
                            <p className="txt">산뜻한 일상의 시작 올인원</p>
                          </div>
                          <div className="table_cell event_duration">
                            <p className="txt">21.04.08 ~ 21.05.31</p>
                          </div>
                        </div>
                      </div>
                      <div className="col_table_cell event_result">
                        <p className="txt"><a href="#" className="button button_secondary button-s" type="button">당첨자 발표
                          확인</a></p>
                      </div>
                    </div>
                  </div>
                </div>
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
