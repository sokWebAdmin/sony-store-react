import React from 'react';

export default function OrderProcess({ defaultOrderStatusType }) {
  const orderStatuses = ['입금대기', '결제완료', '배송준비', '배송중', '배송완료'];

  // 현재 주문 상태(defaultOrderStatusType)와 마크업 loop의 주문 상태가 같은지 확인
  const isSameCurrentOrderStatus = (orderStatus) => {
    const orderStatusMap = {
      DEPOSIT_WAIT: '입금대기',
      PAY_DONE: '결제완료',
      PRODUCT_PREPARE: '배송준비', // 샵바이에는 상품준비중상태가 있지만 소니에는 없음.
      DELIVERY_PREPARE: '배송준비',
      DELIVERY_ING: '배송중',
      DELIVERY_DONE: '배송완료',
    };

    return orderStatusMap[defaultOrderStatusType] === orderStatus;
  };

  return (
    <div className="my_order order_process">
      <ul className="order_list">
        {/* 현상태만 class: on 추가, .ico_txt 내부에 <strong> 추가 */}
        {orderStatuses.map((orderStatus, index) => (
          <li key={index} className={`step_${index + 1} ${isSameCurrentOrderStatus(orderStatus) && 'on'}`}>
            <div className="ship_box">
              {isSameCurrentOrderStatus(orderStatus) ? (
                <span className="ico_txt">
                  <strong>{orderStatus}</strong>
                </span>
              ) : (
                <span className="ico_txt">{orderStatus}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
