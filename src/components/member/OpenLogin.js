import React, { useContext, useState } from 'react';
import { useMallState } from '../../context/mall.context';
import { KEY, removeAccessToken, setItem } from '../../utils/token';
import { generateRandomString } from '../../utils/utils';
import { getOauthLoginUrl } from '../../api/member';
import Alert from '../common/Alert';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../context/global.context';
import { resetProfile, useProileDispatch } from '../../context/profile.context';

const label = {
  naver: '네이버',
  facebook: '페이스북',
  kakao: '카카오톡',
};

const OpenLogin = ({ title, message, customCallback }) => {
  let popup = null;
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
    const provider = `ncp_${type}`;
    const data = await fetchOauthLogin(provider);
    popup = window.open(data.loginUrl, '간편 로그인', 'width=420px,height=550px,scrollbars=yes');
    popup.focus();
    openLoginPopup(data, provider);
  };

  const fetchOauthLogin = async (provider) => {
    const oauthToken = generateRandomString();
    const redirectUri = encodeURI(`${window.location.origin}/callback`);

    setItem(KEY.OPENID_PROVIDER, provider, 30 * 60 * 1000);
    setItem(KEY.OPENID_TOKEN, oauthToken, 30 * 60 * 1000);

    const { data } = await getOauthLoginUrl({
      provider,
      redirectUri,
      state: oauthToken,
    });
    return data;
  };

  const openLoginPopup = () => {
    window.shopOauthCallback = customCallback || _openIdAuthCallback;
  };

  const _openIdAuthCallback = (profileResult = null) => {
    window.shopOauthCallback = null;

    if (!profileResult) {
      removeAccessToken();
      onChangeGlobal({ isLogin: false });
      resetProfile(profileDispatch);
      openAlert('간편 인증에 실패하였습니다.');
      return;
    }
    
    if (profileResult.memberStatus === 'WAITING') {
      history.push('/member/join-agree');
    } else {
      openAlert('로그인이 완료 되었습니다.', () => history.push('/'));
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
