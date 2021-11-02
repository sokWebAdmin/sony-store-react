import { React, useEffect, useMemo } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import { toLocalDateStr } from '../../utils/dateFormat';
import { articles } from '../../const/support';
import { useTerms } from '../../hooks/support';
import Articles from '../../components/support/Articles';

export default function Terms() {
  const { activeTerms, prevEnforcementDate, prevTerms, historyVisible, fetchTerms, fetchTermsHistory, handleHistory } =
    useTerms('USE');

  useEffect(() => {
    fetchTerms();
    fetchTermsHistory();
  }, []);

  const historyButtonLabel = useMemo(
    () => (historyVisible ? '개정 소니스토어 이용약관 보기' : '이전 소니스토어 이용약관 보기'),
    [historyVisible],
  );

  return (
    <>
      <SEOHelmet title={'소니스토어 이용약관'} />
      <div className="contents">
        <div className="container">
          <div className="content">
            <div className="page">
              <h1 className="page__title">소니스토어 이용약관</h1>
              <p className="page__desc">
                소니스토어 사이트 관련 제반 서비스의 이용과 관련하여 필요한 사항을 규정합니다.
              </p>
            </div>
            <div className="terms">
              <div className="list_box">
                <p className="date">
                  <strong>
                    시행일자 :{' '}
                    {historyVisible
                      ? toLocalDateStr(prevTerms?.enforcementDate)
                      : toLocalDateStr(activeTerms?.enforcementDate)}
                  </strong>
                  <a href="#none" className="btn_go_ar" onClick={handleHistory}>
                    <span>{historyButtonLabel}</span>
                  </a>
                </p>
                <Articles articles={articles} />
              </div>
              <div className="foot_box">
                <div className="foot_cont">
                  <h4 className="Fh4_tit">서비스 사업자</h4>
                  <ul>
                    <li>
                      <strong>상호 : </strong>
                      <span>소니코리아 주식회사</span>
                    </li>
                    <li>
                      <strong>대표 : </strong>
                      <span>Okura Kikuo</span>
                    </li>
                    <li>
                      <strong>주소 : </strong>
                      <span>서울특별시 영등포구 여의도동 국제금융로 10 원아이에프씨 24F (우)150-876</span>
                    </li>
                    <li>
                      <strong>전화번호 : </strong>
                      <span>1588-0911</span>
                    </li>
                    <li>
                      <strong>URL : </strong>
                      <span>www.sony.co.kr</span>
                    </li>
                  </ul>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: historyVisible ? prevTerms?.contents : activeTerms?.contents }}
                ></div>
                {
                  <div className="caution_box">
                    <p>
                      ※ 본 약관에 대한 저작권은 소니 코리아에 귀속하며 무단 복제, 배포, 전송 기타 저작권 침해행위를
                      금지합니다.
                    </p>
                    {historyVisible ? (
                      <>
                        <p>※ 본 약관은 시행일자 : {toLocalDateStr(prevTerms?.enforcementDate)}부터 적용됩니다.</p>
                        <strong className="caution_box--date">
                          직전변경일 : {toLocalDateStr(prevEnforcementDate)}
                        </strong>
                      </>
                    ) : (
                      <>
                        <p>※ 본 약관은 시행일자 : {toLocalDateStr(activeTerms?.enforcementDate)}부터 적용됩니다.</p>
                        <strong className="caution_box--date">
                          직전변경일 : {toLocalDateStr(prevTerms?.enforcementDate)}
                        </strong>
                      </>
                    )}
                    <a href="#none" className="btn_go_ar" onClick={handleHistory}>
                      <span>{historyButtonLabel}</span>
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
