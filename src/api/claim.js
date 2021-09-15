import request from './request';

export const getProfileClaimApplyInfoByorderOptionNo = ({ path: { orderOptionNo }, params: { claimType } }) =>
  request(`​/profile​/order-options​/${orderOptionNo}​/claims`, 'get', params);
