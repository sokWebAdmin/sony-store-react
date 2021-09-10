import React from 'react';

export default function OrderDetailProductItem({ productName, optionTitle, buyPrice, buyAmt, orderCnt }) {
  return (
    <div className="col_table_row">
      <div className="col_table_cell prd_wrap">
        <div className="prd">
          <div className="prd_thumb">
            <img className="prd_thumb_pic" src="../../images/_tmp/item640x640_01.png" alt="상품명입력" />
          </div>
          <div className="prd_info">
            <div className="prd_info_name">{productName}</div>
            <p className="prd_info_option">{optionTitle}</p>
          </div>
        </div>
      </div>
      <div className="col_table_cell prd_price">
        {buyPrice} <span className="won">원</span>
      </div>
      <div className="col_table_cell prd_count">
        {orderCnt} <span className="unit">개</span>
      </div>
      <div className="col_table_cell prd_total">
        {buyAmt} <span className="won">원</span>
      </div>
    </div>
  );
}
