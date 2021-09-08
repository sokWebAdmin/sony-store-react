import request from "./request";

export const getMemberInfo = (query) => {
  return request("IF_CUS_0001.do", "post", query);
}

export const registerApi = (data) => {
  return request("IF_CUS_0002.do", "post", null, data);
};

export const modifyMy = bodyRequest => {
  return request('IF_CUS_0003.do', 'post', null, bodyRequest)
}