import request from './request';

export const getOrderSheets = (orderSheetNo) => request(`order-sheets/${orderSheetNo}`, 'get');

export const postOrderSheets = (requestBody) => request('order-sheets', 'post', null, requestBody);

export const getProfileOrders = ({ params }) => request('profile/orders', 'get', params);

export const getProfileOrdersSummaryStatus = () => request('profile/orders/summary/status', 'get', null);

export const getProfileOrderByOrderNo = ({ path: { orderNo } }) => request(`profile/orders/${orderNo}`, 'get');

export const getGuestOrderByOrderNo = ({ path: { orderNo } }) => request(`guest/orders/${orderNo}`, 'get');

export const getOrderSheetCoupon = (query) => request(`order-sheets/${query.orderSheetNo}/coupons`, 'get');

export const postOrderSheetCalculate = ({ pathVariable, requestBody }) =>
  request(`order-sheets/${pathVariable.orderSheetNo}/calculate`, 'post', null, requestBody);

export const postProfileOrderCancelByOrderOptionNo = ({ path: { orderOptionNo }, requestBody }) =>
  request(`profile/order-options/${orderOptionNo}/claim/cancel`, 'post', null, requestBody);

export const postGuestOrdersOrderNo = (orderNo, requestBody) => {
  return request(`guest/orders/${orderNo}`, 'post', null, requestBody);
};

export const getShippingsEncryptedShippingNoLaterInput = (encryptedShippingNo) =>
  request(`shippings/${encryptedShippingNo}/later-input`, 'get');

export const putShippingsEncryptedShippingNoLaterInput = (encryptedShippingNo, requestBody) =>
  request(`shippings/${encryptedShippingNo}/later-input`, 'put', null, requestBody);

export const getCart = () => request(`cart?divideInvalidProducts=true`, 'get');

export const postCart = requestBody => request('cart', 'post', null,
  requestBody);

export const putCart = requestBody => request('cart', 'put', null, requestBody);

export const postGuestCart = requestBody => request('guest/cart', 'post', null,
  requestBody);

export const deleteCart = query => request('cart', 'delete', query);

export const getCartCount = () => request('cart/count', 'get');

export const getWish = query => request('profile/like-products', 'get', query);

export const getOrderConfigs = () => request('order-configs', 'get', null, null)