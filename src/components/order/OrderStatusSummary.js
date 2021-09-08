import React, { useEffect } from 'react';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

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
}) {
  const totalCancelCnt = cancelProcessingCnt + cancelDoneCnt;
  const totalExchangeAndReturnCnt =
    exchangeDoneCnt +
    returnDoneCnt +
    returnProcessingCnt +
    exchangeProcessingCnt;

  const hasOrder = (statusCount) => {
    return statusCount > 0 ? 'on' : '';
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
                <a className="val_txt">
                  <span className="val">{depositWaitCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_2 ${hasOrder(payDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">결제완료</span>
                <a className="val_txt">
                  <span className="val">{payDoneCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_3 ${hasOrder(deliveryPrepareCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송준비</span>
                <a className="val_txt">
                  <span className="val">{deliveryPrepareCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_4 ${hasOrder(deliveryIngCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송중</span>
                <a className="val_txt">
                  <span className="val">{deliveryIngCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_5 ${hasOrder(deliveryDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송완료</span>
                <a className="val_txt">
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
