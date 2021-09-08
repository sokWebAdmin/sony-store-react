import request from './request';

export const getOrderSheets = (orderSheetNo) =>
  request(`order-sheets/${orderSheetNo}`, 'get');

export const postOrderSheets = (requestBody) =>
  request('order-sheets', 'post', null, requestBody);

export const getProfileOrders = ({ params = null }) =>
  request('profile/orders', 'get', params);
