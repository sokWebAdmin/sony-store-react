export default function OrderListTable({ children }) {
  return (
    <div className="col_table">
      <div className="col_table_head">
        <div className="col_table_row">
          <div className="col_table_cell">주문날짜/번호</div>
          <div className="col_table_cell">제품</div>
          <div className="col_table_cell">수량</div>
          <div className="col_table_cell">처리상태</div>
        </div>
      </div>
      {children}
    </div>
  );
}
