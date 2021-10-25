import React, { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { getUrlParam } from '../../utils/location';
import { getItem, KEY, removeAccessToken, setAccessToken } from '../../utils/token';
import Alert from '../../components/common/Alert';
import {
  fetchProfile,
  resetProfile,
  setProfile,
  useProfileState,
  useProileDispatch,
} from '../../context/profile.context';
import GlobalContext from '../../context/global.context';
import { getOauthOpenId } from '../../api/auth';
import { getProfile } from '../../api/member';
import { getMemberInfo, getOpenIdProfile } from '../../api/sony/member';

const Callback = () => {
  const { onChangeGlobal } = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();
  const { profile } = useProfileState();
  const { shopOauthCallback } = window.opener;
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

  const processAuthCallback = async () => {
    const code = getUrlParam('code');
    const state = getItem(KEY.OPENID_TOKEN);
    const redirectedProvider = getItem(KEY.OPENID_PROVIDER);

    if (!code || !state || !redirectedProvider) {
      openAlert('인증 정보가 만료되었습니다.');
      return;
    }

    const { data: openIdProfile } = await getOpenIdProfile({
      code,
      state,
      servicesite: { snsinfo: redirectedProvider.substring(0, 1).toUpperCase() },
    });
    console.log(openIdProfile);

    const accessCode = ['0000', '3000', '3001', '3002'];
    if (accessCode.includes(openIdProfile.errorCode)) {
      shopOauthCallback?.(openIdProfile.errorCode, openIdProfile.body);
      window.close();
    } else {
      openAlert(openIdProfile.errorMessage, window.close);
    }
  };

  useEffect(() => {
    processAuthCallback();
  }, []);

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
    </>
  );
};

export default Callback;
