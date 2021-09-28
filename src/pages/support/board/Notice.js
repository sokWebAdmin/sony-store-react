import React, { useEffect } from 'react';

//SEO
import SEOHelmet from '../../../components/SEOHelmet';

//api
// import { sampleApi } from "../../api/sample";

//css
import "../../../assets/scss/contents.scss"
import "../../../assets/scss/support.scss"
import { fetchBoardConfig, useBoardDispatch, useBoardState } from '../../../context/board.context';
import NoticeContent from './notice/NoticeContent';
import Tabs from './Tabs';

export default function Notice() {
  const dispatch = useBoardDispatch();
  const { config } = useBoardState();

  useEffect(() => {
    if (config?.notice.boardNo > 0) return;
    fetchBoardConfig(dispatch, config.notice.boardNo);
  }, [dispatch, config.notice.boardNo]);

  return (
    <>
      <SEOHelmet title={"소니스토어 공지사항"} />
      <div className="contents support">
        <div className="container full">
          <div className="content">
            <div className="faq_notice_head">
              <div className="common_head first_tit">
                <h1 className="common_head_name">FAQ &amp; 공지사항</h1>
                <p className="common_head_txt">소니스토어에 많이 물어보시는 질문과<br className="pc_none" />새로운 소식을 만나보세요.</p>
              </div>
              <Tabs />
            </div>
            <NoticeContent />
          </div>
        </div>
      </div>
    </>
  );
}  
