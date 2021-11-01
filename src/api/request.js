import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { getAccessToken, getGuestToken, removeAccessToken } from '../utils/token';

const SERVER = process.env.REACT_APP_SHOP_API_URL;
const version = process.env.REACT_APP_SHOP_API_VERSION;
const clientId = process.env.REACT_APP_SHOP_API_CLIENT_ID;
//SonyStore ALPHA
const platform = isMobile ? 'MOBILE_WEB' : 'PC';
const credentialLevelUrl = {
  guest: ['/guest'],
};
// API request 모듈
const request = async (url, method, query = {}, requestBody = null) => {
  const queryParams = typeof query === 'string' ? query : new URLSearchParams(query).toString();
  const queryString = !queryParams || !query ? '' : `?${queryParams}`;
  const requestUrl = SERVER + url + queryString;

  let headers = { platform, clientId, Version: version };
  const isFormData = requestBody instanceof FormData;
  const contentType = { 'Content-Type': 'application/json; charset=utf-8' };
  if (!isFormData) {
    headers = Object.assign(headers, contentType);
  }

  const accessToken = getAccessToken();
  const guestToken = getGuestToken();

  const credentialLevel =
    Object.entries(credentialLevelUrl).find(([_, value]) => value.some((url) => requestUrl.startsWith(url)))?.[0] ??
    null;

  if (credentialLevel === 'guest') {
    if (guestToken) Object.assign(headers, { guestToken });
  } else {
    if (accessToken) Object.assign(headers, { accessToken });
    if (guestToken) Object.assign(headers, { guestToken });
  }

  const exceptErrorUrls = ['authentications/sms', 'cart/count'];
  const goErrorCodes = ['AE001', 'PRDT0001'];

  return await axios({
    method,
    headers,
    url: requestUrl,
    data: requestBody,
    validateStatus: (status) => status,
  }).then((response) => {
    if (response.status === 401 && !exceptErrorUrls.includes(url)) {
      if (response?.data?.message) {
        window.location.pathname.includes('my-page')
          ? alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.')
          : alert(response?.data?.message);
      } else {
        alert('토큰이 만료되었습니다.');
      }
      removeAccessToken();
      window.location.replace('/member/login');
    }
    if (method === 'get') {
      if (response.status === 404 || goErrorCodes.includes(response.data.code)) {
        window.location.replace('/404');
      } else if (response.status === 500) {
        window.location.replace('/error-server');
      } else {
        return response;
      }
    } else {
      return response;
    }
  });
};

export default request;
