import React, { useEffect } from 'react';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderListItem({}) {
  return (
    <div className="col_table_row">
      <div className="col_table_cell order">
        <span className="order_date">21.05.12</span>
        <a className="order_number">20210512-663W24</a>
      </div>
      <div className="col_table_cell prd_wrap">
        <div className="prd">
          <div className="prd_thumb">
            <img
              className="prd_thumb_pic"
              src="../../images/_tmp/item640x640_01.png"
              alt="상품명입력"
            />
          </div>
          <div className="prd_info">
            <div className="prd_info_name">AK-47 Hi-Res 헤드폰 앰프</div>
            <p className="prd_info_option">128Bit/피아노블랙</p>
          </div>
        </div>
      </div>
      <div className="col_table_cell prd_count">
        2 <span className="unit">개</span>
      </div>
      <div className="col_table_cell order">
        <span className="order_status">결제완료</span>
        <button type="button" className="button button_negative button-s">
          주문취소
        </button>
      </div>
    </div>
  );
}
