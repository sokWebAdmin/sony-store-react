import request from './request';

export const getOrderSheets = (orderSheetNo) =>
  request(`order-sheets/${orderSheetNo}`, 'get');

export const postOrderSheets = (requestBody) =>
  request('order-sheets', 'post', null, requestBody);

export const getProfileOrders = ({ params }) =>
  request('profile/orders', 'get', params);

export const getProfileOrdersSummaryStatus = () =>
  request('profile/orders/summary/status', 'get', null);

export const getProfileOrderByOrderNo = ({ path: { orderNo } }) => request(
  `profile/orders/${orderNo}`, 'get');

export const getOrderSheetCoupon = query =>
  request(`order-sheets/${query.orderSheetNo}/coupons`, 'get');

export const postOrderSheetCalculate = ({ pathVariable, requestBody }) =>
  request(`order-sheets/${pathVariable.orderSheetNo}/calculate`, 'post', null,
    requestBody);

export const postProfileOrderCancelByOrderOptionNo = ({ path: { orderOptionNo }, requestBody }) =>
  request(`​/profile​/order-options​/${orderOptionNo}​/claims​/cancel`, 'post',
    null, requestBody);

export const postGuestOrdersOrderNo = (orderNo, requestBody) => {
  return request(`guest/orders/${orderNo}`, null, requestBody);
}
