import request from "./request";

export const getMallInfo = () => {
  return request('malls', 'get', null, null, null)
}