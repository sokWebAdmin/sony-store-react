import request from "./request";

export const sendSMS = (number, type) => {
  return request("authentications/sms", "post", null, null, {
      mobileNo: number,
      usage: type
  });
};


export const verifySMS = (number, code, type) => {
    return request("authentications/sms", "get", null, "mobileNo="+number+"&key="+code+"&usage="+type, null);
  };
  
