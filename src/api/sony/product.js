import request from './request';

export const getRegisteredProduct = ({ requsetBody }) => request('IF_ORD_0005.do', 'post', null, requsetBody);
