import { React, useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import { getTerms, getTermsByTermNo, getTermsHistory } from '../../api/manage';
import { getStrDate, isSameOrAfter, toLocalDateStr } from '../../utils/dateFormat';
import { articles } from '../../const/support';

const initialTerm = {
  used: false,
  contents: '',
  enforcementDate: '',
}

export default function Terms() {
  const [activeTerms, setActiveTerms] = useState({ ...initialTerm });
  const [prevTerms, setPrevTerms] = useState({ ...initialTerm });

  const [ historyVisible, setHistoryVisible ] = useState(false);

  const fetchTerms = async () => {
    try {
      const { data } = await getTerms('USE');
      setActiveTerms(data.key);
    } catch(e) {
      console.error(e);
    }
  };

  const fetchTermsByTermsNo = async (termsNo, setTerms) => {
    try {
      const { data } = await getTermsByTermNo({ termsNo });
      setTerms(data);
    } catch(e) {
      console.error(e);
    }
  }

  const setTermsNo = histories => {
    const filtered = histories.filter(({ enforcementDate }) => isSameOrAfter('', getStrDate(enforcementDate)));
    if (filtered.length > 0) {
      fetchTermsByTermsNo(filtered[0].termsNo, setActiveTerms);
    }
    if (filtered.length > 1) {
      fetchTermsByTermsNo(filtered[1].termsNo, setPrevTerms);
    }
  };

  const fetchTermsHistory = async () => {
    try {
      const { data } = await getTermsHistory({ termsType: 'USE' });
      data?.length > 0 && setTermsNo(data);
    } catch(e) {
      console.error(e);
    }
  };

  const handleHistory = e => {
    e.preventDefault();
    setHistoryVisible(prev => !prev);
  }
  
  useEffect(() => {
    fetchTerms();
    fetchTermsHistory();
  }, []);

  const middle = Math.ceil(articles?.length / 2);
  return (
    <>
      <SEOHelmet title={"소니스토어 이용약관"} />
      <div className="contents">
        <div className="container">
          <div className="content">
            <div className="page">
              <h1 className="page__title">소니스토어 이용약관</h1>
              <p className="page__desc">소니스토어 사이트 관련 제반 서비스의 이용과 관련하여 필요한 사항을 규정합니다.</p>
            </div>
            <div className="terms">
              <div className="list_box">
                <p className="date">
                  <strong>시행일자 : { historyVisible ? toLocalDateStr(prevTerms?.enforcementDate) : toLocalDateStr(activeTerms?.enforcementDate) }</strong>
                  <a 
                    href="#none" 
                    className="btn_go_ar" 
                    onClick={ handleHistory }
                  >
                    <span>{ historyVisible ? '개정 소니스토어 이용약관 보기' : '이전 소니스토어 이용약관 보기' }</span>
                  </a>
                </p>
                <div className="list_cont">
                  <ul>
                    {
                      articles.slice(0, middle).map((title, index) => {
                        const articleNo = index + 1;
                        return (
                          <li key={articleNo + title}>
                            <a href={ `#article${ articleNo < 10 ? `0${articleNo}` : articleNo }` }>{ `제${articleNo}조 ${title}` }</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                  <ul>
                    {
                      articles.slice(middle, articles.length).map((title, index) => {
                        const articleNo = index + middle + 1;
                        return (
                          <li key={articleNo + title}>
                            <a href={ `#article${ articleNo < 10 ? `0${articleNo}` : articleNo }` }>{ `제${articleNo}조 ${title}` }</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="foot_box">
                <div dangerouslySetInnerHTML={{__html: historyVisible ? prevTerms?.contents : activeTerms?.contents}}></div>
                {
                  <div className="caution_box">
                    <p>※ 본 약관에 대한 저작권은 소니 코리아에 귀속하며 무단 복제, 배포, 전송 기타 저작권 침해행위를 금지합니다.</p>
                    {
                      historyVisible ? 
                      <>
                        <p>※ 본 약관은 시행일자 : { toLocalDateStr(prevTerms?.enforcementDate) }부터 적용됩니다.</p>
                        <a href="#none" className="btn_go_ar" onClick={ handleHistory }><span>개정 소니스토어 이용약관 보기</span></a>
                      </>
                      :
                      <>
                        <p>※ 본 약관은 시행일자 : { toLocalDateStr(activeTerms?.enforcementDate) }부터 적용됩니다.</p>
                        <strong className="caution_box--date">직전변경일 : { toLocalDateStr(prevTerms?.enforcementDate) }</strong>
                        <a href="#none" className="btn_go_ar" onClick={ handleHistory }><span>이전 소니스토어 이용약관 보기</span></a>
                      </>
                    }
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