import React, { useEffect, useState } from 'react';
import { postProfileOrderCancelByOrderOptionNo } from '../../../api/order';
import { Link } from 'react-router-dom';
import RefundAccount from '../../../pages/order/RefundAccount';

//api

//css
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/mypage.scss';

export default function OrderListItem({
  orderNo,
  orderOptionNo,
  payType,
  orderYmdt,
  imageUrl,
  productName,
  optionTitle,
  orderCnt,
  orderStatusType,
  delivery,
}) {
  const [refundAccountVisible, setRefundAccountVisible] = useState(false);
  const orderStatusMap = {
    DEPOSIT_WAIT: '입금대기',
    PAY_DONE: '결제완료',
    PRODUCT_PREPARE: '배송준비', // 소니에서는 상품준비중을 배송준비중으로 표기
    DELIVERY_PREPARE: '배송준비',
    DELIVERY_ING: '배송중',
    DELIVERY_DONE: '배송완료',
  };

  const showOrderCancel = (orderStatusType) => {
    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE', 'DELIVERY_ING'].includes(
      orderStatusType,
    );
  };

  const showDeliveryFind = (orderStatusType) => {
    return ['DELIVERY_ING', 'DELIVERY_DONE'].includes(orderStatusType);
  };

  const showRefundAccountInfo = (orderStatusType, payType) => {
    return payType === 'VIRTUAL_ACCOUNT';
  };

  const onClickRefundAccount = () => setRefundAccountVisible(true);

  const openFindDeliveryPopup = () => {
    window.open(delivery.retrieveInvoiceUrl);
  };

  const onClickOrderCancel = (payType) => {
    //TODO: 컨펌, 얼럿 UI 있는지 확인. 로직 검증을 위해 임시로 윈도우컨펌얼럿으로

    if (!window.confirm('주문 취소 신청 후에는 변경하실 수 없습니다.\n취소 접수를 하시겠습니까?')) {
      return;
    }

    const virtualAccountSuccess =
      '주문 취소 요청이 정상적으로 완료되었습니다.\n주문 취소 요청 후 최종 취소 접수까지는 약 1일 정도가 쇼요됩니다.\n환불받으실 계좌를 등록하시면 더욱 편리하게 환불받으실 수 있습니다.';
    const creditCardSuccess =
      '주문 취소 요청이 정상적으로 완료되었습니다.\n주문 취소 요청 후 최종 취소 접수까지는 약 1일 정도가 쇼요됩니다.';
    const successMessage = payType === 'VIRTUAL_ACCOUNT' ? virtualAccountSuccess : creditCardSuccess;

    return postProfileOrderCancelByOrderOptionNo({
      path: { orderOptionNo },
      requestBody: {
        claimType: 'CANCEL',
        claimReasonType: 'CHANGE_MIND', // TODO: etc로 변경? 확인해야함
        claimReasonDetail: null,
        bankAccountInfo: null,
        saveBankAccountInfo: false,
        responsibleObjectType: null,
        productCnt: orderCnt,
      },
    })
      .then(() => {
        alert(successMessage);
      })
      .catch(() => {
        // FIXME: 않이 외 에러 catch가 않되?
        alert('취소 실패하였습니다. 다시 시도해주세요.'); // TODO: 실패 메세지 기획 없음
      });
  };

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
        <span className="order_status">{orderStatusMap[orderStatusType]}</span>
        {showOrderCancel(orderStatusType) && (
          <button type="button" className="button button_negative button-s" onClick={onClickOrderCancel}>
            주문취소
          </button>
        )}
        {showDeliveryFind(orderStatusType) && (
          <button type="button" className="button button_negative button-s" onClick={openFindDeliveryPopup}>
            배송조회
          </button>
        )}
        {showRefundAccountInfo(orderStatusType, payType) && (
          <>
            <button type="button" className="button button_negative button-s" onClick={onClickRefundAccount}>
              환불계좌정보
            </button>
            {refundAccountVisible && (
              <RefundAccount setVisible={setRefundAccountVisible} orderOptionNo={orderOptionNo} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
