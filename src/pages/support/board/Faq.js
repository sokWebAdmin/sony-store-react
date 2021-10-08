import { React, useEffect } from 'react';

//SEO
import SEOHelmet from '../../../components/SEOHelmet';

//api

//css
import "../../../assets/scss/contents.scss";
import "../../../assets/scss/support.scss";

//context
import { fetchBoardConfig, useBoardDispatch, useBoardState } from '../../../context/board.context';

//components
import FaqContent from './faq/FaqContent';
import Tabs from './Tabs';

export default function Faq() {
  const dispatch = useBoardDispatch();
  const { config } = useBoardState();

  useEffect(() => {
    if (config.faq?.boardNo > 0) return;
    fetchBoardConfig(dispatch, config.faq?.boardNo);
  }, [dispatch, config.faq?.boardNo]);

  return (
    <>
      <SEOHelmet title={"고객 서비스: FAQ"} />
      <div className="contents support">
        <div className="container full">
          <div className="content">
            <div className="faq_notice_head">
              <div className="common_head first_tit">
                <h1 className="common_head_name">FAQ &amp; 공지사항</h1>
                <p className="common_head_txt">소니스토어에 많이 물어보시는 질문과<br className="pc_none" /> 새로운 소식을 만나보세요.</p>
              </div>
              <Tabs />
            </div>
            <FaqContent />
          </div>
        </div>
      </div>
    </>
  );
} 
