import { Link } from "react-router-dom";
import { useBoardState } from "../../../../context/board.context";

export default function NoticeItem() {

  const { noticeBoard } = useBoardState();

  const length = noticeBoard.items.length;

  return (
    <div className="col_table">
      <div className="col_table_head">
        <div className="col_table_row">
          <div className="col_table_cell">번호</div>
          <div className="col_table_cell divide">
            <div className="divide_table">
              <div className="table_cell">제목</div>
              <div className="table_cell">등록일</div>
              <div className="table_cell">조회수</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col_table_body">
        {
          noticeBoard.items.map(({
                                   articleNo,
                                   title,
                                   registerYmdt,
                                   viewCnt
                                 }, index) => {
            return (
              <div key={ articleNo } className="col_table_row" data-article-no={ articleNo }>
                <div className="col_table_cell notice_num">
                  <p className="txt">{ length - index }</p>
                </div>
                <div className="col_table_cell divide">
                  <div className="divide_table">
                    <div className="table_cell notice_tit tal">
                      <Link to={`/notice/${articleNo}`} className="txt link_btn">{title}</Link>
                    </div>
                    <div className="table_cell notice_date">
                      <p className="txt">{ registerYmdt?.substring(0, 10) }</p>
                    </div>
                    <div className="table_cell notice_pv">
                      <p className="txt">{ viewCnt }</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
} 
