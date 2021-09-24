import request from './request';

export const postPurchaseConsulting = (data) => {
  return request('IF_SUP_0001.do', 'post', null, data);
};
