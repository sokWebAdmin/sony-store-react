import request from './request';

export const getCoupons = ({ query }) => request('coupons', 'get', query, {});
