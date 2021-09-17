export default function OrderNotice() {
  return (
    <div className="order_notice">
      <h3 className="order_notice_title">주문/배송 시 주의사항</h3>
      <ul className="list_dot">
        <li>주문 취소 접수 후에는 사용하신 쿠폰은 사라지며, 재 주문 시에 다시 복원되지 않습니다.</li>
        <li>
          처리 상태가 <strong>배송중, 배송 완료 상태</strong>인 경우는 온라인 상으로 주문 취소 접수가 되지 않으며,
          소니코리아 고객지원센터(
          <strong>1588-0911</strong>)를 통해서 주문 취소 요청을 하실 수 있습니다.
        </li>
        <li>주문 마감 기간의 경우는 주문 취소 접수가 되지 않을 수 있습니다.</li>
        <li>
          <strong>
            신용카드 영수증, 현금영수증 신청을 클릭하시면 출력하실 수 있습니다. (PC버전에서만 가능합니다.)
          </strong>
        </li>
      </ul>
    </div>
  );
}
