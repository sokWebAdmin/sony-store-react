import React, { useEffect, useState } from 'react';
import { getUrlParam } from '../../utils/location';
import { getItem, KEY, setAccessToken, setItem } from '../../utils/token';
import Alert from '../../components/common/Alert';
import { getOpenIdProfile } from '../../api/sony/member';
import { getAgent } from '../../utils/detectAgent';
import { loginApi } from '../../api/auth';
import { getProfile } from '../../api/member';
import { fetchMyProfile, setProfile } from '../../context/profile.context';

const Callback = () => {
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
    const shopOauthCallback = window?.opener?.shopOauthCallback;
    const agent = getAgent();
    const code = getUrlParam('code');
    const state = getItem(KEY.OPENID_TOKEN);
    const redirectedProvider = getItem(KEY.OPENID_PROVIDER);
    // eslint-disable-next-line no-eval
    const callback = eval(`(${getItem(KEY.APP_OAUTH_CALLBACK)})`);

    if (!code || !state || !redirectedProvider) {
      openAlert('인증 정보가 만료되었습니다.');
      return;
    }

    const { data: openIdProfile } = await getOpenIdProfile({
      code,
      state,
      servicesite: { snsinfo: redirectedProvider.substring(0, 1).toUpperCase() },
    });
    alert('test alert' + openIdProfile?.errorCode);
    setItem('openIdProfileTestValue', openIdProfile);
    const accessCode = ['0000', '3000', '3001', '3002', '3012'];
    if (accessCode.includes(openIdProfile.errorCode)) {
      if (!agent.isApp) {
        shopOauthCallback?.(openIdProfile.errorCode, openIdProfile.body);
        window.close();
      } else {
        alert('callback 있다!' + shopOauthCallback);
        window.openWindow(`javascript:${callback(openIdProfile.errorCode, openIdProfile.body)}`, '', '', 'verification_close');
        // window.openWindow(`javascript:window.opener.shopOauthCallback(${openIdProfile.errorCode}, ${openIdProfile.body})`, '', '', 'verification_close');
      }
    } else {
      openAlert(openIdProfile.errorMessage, () => () => {
        if (!agent.isApp) {
          window.close();
        } else {
          window.openWindow(`javascript:void(0)`, '', '', 'verification_close');
        }
      });
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
