import request from "./request";

export const getProductListByCategoryNo = (categoryNo, orderBy)=> {
  if(orderBy == "TOP_PRICE"){
    return request("products/search?categoryNos="+categoryNo+"&order.by=DISCOUNTED_PRICE&order.direction=ASC", "get", null, null, {});
  }else{
    return request("products/search?categoryNos="+categoryNo+"&order.by="+orderBy, "get", null, null, {});
  }
  
  //POPULAR:판매인기순(검색엔진 도입), SALE_YMD:판매일자, DISCOUNTED_PRICE:가격순, REVIEW:상품평, SALE_CNT:총판매량순, RECENT_PRODUCT:최근상품순, MD_RECOMMEND:MD추천순
};

export const productSearch = (keyword, orderBy)=> {
  if(orderBy == "TOP_PRICE"){
    return request("products/search?filter.keywords="+keyword + "&order.by=DISCOUNTED_PRICE&order.direction=ASC", "get", null, null, {});
  }else{
    return request("products/search?filter.keywords="+keyword+"&order.by="+orderBy, "get", null, null, {});
  }
};

export const getProductDetail = (productNo)=> {
  return request("products/"+productNo, "get", null, null, {});
};

export const getProductOptions = (productNo)=> {
  return request("products/"+productNo+"/options", "get", null, null, {});
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
