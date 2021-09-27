import request from './request';

export const getCoupons = ({ query }) => request('promotion/coupons', 'get', query, {});
