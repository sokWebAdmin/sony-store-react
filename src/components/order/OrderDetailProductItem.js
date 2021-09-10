import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OrderDetailProductItem() {
  return (
    <div className="col_table_row">
      <div className="col_table_cell prd_wrap">
        <div className="prd">
          <div className="prd_thumb">
            <img className="prd_thumb_pic" src="../../images/_tmp/item640x640_01.png" alt="상품명입력" />
          </div>
          <div className="prd_info">
            <div className="prd_info_name">AK-47 Hi-Res 헤드폰 앰프</div>
            <p className="prd_info_option">128Bit/피아노블랙</p>
          </div>
        </div>
      </div>
      <div className="col_table_cell prd_price">
        4,299,000 <span className="won">원</span>
      </div>
      <div className="col_table_cell prd_count">
        2 <span className="unit">개</span>
      </div>
      <div className="col_table_cell prd_total">
        8,598,000 <span className="won">원</span>
      </div>
    </div>
  );
}
