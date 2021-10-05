import React, { useEffect, useState } from 'react';
import { postProfileOrderCancelByOrderOptionNo } from '../../../api/order';
import { Link } from 'react-router-dom';
import { useAlert } from '../../../hooks';
import RefundAccount from '../../../pages/order/RefundAccount';
import Alert from '../../../components/common/Alert';
import Confirm from '../../../components/common/Confirm';

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
  claimNo,
  claimStatusType,
  delivery,
}) {
  const [refundAccountVisible, setRefundAccountVisible] = useState(false);
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const openConfirm = (message) => {
    setConfirmVisible(true);
    setConfirmMessage(message);
  };

  const orderStatusMap = {
    DEPOSIT_WAIT: '입금대기',
    PAY_DONE: '결제완료',
    PRODUCT_PREPARE: '배송준비', // 소니에서는 상품준비중을 배송준비중으로 표기
    DELIVERY_PREPARE: '배송준비',
    DELIVERY_ING: '배송중',
    DELIVERY_DONE: '배송완료',
    BUY_CONFIRM: '구매확정',
    CANCEL_REQUEST: '주문취소',
    CANCEL_DONE: '취소완료',
  };

  const claimStatusMap = {
    CANCEL_REQUEST: '주문취소',
    CANCEL_DONE: '취소완료',
    EXCHANGE_REQUEST: '교환',
    EXCHANGE_DONE: '교환완료',
    RETURN_REQUEST: '반품',
    RETURN_DONE: '반품완료',
  };

  const showOrderCancel = (orderStatusType, claimStatusType) => {
    // 주문아이템에 orderStatusType과 claimStatusType 둘 다 있음.
    // claimStatusType이 존재하면 클레임 중이니 주문 취소 버튼 hidden 처리
    if (claimStatusType) {
      return false;
    }

    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderStatusType);
  };

  const showDeliveryFind = (orderStatusType) => {
    return ['DELIVERY_ING', 'DELIVERY_DONE'].includes(orderStatusType);
  };

  const showRefundAccountInfo = (claimStatusType, payType) => {
    return claimStatusType === 'CANCEL_REQUEST' && payType === 'VIRTUAL_ACCOUNT';
  };

  const onClickRefundAccount = () => setRefundAccountVisible(true);

  const openFindDeliveryPopup = () => {
    window.open(delivery.retrieveInvoiceUrl);
  };

  const onClickOrderCancel = (payType) => {
    openConfirm('주문 취소 신청 후에는 변경하실 수 없습니다.\n취소 접수를 하시겠습니까?');
  };

  const onCloseConfirm = (status) => {
    setConfirmVisible(false);
    if (status === 'ok') {
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
          claimReasonDetail: '',
          bankAccountInfo: null,
          saveBankAccountInfo: false,
          responsibleObjectType: null,
          productCnt: orderCnt,
        },
      }).then((res) => {
        if (res.data.status === 400 || res.data.status === 404) {
          openAlert('취소 실패하였습니다. 다시 시도해주세요.');
          return;
        }
        openAlert(successMessage, () => () => window.location.reload());
      });
    } else if (status === 'cancel') {
      console.log('취소');
    }
  };

  return (
    <div className="col_table_row">
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {confirmVisible && <Confirm onClose={onCloseConfirm}>{confirmMessage}</Confirm>}
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
            {/* <p className="prd_info_option">{optionTitle}</p> */}
          </div>
        </div>
      </div>
      <div className="col_table_cell prd_count">
        {orderCnt} <span className="unit">개</span>
      </div>
      <div className="col_table_cell order">
        <span className="order_status">{claimStatusMap[claimStatusType] ?? orderStatusMap[orderStatusType]}</span>
        {showOrderCancel(orderStatusType, claimStatusType) && (
          <button type="button" className="button button_negative button-s" onClick={onClickOrderCancel}>
            주문취소
          </button>
        )}
        {showDeliveryFind(orderStatusType) && (
          <button type="button" className="button button_negative button-s" onClick={openFindDeliveryPopup}>
            배송조회
          </button>
        )}
        {showRefundAccountInfo(claimStatusType, payType) && (
          <>
            <button type="button" className="button button_negative button-s" onClick={onClickRefundAccount}>
              환불계좌정보
            </button>
            {refundAccountVisible && (
              <RefundAccount setVisible={setRefundAccountVisible} claimNo={claimNo} orderOptionNo={orderOptionNo} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
