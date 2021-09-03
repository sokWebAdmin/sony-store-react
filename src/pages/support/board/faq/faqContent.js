import { React, useEffect, useMemo } from 'react';

import { useBoardState, useBoardDispatch, fetchBoards } from "../../../../context/board.context";
import FaqCategories from './faqCategories';
import FaqItem from './faqItem';

const getReqeust = (boardNo, params = {}) => {
  const defaultParams = {
    searchType: 'ALL',
    hasTotalCount: true,
    pageNumber: 1,
    pageSize: 10,
  }
  return {
    pathParams: {
      boardNo,
    },
    params: {
      ...defaultParams,
      ...params,
    }
  }
}

export default function FaqContent() {
  const dispatch = useBoardDispatch();
  const { config, currentCategoryNo, isAll } = useBoardState();
  const boardNo = useMemo(() => config?.faq.boardNo, [config.faq.boardNo]);

  useEffect(() => {
    if (boardNo > 0) {
      const request = getReqeust(boardNo);
      fetchBoards(dispatch, request)
    }
  }, [dispatch, boardNo]);

  useEffect(() => {
    if (currentCategoryNo > 0) {
      const request = getReqeust(boardNo, { categoryNo: currentCategoryNo })
      fetchBoards(dispatch, request);
      return
    }

    if (isAll) {
      const request = getReqeust(boardNo);
      fetchBoards(dispatch, request);
    }

  }, [dispatch, boardNo, currentCategoryNo, isAll]);

  return (
    <div className="faq_notice_inner">
      <div className="faq_notice_cont faq_list">
        <FaqCategories />
        <div className="category_list">
          <FaqItem />
          <div className="btn_article comm_more">
            <a href="#none" className="more_btn" title="더보기">더보기</a>
          </div>
        </div>
      </div>
    </div>
  )
} 