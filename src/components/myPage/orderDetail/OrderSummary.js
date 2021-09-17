export default function OrderSummary({ orderInfo }) {
  // 기획이랑 기존 샵바이 주문 프로세스랑 기획이 너무 상이함.
  // 소니 기획: 주문별 주문상태출력, 샵바아: 옵션별 주문상태
  // 주문상세조회 API에서 defaultOrderStatusType를 대표로 출력하는데, 이값은 서버에서 orderOptions의 첫번째 아이템의 상태를 의미함
  const getOrderStatus = (defaultOrderStatusType) => {
    const orderStatus = {
      DEPOSIT_WAIT: '입금대기',
      PAY_DONE: '결제완료',
      PRODUCT_PREPARE: '배송준비', // 소니에서는 상품준비중을 배송준비중으로 표기ㄴ
      DELIVERY_PREPARE: '배송준비',
      DELIVERY_ING: '배송중',
      DELIVERY_DONE: '배송완료',
      CANCEL_REQUEST: '취소신청',
      CANCEL_PROCESSING: '취소진행중',
      CANCEL_DONE: '취소완료',
      EXCHANGE_REQUEST: '교환신청',
      EXCHANGE_PROCESSING: '교환진행중',
      EXCHANGE_WAIT: '교환대기',
      EXCHANGE_DONE: '교환완료',
      RETURN_REQUEST: '반품신청',
      RETURN_PROCESSING: '반품진행중',
      RETURN_DONE: '반품완료',
    };

    return orderStatus[defaultOrderStatusType];
  };

  const showFindDelivery = (defaultOrderStatusType) => {
    return defaultOrderStatusType === 'DELIVERY_ING' || defaultOrderStatusType === 'DELIVERY_DONE';
  };

  return (
    <div className="o_summary">
      <dl className="o_summary_status">
        <dt className="o_summary_term">처리상태</dt>
        <dd className="o_summary_desc">
          <strong>{getOrderStatus(orderInfo.defaultOrderStatusType)}</strong>
          {showFindDelivery(orderInfo.defaultOrderStatusType) && (
            <button type="button" className="button button_positive button-s">
              배송조회
            </button>
          )}
        </dd>
      </dl>
      <dl className="o_summary_date">
        <dt className="o_summary_term">주문날짜</dt>
        <dd className="o_summary_desc">{orderInfo.orderYmdt}</dd>
      </dl>
      <dl className="o_summary_number">
        <dt className="o_summary_term">주문번호</dt>
        <dd className="o_summary_desc">{orderInfo.orderNo}</dd>
      </dl>
    </div>
  );
}
