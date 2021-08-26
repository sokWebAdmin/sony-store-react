import axios from "axios";
import {isMobile} from 'react-device-detect';


const SERVER = "/api/v1/";
const Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb255IGFwaSB0b2tlbiIsImlzcyI6InN0b3JlLnNvbnkuY28ua3IiLCJpYXQiOjE2MjYwNTMxODAsIm5iZiI6MTYyNjA1MzEyMCwiZXhwIjozMzE2MjA1MzE4MH0.jCyxY2T4QqeDiIAIqqUcB835LpcFPnEyPU9lUhA_28c";

const platform =  isMobile ? "Mobile Web Android" : "PC";
//Mobile Web Android, Mobile Web IOS, App Android, App IOS, PC

// API request 모듈
const request = async (url, method, headers = {}, query, requestBody) => {
  let Address = SERVER + url;
  if(query != null){
    Address += '?'+query;
  }
  try {
    var headerData = new Object()
    headerData.Authorization = Authorization;
    
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
    console.log(JSON.stringify(error))
    console.log("request function error", error, url);
    // api 오류일때
    return "error";
    await Promise.reject(error);
  }
};


export default request;