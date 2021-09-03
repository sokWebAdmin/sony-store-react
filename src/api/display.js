import request from "./request";

// category
export const getCategoryList = (categoryNo, orderBy)=> {
  return request("categories", "get", null, null, {});
};

// banner
export const loadBanner = (bannerCode)=> {
  return request("display/banners/"+bannerCode, "get", null, null, {});
};

// event
export const getDisplayEvents = (keyword = '', accessToken = '') => {
  const query = keyword.length > 0 ? `keyword=${keyword}` : null;
  return request("display/events", "get", {accessToken}, query, {});
};
/*
* params: {order, soldout, saleStatus}
* */
export const getEventByEventNo = (eventNo, params, accessToken = '') => {
  const query = new URLSearchParams(params);
  return request(`display/events/${eventNo}`, "get", {accessToken}, query.toString(), {});
};

