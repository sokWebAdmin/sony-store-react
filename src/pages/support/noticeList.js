import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/support.css"

export default function Notice() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container full">
  <div className="content">
    <div className="faq_notice_head">
      <div className="common_head first_tit">
        <h1 className="common_head_name">FAQ &amp; 공지사항</h1>
        <p className="common_head_txt">소니스토어에 많이 물어보시는 질문과<br className="pc_none" />새로운 소식을 만나보세요.</p>
      </div>
      <div className="tab_link_zone">
        <ul className="tab_link_inner">
          <li className="tabs">
            <a href="/faq" className="tab_btn" title="FAQ 보기"><span className="tit">FAQ</span></a>
          </li>
          <li className="tabs on">
            <a href="/notice-list" className="tab_btn" title="공지사항 보기"><span className="tit">공지사항</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div className="faq_notice_inner">
      <div className="faq_notice_cont notice_list">
        <div className="itemsort" aria-label="종료된 기획전 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
            </ul>
          </div>
        </div>
        <div className="col_table_wrap">
          <div className="col_table">
            <div className="col_table_head">
              <div className="col_table_row">
                <div className="col_table_cell">번호</div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell">제목</div>
                    <div className="table_cell">등록일</div>
                    <div className="table_cell">조회수</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col_table_body">
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">10</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">고객센터 정상 업무 안내</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.08.06</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">9</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.07.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">8</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.06.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">7</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">6</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">5</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">4</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">9,553</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">3</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">2</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col_table_row">
                <div className="col_table_cell notice_num">
                  <p className="txt">1</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <a href="/notice" className="txt link_btn">[당첨자 발표]6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</a>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">21.05.31</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">10,874</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* // col_table_body */}
          </div>
          <div className="btn_article comm_more">{/* 목록이 없을 경우 숨김 처리 */}
            <a href="#" className="more_btn" title="더보기">더보기</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    );
}