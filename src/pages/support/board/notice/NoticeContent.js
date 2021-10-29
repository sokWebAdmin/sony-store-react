import { useEffect, useMemo, useState } from 'react';
import ViewMore from '../../../../components/common/ViewMore';
import { fetchBoards, useBoardDispatch, useBoardState } from '../../../../context/board.context';
import NoticeItem from './NoticeItem';

const getReqeust = (boardNo, params = {}) => {
  const defaultParams = {
    searchType: 'ALL',
    hasTotalCount: true,
    pageNumber: 1,
    pageSize: 10,
  };
  return {
    pathParams: {
      boardNo,
    },
    params: {
      ...defaultParams,
      ...params,
    },
  };
};

export default function NoticeContent() {
  const dispatch = useBoardDispatch();
  const { config, noticeBoard } = useBoardState();
  const boardNo = useMemo(() => config?.notice.boardNo, [config.notice.boardNo]);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => setIsInit(true), []);

  useEffect(() => {
    if (boardNo > 0) {
      const request = getReqeust(boardNo);
      fetchBoards(dispatch, request, 'notice', true);
    }
  }, [dispatch, boardNo, isInit]);

  const viewMore = (pageNumber) => fetchBoards(dispatch, getReqeust(boardNo, { pageNumber }), 'notice');

  return (
    <div className="faq_notice_inner">
      <div className="faq_notice_cont notice_list">
        {/* <div className="itemsort" aria-label="종료된 기획전 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된 순</a></li>
            </ul>
          </div>
        </div> */}
        <div className="col_table_wrap">
          <NoticeItem boardNo={boardNo} />
          <ViewMore totalCount={noticeBoard.totalCount} viewMore={viewMore} pageSize={10} />
        </div>
      </div>
    </div>
  );
}
