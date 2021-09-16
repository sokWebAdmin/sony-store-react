import { React, useEffect } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss";
import { policies } from '../../const/support';
import { toLocalDateStr } from '../../utils/dateFormat';
import { useTerms } from '../../hooks/support';
import Articles from '../../components/support/Articles';


export default function Policy() {
  const { 
    activeTerms,
    prevTerms,
    prevEnforcementDate,
    historyVisible,
    fetchTerms,
    fetchTermsHistory,
    handleHistory
   } = useTerms('PI_PROCESS');

   useEffect(() => {
    fetchTerms();
    fetchTermsHistory();
   }, []);

  return (
    <>
      <SEOHelmet title={"소니스토어 개인정보처리방침"} />
      <div className="contents">
        <div className="container">
          <div className="content">
            <div className="page">
              <h1 className="page__title">소니스토어 개인정보처리방침</h1>
              <p className="page__desc">소니스토어의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</p>
            </div>
            <div className="terms">
              <div className="list_box">
                <p className="date">
                  <strong>{ historyVisible ? '' : `시행일자 : ${ toLocalDateStr(activeTerms?.enforcementDate) }` }</strong>
                  <a href="#none" className="btn_go_ar" onClick={handleHistory}>
                    <span>{ historyVisible ? '개정 소니스토어 개인정보처리방침 보기' : '이전 소니스토어 개인정보처리방침 보기' }</span>
                  </a>
                </p>
                <Articles articles={policies} />
              </div>
              <div className="foot_box">
                <div dangerouslySetInnerHTML={{ __html: historyVisible ? prevTerms?.contents : activeTerms?.contents }}></div>
                <div className="caution_box">
                  {
                    historyVisible ?
                    <strong className="caution_box--date">직전변경일 : { toLocalDateStr(prevEnforcementDate) || '-' } / <span>최종변경일 : { toLocalDateStr(prevTerms?.enforcementDate) }</span></strong> 
                    :
                    <strong className="caution_box--date">직전변경일 : { toLocalDateStr(prevTerms?.enforcementDate) } / <span>최종변경일 : { toLocalDateStr(activeTerms?.enforcementDate) }</span></strong>
                  }
                  <a href="#none" className="btn_go_ar" onClick={handleHistory}>
                    <span>{ historyVisible ? '개정 소니스토어 개인정보처리방침 보기' : '이전 소니스토어 개인정보처리방침 보기' }</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}