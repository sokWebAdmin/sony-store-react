import React, { useEffect } from 'react';

import { addMonth, changeDateFormat } from '../../../utils/dateFormat';

//api

//css
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/mypage.scss';

export default function OrderStatusSummary({
  summary: {
    depositWaitCnt,
    payDoneCnt,
    productPrepareCnt,
    deliveryPrepareCnt,
    deliveryIngCnt,
    deliveryDoneCnt,
    buyConfirmCnt,
    cancelDoneCnt,
    returnDoneCnt,
    exchangeDoneCnt,
    cancelProcessingCnt,
    returnProcessingCnt,
    exchangeProcessingCnt,
  },
  search,
}) {
  const totalCancelCnt = cancelProcessingCnt + cancelDoneCnt;
  const totalExchangeAndReturnCnt = exchangeDoneCnt + returnDoneCnt + returnProcessingCnt + exchangeProcessingCnt;

  const hasOrder = (statusCount) => {
    return statusCount > 0 ? 'on' : '';
  };

  const onClickOrderStatus = (e, orderRequestType) => {
    e.preventDefault();
    const startDate = changeDateFormat(new Date(addMonth(new Date(), -3)), 'YYYY-MM-DD');
    const endDate = changeDateFormat(new Date(), 'YYYY-MM-DD');
    search({ startDate, endDate, pageNumber: 1, pageSize: 10, orderRequestTypes: orderRequestType });
  };

  return (
    <div className="cont history_order">
      <div className="history_inner">
        <div className="my_order">
          <ul className="order_list">
            <li className={`step_1 ${hasOrder(depositWaitCnt)}`}>
              {/* 1건 이상 부터 class: on 추가 */}
              <div className="ship_box">
                <span className="ico_txt">입금대기</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DEPOSIT_WAIT')}>
                  <span className="val">{depositWaitCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_2 ${hasOrder(payDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">결제완료</span>
                <a className="val_txt" onClick={(e) => onClickOrderStatus(e, 'PAY_DONE')}>
                  <span className="val">{payDoneCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_3 ${hasOrder(deliveryPrepareCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송준비</span>
                <a
                  href="#"
                  className="val_txt"
                  onClick={(e) => onClickOrderStatus(e, 'PRODUCT_PREPARE,DELIVERY_PREPARE')}
                >
                  <span className="val">{deliveryPrepareCnt + productPrepareCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_4 ${hasOrder(deliveryIngCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송중</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DELIVERY_ING')}>
                  <span className="val">{deliveryIngCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_5 ${hasOrder(deliveryDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송완료</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DELIVERY_DONE')}>
                  <span className="val">{deliveryDoneCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="my_claim">
          <p className={`txt cancel ${hasOrder(totalCancelCnt)}`}>
            주문 취소{' '}
            <a title="주문 취소 건">
              <strong className="val_txt">
                <span className="val">{totalCancelCnt}</span> 건
              </strong>
            </a>
          </p>
          <p className={`txt return ${hasOrder(totalExchangeAndReturnCnt)}`}>
            교환 반품{' '}
            <a title="교환 반품 건">
              <strong className="val_txt">
                <span className="val">{totalExchangeAndReturnCnt}</span> 건
              </strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
