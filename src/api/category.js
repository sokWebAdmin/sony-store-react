import request from "./request";

export const getCategoryList = (categoryNo, orderBy)=> {
  return request("categories", "get", null, null, {});
};
