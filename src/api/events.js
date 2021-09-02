import request from './request';

export const getEventByEventNo = (eventNo) => {
  return request(`display/events/${eventNo}`, 'get', null, null, {});
};
