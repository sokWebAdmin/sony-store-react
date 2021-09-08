import { React, useEffect, useMemo, useState } from 'react';
import ViewMore from '../../../../components/common/ViewMore';

import { useBoardState, useBoardDispatch, fetchBoards } from "../../../../context/board.context";
import FaqCategories from './FaqCategories';
import FaqItem from './FaqItem';

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
  const { config, currentCategoryNo, isAll, faqBoard } = useBoardState();

  const boardNo = useMemo(() => config?.faq.boardNo, [config.faq.boardNo]);

  const [ resetViewMore, setResetViewMore ] = useState(false);

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
      setResetViewMore(true);
      return
    }

    if (isAll) {
      const request = getReqeust(boardNo);
      fetchBoards(dispatch, request);
      setResetViewMore(true);
    }

  }, [dispatch, boardNo, currentCategoryNo, isAll]);

  const viewMore = pageNumber => fetchBoards(dispatch, getReqeust(boardNo, { pageNumber }));

  return (
    <div className="faq_notice_inner">
      <div className="faq_notice_cont faq_list">
        <FaqCategories />
        <div className="category_list">
          <FaqItem />
          <ViewMore 
            totalCount={faqBoard.totalCount}
            viewMore={viewMore}
            pageSize={10}
            reset={resetViewMore}
          />
        </div>
      </div>
    </div>
  )
} 