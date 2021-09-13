import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderListItem({
  orderNo,
  payType,
  orderYmdt,
  imageUrl,
  productName,
  optionTitle,
  orderCnt,
  orderStatusType,
  orderStatusTypeLabel,
  setRefundAccountVisible,
}) {
  const showOrderCancel = (orderStatusType) => {
    return ['DEPOSIT_WAIT', 'PAY_DONE', 'DELIVERY_PREPARE', 'DELIVERY_ING'].includes(orderStatusType);
  };

  const showDeliveryFind = (orderStatusType) => {
    return ['DELIVERY_ING', 'DELIVERY_DONE'].includes(orderStatusType);
  };

  const showRefundAccountInfo = (orderStatusType, payType) => {
    return payType === 'VIRTUAL_ACCOUNT';
  };

  const onClickRefundAccount = () => setRefundAccountVisible(true);

  return (
    <div className="col_table_row">
      <div className="col_table_cell order">
        <span className="order_date">{orderYmdt}</span>
        <Link to={`/my-page/order-detail?orderNo=${orderNo}`} className="order_number">
          {orderNo}
        </Link>
      </div>
      <div className="col_table_cell prd_wrap">
        <div className="prd">
          <div className="prd_thumb">
            <img className="prd_thumb_pic" src={imageUrl} alt="상품명입력" />
          </div>
          <div className="prd_info">
            <div className="prd_info_name">{productName}</div>
            <p className="prd_info_option">{optionTitle}</p>
          </div>
        </div>
      </div>
      <div className="col_table_cell prd_count">
        {orderCnt} <span className="unit">개</span>
      </div>
      <div className="col_table_cell order">
        <span className="order_status">{orderStatusTypeLabel}</span>
        {showOrderCancel(orderStatusType) && (
          <button type="button" className="button button_negative button-s">
            주문취소
          </button>
        )}
        {showDeliveryFind(orderStatusType) && (
          <button type="button" className="button button_negative button-s">
            배송조회
          </button>
        )}
        {showRefundAccountInfo(orderStatusType, payType) && (
          <button type="button" className="button button_negative button-s" onClick={onClickRefundAccount}>
            환불계좌정보
          </button>
        )}
      </div>
    </div>
  );
}
