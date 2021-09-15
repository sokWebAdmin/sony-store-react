import request from './request';

export const getProfileClaimApplyInfoByOrderOptionNo = ({ path: { orderOptionNo }, params: { claimType } }) =>
  request(`profile/order-options/${orderOptionNo}/claim`, 'get', { claimType });
