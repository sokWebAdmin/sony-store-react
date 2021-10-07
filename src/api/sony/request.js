import axios from 'axios';
import { getAccessToken } from '../../utils/token';
import { getAgent } from '../../utils/detectAgent';

const SERVER = process.env.REACT_APP_SONY_API_URL;
const Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb255IGFwaSB0b2tlbiIsImlzcyI6InN0b3JlLnNvbnkuY28ua3IiLCJpYXQiOjE2MjYwNTMxODAsIm5iZiI6MTYyNjA1MzEyMCwiZXhwIjozMzE2MjA1MzE4MH0.jCyxY2T4QqeDiIAIqqUcB835LpcFPnEyPU9lUhA_28c';

// API request 모듈
const request = async (url, method, query = {}, requestBody = null) => {
  const queryParams = new URLSearchParams(query).toString();
  const queryString = !queryParams || !query ? '' : `?${queryParams}`;
  const requestUrl = SERVER + url + queryString;

  let headers = { Authorization, 'Content-Type': 'application/json; charset=utf-8' };
  const accessToken = getAccessToken();
  const agent = getAgent();

  if (accessToken) Object.assign(headers, { accessToken });
  if (agent.isApp) {
    Object.assign(headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  return await axios({
    method,
    headers,
    url: requestUrl,
    data: requestBody,
    validateStatus: status => status,
  }).then((response) => {
    if (response.errorCode === '9995' || response.errorCode === '9997' || response.errorCode === '9998' || response.errorCode === '9999') {
      window.location.replace('/error-server');
    } else {
      return response;
    }
  });
};

export default request;