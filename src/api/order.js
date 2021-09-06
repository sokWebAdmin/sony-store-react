import request from "./request";

export const postOrderSheets = requestBody => {
  return request('order-sheets', 'post', null, null, requestBody)
}