import request from './request';

export const getCoupons = ({ query }) => request('promotion/coupons', 'get', query, {});

export const getCouponsSummary = () => request('coupons/summary', 'get');