import React from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';
import { useHistory } from 'react-router-dom';

export default function WithdrawComplete() {
  const history = useHistory();

  return (
    <>
      <SEOHelmet title={'회원 탈퇴 신청 완료'} />
      <div className="contents mypage">
        <div className="container" id="container">
          <div className="accounts withdrawComplete">
            <h1 className="accounts_title">회원 탈퇴 신청 완료</h1>
            <p className="accounts_text">그동안 소니코리아 사이트를 이용해 주셔서 감사합니다.<br />항상 고객을 생각하는 소니코리아가 되도록 노력하겠습니다.</p>
            <div className="button_wrap">
              <button type="button" className="button button_positive" onClick={() => history.push('/')}>홈으로</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}