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
export const sendSMS = (mobileNo, usage, memberName) => {
  const requestBody = {
    mobileNo,
    usage
  }
  return request("authentications/sms", "post", null, memberName ? { ...requestBody, memberName } : requestBody);
};
export const verifySMS = (mobileNo, key, usage, memberName) => {
  const query = { mobileNo, key, usage };
  return request("authentications/sms", "get", memberName ? { ...query, memberName } : query, null);
};
export const getOauthOpenId = (query) => {
  return request('oauth/openid', 'get', query);
}
