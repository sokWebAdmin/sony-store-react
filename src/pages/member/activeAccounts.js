import React from 'react';

//utils
import { useHistory } from "react-router-dom";

//css
import '../../assets/scss/contents.scss';

export default function ActiveAccounts() {
  const history = useHistory();

  return (
      <div className="contents">
        <div className="container" id="container">
          <div className="accounts active">
            <h1 className="accounts_title">휴먼계정 해제 안내</h1>
            <h2 className="accounts_desc">휴먼계정 해제 요청이 정상적으로 처리 되었습니다.</h2>
            <p className="accounts_text">고객님의 휴면계정이 활성화 되었습니다.<br />소니스토어와 함께 다양한 혜택을 누리세요.</p>
            <div className="button_wrap">
              <button type="button" className="button button_positive" onClick={() => history.push('/')}>확인</button>
            </div>
          </div>
        </div>
      </div>
  );
}