import request from "./request";

export const getProductListByCategoryNo = (categoryNo, orderBy)=> {
  return request("products/search?fromDB=true&categoryNos="+categoryNo+"&order.by="+orderBy, "get", null, null, {});
};

export const getProductDetail = (productNo)=> {
  return request("products/"+productNo, "get", null, null, {});
};

export const bestProductList = ()=> {
  return request("products/main-best-products", "get", null, null, {});
};

export const newProductList = ()=> {
  return request("products/search?order.by=RECENT_PRODUCT&pageSize=4", "get", null, null, {});
};

export const themeProducts = (categoryNo)=> {
  return request("products/search?fromDB=true&categoryNos="+categoryNo+"&order.by=RECENT_PRODUCT&pageSize=4", "get", null, null, {});
};

export const getProductOptions = (productNo) => {
  return request("products/"+productNo+"/options", "get", null, null, {});
}