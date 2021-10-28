import React, { useEffect, useState } from 'react';
import { getUrlParam } from '../../utils/location';
import { getItem, KEY } from '../../utils/token';
import Alert from '../../components/common/Alert';
import { getOpenIdProfile } from '../../api/sony/member';
import { getAgent } from '../../utils/detectAgent';

const Callback = () => {
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
    const agent = getAgent();
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
    const accessCode = ['0000', '3000', '3001', '3002', '3012'];
    if (accessCode.includes(openIdProfile.errorCode)) {
      shopOauthCallback?.(openIdProfile.errorCode, openIdProfile.body);
      if (!agent.isApp) {
        window.close();
      } else {
        window.openWindow(`javascript:window.opener.shopOauthCallback(${openIdProfile.errorCode}, ${openIdProfile.body})`, '', '', 'verification_close|');
      }
    } else {
      openAlert(openIdProfile.errorMessage, () => () => {
        if (!agent.isApp) {
          window.close();
        } else {
          window.openWindow(`javascript:void(0)`, '', '', 'verification_close|');
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
