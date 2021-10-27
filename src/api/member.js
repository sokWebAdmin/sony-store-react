import request from "./request";

// profile
export const newAccount = (data)=> {
  return request("profile", "post", null, data);
};

export const checkDupId = (data)=> {
  return request("profile/id/exist", "get", data, null);
};

export const checkDupPhone = (data)=> {
  return request("profile/mobile/exist", "get", data, null);
};

export const checkDupEmail = (data)=> {
  return request("profile/email/exist", "get", data, null);
};

export const getToken = (data) => {
  return request("oauth/token", "post", null, data);
};

export const socialJoin = () => {
  return request("profile/openid", "post", null, null);
};

export const socialLogin = () => {
  return request("profile/openid", "get", null, null);
};

export const getOauthLoginUrl = (query) => {
  return request("oauth/login-url", 'get', query);
};

export const getProfile = () => {
  return request("profile", "get", null, null);
};

export const getDormancy = () => {
  return request("profile/dormancy", "get", null, null);
};

export const putDormancy = (data) => {
  return request("profile/dormancy", "put", null, data);
};

export const deleteProfile = (reason) => {
  return request('profile', 'delete', {reason})
}

export const postCheckPassword = (password) => {
  return request('profile/check-password', 'post', null, {password})
}
