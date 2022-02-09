import request from './request';

export const getMileageHistories = (query) =>
    request('IF_CUS_0004.do', 'post', null, query);
