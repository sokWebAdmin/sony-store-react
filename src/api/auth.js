import request from "./request";

// profile > authentication
export const loginApi = (memberId, password) => {
  return request("oauth/token", "post", null, null, {
    memberId: memberId,
    password: password,
    provider : "shopbystore",
    keepLogin: true
  });
};
export const joinApi = (memberId, password, name, phone, email) => {
  return request("profile", "post", null, null, {
    memberId: memberId,
    password: password,
    memberName: name,
    telephoneNo: phone,
    email: email,
  });
};
export const sendSMS = (number, type) => {
  return request("authentications/sms", "post", null, null, {
    mobileNo: number,
    usage: type
  });
};
export const verifySMS = (number, code, type) => {
  return request("authentications/sms", "get", null, "mobileNo="+number+"&key="+code+"&usage="+type, null);
};