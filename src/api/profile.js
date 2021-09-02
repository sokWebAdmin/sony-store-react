import request from "./request";

export const newAccount = (data)=> {
  return request("profile", "post", null, null, data);
};

export const checkDupId = (data)=> {
  return request("profile/id/exist", "get", null, data, null);
};

export const checkDupPhone = (data)=> {
  return request("profile/mobile/exist", "get", null, data, null);
};

export const checkDupEmail = (data)=> {
  return request("profile/email/exist", "get", null, data, null);
};

export const getToken = (data) => {
  return request("oauth/token", "post", null, null, data);
};

export const socialJoin = (token) => {
  return request("profile/openid", "post", {accessToken: token}, null, null);
};

export const socialLogin = (token) => {
  return request("profile/openid", "get", {accessToken: token}, null, null);
};

export const openIdAuth = (token, type) => {
  return request("oauth/openid", "get", {}, "provider="+type+"&openAccessToken="+token, null);
};

export const getProfile = (token) => {
  return request("profile", "get", {accessToken: token}, null, null);
};

