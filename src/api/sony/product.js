import request from './request';

export const getRegisteredProduct = ({ requsetBody }) => request('IF_CUS_0005.do', 'post', null, requsetBody);
