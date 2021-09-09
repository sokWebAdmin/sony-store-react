import request from './request';

export const getMemberInfo = (data) => {
  return request('IF_CUS_0001.do', 'post', null, data);
};

export const registerApi = (data) => {
  return request('IF_CUS_0002.do', 'post', null, data);
};

export const withdrawalMember = (data) => {
  return request('IF_CUS_0006.do', 'post', null, data);
};

export const modifyMy = bodyRequest => {
  return request('IF_CUS_0003.do', 'post', null, bodyRequest)
}