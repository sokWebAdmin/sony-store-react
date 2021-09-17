import React, { useContext, useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { getUrlParam } from '../../utils/location';
import { getItem, KEY, removeAccessToken, setAccessToken } from '../../utils/token';
import Alert from '../../components/common/Alert';
import { fetchProfile, resetProfile, useProfileState, useProileDispatch } from '../../context/profile.context';
import GlobalContext from '../../context/global.context';
import { getOauthOpenId } from '../../api/auth';

const Callback = () => {
  const {onChangeGlobal} = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();
  const {profile} = useProfileState();
  const { shopOauthCallback } = window.opener;
  // alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCloseFunc, setAlertCloseFun] = useState(null);

  const openAlert = (message, onClose) => {
    setAlertVisible(true);
    setAlertMessage(message);
    setAlertCloseFun(onClose);
  }
  const closeModal = () => {
    setAlertVisible(false);
    alertCloseFunc?.();
  }

  const processAuthCallback = async () => {
    const redirectUri = encodeURI(`${window.location.origin}/callback`);
    const code = getUrlParam('code');
    const redirectedToken = getItem(KEY.OPENID_TOKEN);
    const redirectedProvider = getItem(KEY.OPENID_PROVIDER);

    if (!code || !redirectedToken || !redirectedProvider) {
      openAlert('인증 정보가 만료되었습니다.')
      return;
    }

    const { openIdTokenResult } = await getOauthOpenId({
      code,
      redirectUri,
      provider: redirectedProvider,
      state: redirectedToken,
      platformType: isMobile ? 'MOBILE_WEB' : 'PC',
    });

    if (openIdTokenResult.accessToken) {
      setAccessToken(openIdTokenResult.accessToken, openIdTokenResult.expireIn);
      await fetchProfile(profileDispatch);
      shopOauthCallback?.(profile);
    } else {
      removeAccessToken();
      onChangeGlobal({isLogin: false})
      resetProfile(profileDispatch);
      shopOauthCallback?.();
    }
    window.close();
  }

  useEffect(() => {
    processAuthCallback();
  }, [])

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
    </>
  );
};

export default Callback;
