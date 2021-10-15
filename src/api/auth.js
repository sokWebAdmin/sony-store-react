import request from "./request";

// profile > authentication
export const loginApi = (memberId, password) => {
  return request("oauth/token", "post", null, {
    memberId: memberId,
    password: password,
    provider: "shopbystore"
  });
};
export const joinApi = (memberId, password, name, phone, email) => {
  return request("profile", "post", null, {
    memberId: memberId,
    password: password,
    memberName: name,
    telephoneNo: phone,
    email: email,
  });
};
export const sendSMS = (number, type, memberName = null) => {
  return request("authentications/sms", "post", null, {
    mobileNo: number,
    usage: type,
    memberName,
  });
};
export const verifySMS = (number, code, type) => {
  return request("authentications/sms", "get", "mobileNo="+number+"&key="+code+"&usage="+type, null);
};
export const getOauthOpenId = (query) => {
  return request('oauth/openid', 'get', query);
}
