import request from './request';

export const getOrderSheets = (orderSheetNo) =>
  request(`order-sheets/${orderSheetNo}`, 'get');

export const postOrderSheets = (requestBody) =>
  request('order-sheets', 'post', null, requestBody);

export const getProfileOrders = ({ params }) =>
  request('profile/orders', 'get', params);

export const getProfileOrdersSummaryStatus = () =>
  request('profile/orders/summary/status', 'get', null);

export const getOrderSheetCoupon = query =>
  request(`order-sheets/${query.orderSheetNo}`, 'get');