import { useEffect, useMemo, useRef } from "react";
import { debounce } from 'lodash';

export default function ViewMore({ totalCount, viewMore, pageSize, reset = false }) {
  const pageNumber = useRef(1);
  const hide = useMemo(() => (pageNumber * pageSize) > totalCount, [ pageNumber, pageSize, totalCount ])

  const debounceViewMore = debounce((pageNumber) => viewMore(pageNumber), 500);

  const handleCountClick = event => {
    event.preventDefault();

    pageNumber.current += 1;
    debounceViewMore(pageNumber + 1);
    // setPageNumber(prev => prev += 1);
  };

  useEffect(() => {
    if (reset) {
      pageNumber.current = 1;
    }
  }, [reset])

  return (
    <div className="btn_article comm_more" style={{ visibility: hide ? 'hidden' : 'visible' }}>
      <a 
        href="#none" 
        className="more_btn" 
        title="더보기"
        onClick={ handleCountClick }
      >더보기</a>
    </div>
  )
}