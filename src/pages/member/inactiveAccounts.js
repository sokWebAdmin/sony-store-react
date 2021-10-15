import React, { useEffect, useCallback, useState } from 'react';

//utils
import { useHistory } from 'react-router-dom';

//css
import '../../assets/scss/contents.scss';

import { getDormancy } from '../../api/member';

import { changeDateFormat, getDay } from '../../utils/dateFormat';
import Confirm from '../../components/common/Confirm';
import Authentication from '../../components/popup/Authentication';

export default function InactiveAccounts() {
  const history = useHistory();
  const CONFIRM_MESSAGE = '휴대폰 인증 서비스를 사용하여 휴면계정을 활성화 합니다. 계속하시겠습니까?';
  const [dormantDate, setDormantDate] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [authenticationVisible, setAuthenticationVisible] = useState(false);

  const getDormancyInfo = useCallback(async () => {
    try {
      const { data } = await getDormancy();
      const date = data.split(' ')[0];
      const day = getDay(date);
      const formattedDate = `${changeDateFormat(date, 'YYYY.MM.DD')}(${day})`;
      setDormantDate(formattedDate);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const closeConfirm = (state) => {
    if (state === 'ok') {
      setAuthenticationVisible(true);
    }
    setIsConfirm(false);
  };

  useEffect(() => {
    getDormancyInfo();
  }, [getDormancyInfo]);


  return (
    <>
      <div className="contents">
        <div className="container" id="container">
          <div className="accounts inactive">
            <h1 className="accounts_title">휴면계정 전환 안내</h1>
            <h2 className="accounts_desc">휴면계정을 활성화 하시면 소니스토어의 더 많은 혜택을 누리실 수 있습니다.</h2>
            <ul className="accounts_text">
              <li className="accounts_text_list">개인정보 보호를 위한 관련 법령 개정에 따라 1년 이상 서비스 이용 내역이 없는 회원님의 개인정보를 휴면계정으로 별도 저장 ∙
                관리하고 있습니다.
              </li>
              <li className="accounts_text_list">휴면계정 대상 회원님은 시행 일자인 <strong>{dormantDate} 이후부터</strong> 보유 쿠폰 및 기타 혜택이
                소멸되며, 소니스토어 (http://store.sony.co.kr) 사이트 이용이 불가능합니다.
              </li>
              <li className="accounts_text_list">휴면계정을 활성화하고자 하는 경우에는 하단의 휴면계정 활성화 하기 버튼을 이용하시기 바랍니다.</li>
            </ul>
            <div className="button_wrap">
              <button type="button" onClick={() => setIsConfirm(true)} className="alertLayerBtn button button_positive"
                      data-open-layer="alert_pop2">휴면계정 활성화
              </button>
            </div>
          </div>
        </div>
      </div>
      {isConfirm && <Confirm onClose={closeConfirm}>{CONFIRM_MESSAGE}</Confirm>}
      {authenticationVisible && <Authentication setVisible={setAuthenticationVisible} />}
    </>
  );
}