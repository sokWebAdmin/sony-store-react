import request from "./request";

export const getBoardList = (boardNo)=> {
  return request("boards/"+boardNo+"/articles?pageSize=10", "get", null, null, {});
};

