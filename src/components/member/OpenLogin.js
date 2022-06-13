import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useMallState } from 'context/mall.context';
import GlobalContext from 'context/global.context';
import { fetchMyProfile, setProfile, useProileDispatch } from 'context/profile.context';
import Alert from 'components/common/Alert'
import { getItem, KEY, removeItem, setAccessToken, setItem } from 'utils/token';
import { generateRandomString } from 'utils/utils';
import { getAgent } from 'utils/detectAgent';
import { getUrlParam } from 'utils/location';
import {  getOauthOpenId, loginApi } from 'api/auth';
import { getProfile } from 'api/member';

const label = {
  naver: '네이버',
  facebook: '페이스북',
  kakao: '카카오톡',
};
const CLIENT_ID = {
  naver: process.env.REACT_APP_NAVER_JAVASCRIPT_KEY,
  facebook: process.env.REACT_APP_FACEBOOK_JAVASCRIPT_KEY,
  kakao: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
};
const OPEN_URL = {
  naver: process.env.REACT_APP_NAVER_OPEN_URL,
  facebook: process.env.REACT_APP_FACEBOOK_OPEN_URL,
  kakao: process.env.REACT_APP_KAKAO_OPEN_URL,
};

const OpenLogin = ({ type, title, message, customCallback }) => {
  console.log("🚀 ~ file: OpenLogin.js ~ line 32 ~ OpenLogin ~ customCallback", customCallback)
  console.log("🚀 ~ file: OpenLogin.js ~ line 32 ~ OpenLogin ~ message", message)
  console.log("🚀 ~ file: OpenLogin.js ~ line 32 ~ OpenLogin ~ title", title)
  console.log("🚀 ~ file: OpenLogin.js ~ line 32 ~ OpenLogin ~ type", type)
  const history = useHistory();
  const { openIdJoinConfig } = useMallState();
  const { onChangeGlobal } = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();

  const openIdData = ['naver', 'kakao']
    .sort((a) => (a === 'naver' ? -1 : 1))
    .map((provider) => ({
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

  useEffect(() => {
    if (getAgent().isApp && getUrlParam('callback') === 'true') {
      const openIdProfile = getItem('openIdProfile');
      if (type === 'withdraw' || type === 'modify') {
        openIdProfile && customCallback(openIdProfile.errorCode, openIdProfile.body);
      } else {
        openIdProfile && _openIdAuthCallback(openIdProfile.errorCode, openIdProfile.body);
      }
    }
  }, [history.location.search, history.location]);

  const openIdLogin = async (type) => {
    const clientId = CLIENT_ID[type];
    const state = generateRandomString();
    const redirectUri = encodeURI(`${window.location.origin}/callback`);

    setItem(KEY.OPENID_PROVIDER, type, 30 * 60 * 1000);
    setItem(KEY.OPENID_TOKEN, state, 30 * 60 * 1000);

    openLoginPopup();
    const loginUrl = OPEN_URL[type]
      .replace('{clientId}', clientId)
      .replace('{redirectUri}', redirectUri)
      .replace('{state}', state);
    window.openWindow(loginUrl, '간편 로그인', 'width=420px,height=550px,scrollbars=yes', 'verification');
  };

  const openLoginPopup = () => {
    window.shopOauthCallback = customCallback || _openIdAuthCallback;
  };

  const _openIdAuthCallback = async (errorCode, profileResult = null) => {
    console.log("🚀 ~ file: OpenLogin.js ~ line 96 ~ const_openIdAuthCallback= ~ errorCode", errorCode)
    console.log("🚀 ~ file: OpenLogin.js ~ line 90 ~ const_openIdAuthCallback= ~ profileResult", profileResult)
    window.shopOauthCallback = null;
    removeItem('currentPath');
    removeItem('openIdProfile');

    if (errorCode === '0000') {
      // 계정 있음
      if (type === 'join') {
        openAlert('이미 가입된 계정이 있습니다.');
      } else {
        const redirectedProvider = getItem(KEY.OPENID_PROVIDER);
        // const response = await loginApi(profileResult.customerid, CLIENT_ID[redirectedProvider]);
        // // TODO: OpenId AccessToken 발급하기 파라미터 확인
        const response = await getOauthOpenId({
          provider: profileResult.redirectedProvider,
          code: profileResult.code,
          redirectUri: encodeURI(`${window.location.origin}/callback`),
          state: profileResult.state,
        });
        const code = response.data?.message ? JSON.parse(response.data.message).errorCode : '';

        if (response.status !== 200) {
          if (code === '3003') {
            history.push('/member/lockedAccounts');
            return;
          }
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

        openAlert('로그인이 완료 되었습니다.', () => () => {
          const agent = getAgent();
          if (agent.isApp) {
            window.location = `sonyapp://autoLoginYn?value=N&customerid=${profileResult.customerid}`;
          }
          history.push('/');
        });
      }
    } else if (errorCode === '3012') {
      // 계정 없음
      if (type === 'join') {
        history.push({
          pathname: '/member/join-agree',
          search: '?sns=true',
          state: {
            email: profileResult.customerid,
          },
        });
      } else {
        openAlert('해당 SNS 계정으로 가입되어 있지 않습니다.', () => () => {
          history.push({
            pathname: '/member/join-agree',
            search: '?sns=true',
            state: {
              email: profileResult.customerid,
            },
          });
        });
      }
    } else if (errorCode === '3001' || errorCode === '3002') {
      const redirectedProvider = getItem(KEY.OPENID_PROVIDER);

      // const response = await loginApi(profileResult.customerid, CLIENT_ID[redirectedProvider]);
      const response = await getOauthOpenId({
        provider: profileResult.redirectedProvider,
        code: profileResult.code,
        redirectUri: encodeURI(`${window.location.origin}/callback`),
        state: profileResult.state,
      });
      const code = response.data?.message ? JSON.parse(response.data.message).errorCode : '';

      if (response.status !== 200) {
        if (code === '3003') {
          history.push('/member/lockedAccounts');
          return;
        }
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
      {openIdJoinConfig && (
        <div className="sns_login_box">
          {title ? (
            <div className="txt_lft">
              <strong className="sns_title">{message}</strong>
              <p>{title}</p>
            </div>
          ) : (
            <>
              <strong className="sns_title" dangerouslySetInnerHTML={{ __html: message }} />
            </>
          )}
          <ul className="sns_list">
            {openIdData.map(({ provider, label }) => {
              return (
                <li className={provider} key={provider}>
                  <button onClick={() => openIdLogin(provider)}>
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

OpenLogin.defaultProps = {
  title: '',
  message: 'SNS 계정으로 <span>간편하게 로그인하세요.</span>',
  customCallback: null,
};

export default OpenLogin;
