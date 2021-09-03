import axios from "axios";
import {isMobile} from 'react-device-detect';


const SERVER = "https://alpha-api.e-ncp.com/";
const version = "1.0";
const clientId = "MzuMctQTZBXWmdTlujFy3Q==";
//SonyStore ALPHA
const platform =  isMobile ? "MOBILE_WEB" : "PC";
// API request 모듈
const request = async (url, method, headers = {}, query, requestBody) => {
  let Address = SERVER + url;
  if(query != null){
    Address += '?'+query;
  }
  try {
    let headerData = new Object()
    headerData.platform = platform;
    headerData.clientId = clientId;
    headerData.Version = version;
    
    const contentType = {"Content-Type": "application/json; charset=utf-8"}
    headerData = Object.assign(headerData, contentType)
    
    if (headers != undefined && headers != null && (typeof headers == 'object')) {
        headerData = Object.assign(headerData, headers)
    }

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
    console.error(error)
    // api 오류일때
    await Promise.reject(error);
    return "error";
  }
};

export default request;
