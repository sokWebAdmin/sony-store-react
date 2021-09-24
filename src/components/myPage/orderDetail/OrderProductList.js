export default function OrderProductList({ children }) {
  return (
    <div className="col_table_wrap order_list">
      <div className="col_table">
        <div className="col_table_head">
          <div className="col_table_row">
            <div className="col_table_cell">제품</div>
            <div className="col_table_cell">가격</div>
            <div className="col_table_cell">수량</div>
            <div className="col_table_cell">합계</div>
          </div>
        </div>
        <div className="col_table_body">{children}</div>
      </div>
    </div>
  );
}
