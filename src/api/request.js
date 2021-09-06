import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { getAccessToken, getGuestToken } from '../utils/token';

const SERVER = process.env.REACT_APP_API_URL;
const version = '1.0';
const clientId = 'MzuMctQTZBXWmdTlujFy3Q==';
//SonyStore ALPHA
const platform = isMobile ? 'MOBILE_WEB' : 'PC';
const credentialLevelUrl = {
  guest: ['/guest'],
}
// API request 모듈
const request = async (url, method, query = {}, requestBody = null) => {
  const queryParams = typeof query === 'string' ? query : new URLSearchParams(query).toString();
  const queryString = !queryParams || !query ? '' : `?${queryParams}`;
  const requestUrl = SERVER + url + queryString;

  try {
    let headers = {platform, clientId, Version: version};
    const isFormData = requestBody instanceof FormData;
    const contentType = { 'Content-Type': 'application/json; charset=utf-8' };
    if (!isFormData) {
      headers = Object.assign(headers, contentType);
    }

    const accessToken = getAccessToken();
    const guestToken = getGuestToken();

    const credentialLevel =
      Object.entries(credentialLevelUrl).find((
        [_, value],
      ) => value.some(url => requestUrl.startsWith(url)))?.[0] ?? null;

    if (credentialLevel === 'guest') {
      if (guestToken) Object.assign(headers, { guestToken });
    } else {
      if (accessToken) Object.assign(headers, { accessToken });
      if (guestToken) Object.assign(headers, { guestToken });
    }

    return await axios({
      method,
      headers,
      url: requestUrl,
      data: requestBody,
      validateStatus: status => status
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default request;
