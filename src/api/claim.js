import request from './request';

export const putProfileClaimRefundAccountByClaimNo = ({
  path: { claimNo },
  requestBody: { bank, account, depositorName },
}) => request(`profile/claims/${claimNo}/account`, 'put', null, { bank, account, depositorName });

export const putGuestClaimRefundAccountByClaimNo = ({
  path: { claimNo },
  requestBody: { bank, account, depositorName },
}) => request(`guest/claims/${claimNo}/account`, 'put', null, { bank, account, depositorName });

export const postProfileClaimOrderCancelByOrderNo = ({ path: { orderNo }, requestBody }) =>
  request(`profile/orders/${orderNo}/claims/cancel`, 'post', null, requestBody);

export const postGuestClaimOrderCancelByOrderNo = ({ path: { orderNo }, requestBody }) =>
  request(`guest/orders/${orderNo}/claims/cancel`, 'post', null, requestBody);

export const postProfileCancelByOrderOptions = ({ requestBody }) =>
  request(`profile/claims/cancel`, 'post', null, requestBody);

export const postGuestCancelByOrderOptions = ({ requestBody }) =>
  request(`guest/claims/cancel`, 'post', null, requestBody);
