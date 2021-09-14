import request from './request';

export const getOldOrders = ({ requsetBody }) => request('IF_ORD_0001.do', 'post', null, requsetBody);
