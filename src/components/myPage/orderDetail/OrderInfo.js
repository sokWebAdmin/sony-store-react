export default function OrderInfo({ shippingAddress, ordererInfo }) {
  return (
    <div className="cont order_info">
      <h3 className="cont_tit">{shippingAddress.usesShippingInfoLaterInput && '선물하기 '} 주문 정보</h3>
      <div className="order_info_inner">
        <dl className="order">
          <dt className="order_term">주문자 정보</dt>
          <dd className="order_desc">
            {ordererInfo.ordererName}({ordererInfo.ordererContact1})
          </dd>
          <dt className="order_term">수령인</dt>
          <dd className="order_desc">
            {shippingAddress.receiverName}({shippingAddress.ordererContact1})
          </dd>
          <dt className="order_term">휴대폰 번호</dt>
          <dd className="order_desc">{shippingAddress.receiverContact1}</dd>
          <dt className="order_term">배송지</dt>
          <dd className="order_desc">
            {shippingAddress.receiverAddress}
            {shippingAddress.receiverDetailAddress}
          </dd>
          <dt className="order_term">배송 요청사항</dt>
          <dd className="order_desc">{shippingAddress.deliveryMemo ? shippingAddress.deliveryMemo : '없음'}</dd>
          <dt className="order_term">배송일 선택</dt>
          <dd className="order_desc">
            {shippingAddress.requestShippingDate ? shippingAddress.requestShippingDate : '정상 배송'}
          </dd>
        </dl>
      </div>
    </div>
  );
}
