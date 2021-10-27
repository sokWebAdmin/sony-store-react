import React from 'react';

//utils
import { useHistory } from "react-router-dom";

//css
import '../../assets/scss/contents.scss';

export default function LockedAccounts() {
  const history = useHistory();

  return (
      <div className="contents">
        <div className="container" id="container">
          <div className="accounts locked">
            <h1 className="accounts_title">계정 정보 잠금 안내</h1>
            <h2 className="accounts_desc">회원님의 계정 정보가 잠금 처리 되었습니다.</h2>
            <p className="accounts_text">회원님의 잠긴 회원 계정 정보는 비밀번호 재발급을 통해 해제하실 수 있습니다.<br className="only-pc" />비밀번호 재발급
              페이지로 이동하셔서 계정 정보를 해제 하시겠습니까?</p>
            <div className="button_wrap">
              <button type="button" className="button button_positive" onClick={() => history.push('/member/search?type=password')}>확인</button>
            </div>
          </div>
        </div>
      </div>
  );
}