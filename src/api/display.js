import request from "./request";

export const getDisplayEvents = (keyword = '', accessToken = '') => {
  const query = keyword.length > 0 ? `keyword=${keyword}` : null;
  return request("display/events", "get", {accessToken}, query, {});
};
/*
* params: {order, soldout, saleStatus}
* */
export const getDisplayEventsEventNo = (eventNo, params, accessToken = '') => {
  const query = new URLSearchParams(params);
  return request(`display/events/${eventNo}`, "get", {accessToken}, query.toString(), {});
};

