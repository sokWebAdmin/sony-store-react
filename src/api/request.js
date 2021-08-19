import axios from "axios";

export const SERVER = process.env.REACT_APP_API_URL + "/api/v2";
// export const SERVER = process.env.REACT_APP_API_URL_DEV + "/api/v2";

// API request 모듈
const request = async (url, method, headers = {}, formData) => {
  const Address = SERVER + "/" + url;
  try {
    // if (method === 'get') {
    // const {data} = await axios[method](Address, {
    //   headers: {
    //     ...headers,
    //     // Host: '180.231.113.156',
    //   },
    // });
    // return data;
    // } else if (method === 'post') {
    const { data } = await axios({
      method: method,
      url: Address,
      headers: {
        ...headers,
      },
      data: formData,
    });
    // const { data } = await axios[method](Address, formData, {
    //   headers: {
    //     ...headers,
    //   },
    // });
    return data;
    // }
  } catch (error) {
    console.log("request function error", error, url);
    await Promise.reject(error);
  }
};
// 사용법
// request('/State/serverState', 'get');
export default request;