import request from './request';

export const syncCoupon = () => {
  return request('IF_CUS_0007.do', 'post', null, null);
};
