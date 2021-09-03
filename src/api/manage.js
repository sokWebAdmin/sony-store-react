import request from "./request";

// board
export const getBoardList = (boardNo)=> {
  return request("boards/"+boardNo+"/articles?pageSize=10", "get", null, null, {});
};

