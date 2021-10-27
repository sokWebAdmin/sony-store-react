import request from './request';

export const getOldOrders = ({ requsetBody }) => request('IF_ORD_0001.do',
  'post', null, requsetBody);

export const postInvoice = requestBody => request('IF_ORD_0004.do', 'post',
  null, requestBody);

export const getInvoice = basketid => request(
  'IF_ORD_0003.do', 'get', { basketid });