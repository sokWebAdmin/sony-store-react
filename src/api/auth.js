import request from "./request";

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
