import React, { useContext, useState } from 'react';
import { useMallState } from '../../context/mall.context';
import { getItem, KEY, setAccessToken, setItem } from '../../utils/token';
import { generateRandomString } from '../../utils/utils';
import { getProfile } from '../../api/member';
import Alert from '../common/Alert';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../context/global.context';
import { fetchMyProfile, setProfile, useProileDispatch } from '../../context/profile.context';
import { loginApi } from '../../api/auth';

const label = {
  naver: '네이버',
  facebook: '페이스북',
  kakao: '카카오톡',
};
const CLIENT_ID = {
  naver: process.env.REACT_APP_NAVER_JAVASCRIPT_KEY,
  facebook: process.env.REACT_APP_FACEBOOK_JAVASCRIPT_KEY,
  kakao: process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY,
};
const OPEN_URL = {
  naver: process.env.REACT_APP_NAVER_OPEN_URL,
  facebook: process.env.REACT_APP_FACEBOOK_OPEN_URL,
  kakao: process.env.REACT_APP_KAKAO_OPEN_URL,
};

const OpenLogin = ({ type, title, message, customCallback }) => {
  const history = useHistory();
  const { openIdJoinConfig } = useMallState();
  const { onChangeGlobal } = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();

  const openIdData = openIdJoinConfig?.providers.sort((a) => a === 'naver' ? -1 : 1).map(provider => ({
    provider,
    label: label[provider],
  }));

  // alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCloseFunc, setAlertCloseFun] = useState(null);

  const openAlert = (message, onClose) => {
    setAlertVisible(true);
    setAlertMessage(message);
    setAlertCloseFun(onClose);
  };
  const closeModal = () => {
    setAlertVisible(false);
    alertCloseFunc?.();
  };

  const openIdLogin = async (type) => {
    const provider = type.substring(0, 1).toUpperCase();
    const clientId = CLIENT_ID[type];
    const state = generateRandomString();
    const redirectUri = encodeURI(`${window.location.origin}/callback`);

    setItem(KEY.OPENID_PROVIDER, provider, 30 * 60 * 1000);
    setItem(KEY.OPENID_TOKEN, state, 30 * 60 * 1000);

    const loginUrl = OPEN_URL[type].replace('{clientId}', clientId).replace('{redirectUri}', redirectUri).replace('{state}', state);
    window.openWindow(loginUrl, '간편 로그인', 'width=420px,height=550px,scrollbars=yes');
    openLoginPopup();
  };

  const openLoginPopup = () => {
    window.shopOauthCallback = customCallback || _openIdAuthCallback;
  };

  const _openIdAuthCallback = async (errorCode, profileResult = null) => {
    window.shopOauthCallback = null;

    console.log(profileResult);
    if (errorCode === '0000') { // 계정 있음
      if (type === 'join') {
        const redirectedProvider = getItem(KEY.OPENID_PROVIDER);
        const response = await loginApi(profileResult.customerid, CLIENT_ID[redirectedProvider]);

        if (response.status !== 200) {
          openAlert('간편 인증에 실패하였습니다.');
          return;
        }

        const { accessToken, expireIn } = response.data;
        setAccessToken(accessToken, expireIn);
        onChangeGlobal({ isLogin: true });
        const profile = await getProfile();
        const data = { type: '30', customerid: profile.data.memberId };
        setProfile(profileDispatch, profile.data);
        await fetchMyProfile(profileDispatch, data);

        openAlert('로그인이 완료 되었습니다.', () => history.push('/'));
      } else {
        openAlert('이미 가입된 계정이 있습니다.');
      }
    } else if (errorCode === '3012') { // 계정 없음
      if (type === 'join') {
        history.push({
          pathname: '/member/join-agree',
          search: '?sns=true',
          state: {
            email: profileResult.customerid,
          }
        });
      } else {
        openAlert('해당 SNS 계정으로 가입되어 있지 않습니다.', () => {
          history.push({
            pathname: '/member/join-agree',
            search: '?sns=true',
            state: {
              email: profileResult.customerid,
            }
          });
        });
      }
    } else if (errorCode === '3001' || errorCode === '3002') {
      const redirectedProvider = getItem(KEY.OPENID_PROVIDER);
      const response = await loginApi(profileResult.customerid, CLIENT_ID[redirectedProvider]);

      if (response.status !== 200) {
        openAlert('간편 인증에 실패하였습니다.');
        return;
      }
      const { accessToken, expireIn } = response.data;
      setAccessToken(accessToken, expireIn);
      history.push('/member/inactiveAccounts');
    } else {
      openAlert('간편 인증에 실패하였습니다.');
    }
  };

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {openIdJoinConfig && <div className="sns_login_box">
        {title ? (<div className="txt_lft">
          <strong className="sns_title">{message}</strong>
          <p>{title}</p>
        </div>) : (<>
          <strong className="sns_title" dangerouslySetInnerHTML={{ __html: message }} />
        </>)}
        <ul className="sns_list">
          {openIdData.map(({ provider, label }) => {
            return (
              <li className={provider} key={provider}>
                <a href="javascript:void(0)" onClick={() => openIdLogin(provider)}>{label}</a>
              </li>
            );
          })}
        </ul>
      </div>}
    </>
  );
};

OpenLogin.defaultProps = {
  title: '',
  message: 'SNS 계정으로 <span>간편하게 로그인하세요.</span>',
  customCallback: null,
};

export default OpenLogin;
