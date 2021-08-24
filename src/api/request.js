import axios from "axios";

const SERVER = "https://alpha-api.e-ncp.com/";
const version = "1.0";
const clientId = "D8vhQpkQR0DIYHxkbpbv7A==";
//키 변경 필수
const platform = "MOBILE_WEB";
// API request 모듈
const request = async (url, method, headers = {}, query, requestBody) => {
  let Address = SERVER + url;
  if(query != null){
    Address += '?'+query;
  }
  try {
    var headerData = new Object()
    headerData.platform = platform;
    headerData.clientId = clientId;
    headerData.Version = version;
    
    const contentType = {"Content-Type": "application/json; charset=utf-8"}
    headerData = Object.assign(headerData, contentType)
    
    if (headers != undefined && headers != null && (typeof headers == 'object')) {
        headerData = Object.assign(headerData, headers)
    }

    console.log(headerData);

    if (method === "get") {
        const data = await axios[method](Address,{
          headers: headerData,
          validateStatus: function (status) {
            if(status == 400 || status == 200 || status == 401){
              return true;
            }
          }
        });
        return data;
    } else {
      // post
        const data = await axios[method](Address, requestBody, {
          headers: headerData,
                    validateStatus: function (status) {
                      if(status == 400 || status == 200 || status == 401){
              return true;
            }
          }
        });
        return data;
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    console.log("request function error", error, url);
    // api 오류일때
    return "error";
    await Promise.reject(error);
  }
};


export default request;

// const request = async (url, method, headers = {}, params, requestBody) => {
//   const Address = SERVER + "/" + url;
//   try {
//     // 200 이나 이런거 감지하려면 중괄호 제거 const data = ....
//     if (method === "get") {
//       const data = await axios[method](Address, {
//         headers: {
//           ...headers,
//           "Content-Type": "application/json",
//           platform: platform,
//           Version: version,
//           clientId: clientId,
//         },
//       });
//       return data;
//     } else {
//       const data = await axios[method](Address, requestBody, {
//         headers: {
//           ...headers,
//           "Content-Type": "application/json",
//           platform: platform,
//           Version: version,
//           clientId: clientId,
//         },
//       });
//       return data;
//     }
//   } catch (error) {
//     console.log("request function error", error, url);
//     // api 오류일때
//     return "error";
//     await Promise.reject(error);
//   }
// };


// const { data } = await axios({
//   url: Address,
//   method: method,
//   data: requestBody,
//   params: params,
//   headers: {
//     ...headers,
//     "Content-Type": "application/json",
//     platform: platform,
//     Version: version,
//     clientId: clientId,
//   },
// });
// testApi.js 참조
