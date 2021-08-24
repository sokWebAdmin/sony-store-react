import request from "./request";

export const loadBanner = (bannerCode)=> {
  return request("display/banners/"+bannerCode, "get", null, null, {});
};
