import request from './request';

export const getOldOrders = () =>
  request('IF_ORD_0001.do', 'post', {
    // FIXME: 임시데이터
    schStrtDt: '20210709',
    schEndDt: '20210731',
    orderType: 'B2C',
  });
