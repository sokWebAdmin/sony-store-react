import React from 'react';
import { useMallState } from '../../context/mall.context';
import { KEY, removeAccessToken, setItem } from '../../utils/token';
import { generateRandomString } from '../../utils/utils';
import { getOauthLoginUrl } from '../../api/member';

const label = {
  naver: '네이버',
  facebook: '페이스북',
  kakao: '카카오톡'
}

const OpenLogin = () => {
  let popup = null;
  const {openIdJoinConfig} = useMallState();

  const openIdData = openIdJoinConfig?.providers.sort((a) => a === 'naver' ? -1 : 1).map(provider => ({ provider, label: label[provider] }))

  const openIdLogin = async (type) => {
    const provider = `ncp_${type}`;

    console.log(provider);
    if (popup && !popup.closed) {
      popup.close();
      popup = null;
    }
    popup = window.open('about:blank', '간편 로그인', 'width=420px,height=550px,scrollbars=yes');
    popup.focus();
    const data = await fetchOauthLogin(provider);
    openLoginPopup(data, provider);
  }

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
  }

  const openLoginPopup = (result, provider, customCallback) => {
    window.shopOauthCallback = customCallback || _openIdAuthCallback;
    popup.location.href = result.loginUrl;
  }

  const _openIdAuthCallback = (profileResult = null) => {
    window.shopOauthCallback = null;
    console.log(profileResult);

    if (!profileResult) {
      removeAccessToken();
      // shopby.alert({ message: '간편 인증에 실패하였습니다.' });
      return;
    }
    if (profileResult.memberStatus === 'WAITING') {
      // shopby.popup('join-open-id', { profile: profileResult }, this._joinOpenId);
    } else {
      // shopby.alert('로그인이 완료 되었습니다.', shopby.helper.login.goNextUrl);
    }
  }

  return (
    <>
      {openIdJoinConfig && <div className="sns_login_box">
        <strong className="sns_title">SNS 계정으로 <span>간편하게 로그인하세요.</span></strong>
        <ul className="sns_list">
          {openIdData.map(({ provider, label }) => {
            return (
              <li className={provider} key={provider}>
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
