import React from 'react';
import { useMallState } from '../../context/mall.context';

const label = {
  naver: '네이버',
  facebook: '페이스북',
  kakao: '카카오톡'
}

const OpenLogin = () => {
  const {openIdJoinConfig} = useMallState();

  const openIdData = openIdJoinConfig?.providers.sort((a) => a === 'naver' ? -1 : 1).map(provider => ({ provider, label: label[provider] }))

  const openIdLogin = (type) => {
    const provider = `ncp_${type}`;

    console.log(provider);
  }

  return (
    <>
      {openIdJoinConfig && <div className="sns_login_box">
        <strong className="sns_title">SNS 계정으로 <span>간편하게 로그인하세요.</span></strong>
        <ul className="sns_list">
          {openIdData.map(({ provider, label }) => {
            return (
              <li className={provider}>
                <a href="javascript:void(0)" onClick={() => openIdLogin(provider)}>{label}</a>
              </li>
            )
          })}
        </ul>
      </div>}
    </>
  );
};

export default OpenLogin;
