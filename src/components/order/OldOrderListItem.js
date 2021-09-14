import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderListItem({
  orderid,
  createdate, // TODO: 포맷 바꿔야함
  customernr,
  totalprice,
  status,
  seqno,
}) {
  const statusLabel = (status) => {
    const labels = {
      '00': '주문 진행중',
      '01': '주문',
      A6: '취소 처리중',
      '02': '주문 취소 완료',
      '03': '주문 취소 완료',
      '04': '결제 완료',
      '05': '주문 취소 완료',
      '06': '주문 취소 완료',
      '07': '발송완료',
      '08': '주문 취소 완료',
      '09': '발송완료(부분취소)',
      10: '판매 완료',
      11: '전체 반품',
      12: '부분 반품',
    };

    return labels[status];
  };
  return (
    <div className="col_table_row">
      <div className="col_table_cell order">
        <span className="order_date">{createdate}</span>
        <a href="#" className="order_number">
          {orderid}
        </a>
      </div>
      <div className="col_table_cell prd_wrap">
        <div className="prd">
          <div className="prd_info">
            <div className="prd_info_name">{seqno}</div>

            {/* <div className="prd_info_name">AK-47 Hi-Res 헤드폰 앰프</div>
            <p className="prd_info_option">128Bit/피아노블랙</p> */}
          </div>
        </div>
      </div>
      <div className="col_table_cell order">
        <span className="order_status">{statusLabel(status)}</span>
      </div>
    </div>
  );
}
