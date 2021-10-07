import React from "react"
import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../../const/search";
import { useBoardState } from "../../context/board.context";
import { formatDateWithDot } from "../../utils/dateFormat";
import ViewMore from "../common/ViewMore";
import Newest from "./Newest";
const getHightKeyword = (title, keyword) => {
  if (title.includes(keyword)) {
    const [ prev, next ] = title.split(keyword);
    return `${prev}<strong class="keword">${keyword}</strong>${next}`
  }
  return title;
};

export default function NoticeResult({ noticeList, noticeCount, keyword, noticeNewest, setNoticeNewest, searchNotice }) {
  const { config } = useBoardState();
  return (
    <>
      <div className="section_top">
        <h2 className="title">공지사항<span>({noticeCount})</span></h2>
        <div className="itemsort" aria-label="게시판 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <Newest 
            newest={noticeNewest}
            setNewest={setNoticeNewest}
          />
        </div>
      </div>
      <div className="result_list on">
        <ul className="noti">
          {
            noticeList.map(notice => (
              <li key={ notice.articleNo }>
                <Link to={`/notice/${notice.articleNo}`}>
                  <span className="num">{ notice.articleNo }</span>
                  <span className="tit" dangerouslySetInnerHTML={{ __html: getHightKeyword(notice.title, keyword) }}></span>
                  <span className="date">{ formatDateWithDot(notice.registerYmdt) }</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <ViewMore 
        totalCount={noticeCount}
        viewMore={pageNumber => searchNotice(keyword, config.notice.boardNo, noticeNewest, pageNumber)}
        pageSize={PAGE_SIZE.NOTICE}
      />
    </>
  )
}