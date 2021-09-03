import { React, useEffect, useMemo, useState } from 'react';

//SEO
import SEOHelmet from '../../../../components/SEOHelmet';

//api
// import { sampleApi } from "../../api/sample";

//css
import "../../../../assets/scss/contents.scss";
import "../../../../assets/scss/support.scss"
import { getBoardByArticleId } from '../../../../api/manage';
import { useBoardState } from '../../../../context/board.context';
import { Link } from 'react-router-dom';
import Tabs from '../tabs';

const fetchNotice = async (boardNo, articleNo, setNotice) => {
  if (!(boardNo > 0)) return;

  const response = await getBoardByArticleId({
    pathParams: {
      boardNo,
      articleNo,
    }
  });

  setNotice(prevState => ({
    ...prevState,
    ...response.data,
  }));
}

const goBack = (event, history) => {
  event.preventDefault();
  history.goBack();
}

export default function NoticeDetail({ match, history }) {
  const { config } = useBoardState();
  const [ notice, setNotice ] = useState({ });
  const articleNo = useMemo(() => Number(match.params.articleNo), [match.params.articleNo]);

  const { registerYmdt, title, content, viewCnt } = notice;

  useEffect(() => {
    const boardNo = config.notice.boardNo;
    fetchNotice(boardNo, articleNo, setNotice);
  }, [config.notice.boardNo, articleNo]);

  return (
    <>
      <SEOHelmet title={"구매상담 이용약관 동의"} />
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
            <div className="faq_notice_inner">
              <div className="notice_detail">
                <div className="notice_detail_head">
                  <p className="tit">{ title }</p>
                </div>
                <div className="notice_detail_inner">
                  <div className="notice_cont_tit">
                    <p className="notice_date">등록일<span className="val">{ registerYmdt?.substring(0, 10) }</span></p>
                    <p className="notice_pv">조회수<span className="val">{ viewCnt }</span></p>
                  </div>
                  <div className="notice_cont" dangerouslySetInnerHTML={{ __html: content }}></div>
                  <div className="btn_article">
                    <Link to="/notice" className="button button_positive" type="button" onClick={ event => goBack(event, history) }>목록</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  