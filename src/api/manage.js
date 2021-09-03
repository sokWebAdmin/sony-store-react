import request from "./request";

// board
export const getBoardList = (boardNo)=> {
  return request("boards/"+boardNo+"/articles?pageSize=10", "get", null, null, {});
};
export const getBoardConfiguration = () => {
  return request(`boards/configurations`, 'get', null, null, null);
}

export const getBoards = ({ pathParams, params }) => {
  return request(`boards/${pathParams.boardNo}/articles`, 'get', null, params, null)
}

export const getBoardByArticleId = data => {
  const { pathParams: { boardNo, articleNo } } = data;
  return request(`boards/${boardNo}/articles/${articleNo}`, 'get', null, null, null);
}

export const getBoardCategories = data => {
  return request(`boards/${data.pathParams.boardNo}/categories`, 'get', null, null, null);
}
