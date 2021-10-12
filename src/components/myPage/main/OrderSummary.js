import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProfileOrdersSummaryStatus } from '../../../api/order';

const OrderSummary = () => {
  const history = useHistory();
  const [summary, setSummary] = useState({
    depositWaitCnt: 0,
    payDoneCnt: 0,
    productPrepareCnt: 0,
    deliveryPrepareCnt: 0,
    deliveryIngCnt: 0,
    deliveryDoneCnt: 0,
    buyConfirmCnt: 0,
    cancelDoneCnt: 0,
    returnDoneCnt: 0,
    exchangeDoneCnt: 0,
    cancelProcessingCnt: 0,
    returnProcessingCnt: 0,
    exchangeProcessingCnt: 0,
  });

  useEffect(() => {
    getProfileOrdersSummaryStatus().then((res) => {
      setSummary(res.data);
    });
  }, []);

  const hasOrder = (statusCount) => {
    return statusCount > 0 ? 'on' : '';
  };

  const onClickOrderStatus = (e, orderRequestTypes) => {
    e.preventDefault();
    history.push(`my-page/order-list?orderRequestTypes=${orderRequestTypes}`);
  };

  return (
    <div className="cont history_order">
      <div className="tit_head">
        <h3 className="cont_tit">주문/배송 내역</h3>
        <div className="btn_article right">
          <Link to="my-page/order-list" className="button button_secondary button-s">
            자세히 보기
          </Link>
        </div>
      </div>
      <div className="history_inner">
        <div className="my_order">
          <ul className="order_list">
            <li className={`step_1 ${hasOrder(summary.depositWaitCnt)}`}>
              {/* 1건 이상 부터 class: on 추가 */}
              <div className="ship_box">
                <span className="ico_txt">입금대기</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DEPOSIT_WAIT')}>
                  <span className="val">{summary.depositWaitCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_2 ${hasOrder(summary.payDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">결제완료</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'PAY_DONE')}>
                  <span className="val">{summary.payDoneCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_3 ${hasOrder(summary.deliveryPrepareCnt + summary.productPrepareCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송준비</span>
                <a
                  href="#"
                  className="val_txt"
                  onClick={(e) => onClickOrderStatus(e, 'PRODUCT_PREPARE,DELIVERY_PREPARE')}
                >
                  <span className="val">{summary.deliveryPrepareCnt + summary.productPrepareCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_4 ${hasOrder(summary.deliveryIngCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송중</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DELIVERY_ING')}>
                  <span className="val">{summary.deliveryIngCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className={`step_5 ${hasOrder(summary.deliveryDoneCnt)}`}>
              <div className="ship_box">
                <span className="ico_txt">배송완료</span>
                <a href="#" className="val_txt" onClick={(e) => onClickOrderStatus(e, 'DELIVERY_DONE')}>
                  <span className="val">{summary.deliveryDoneCnt}</span>
                  <span>건</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="my_claim">
          <p className={`txt cancel ${hasOrder(summary.cancelProcessingCnt + summary.cancelDoneCnt)}`}>
            주문 취소{' '}
            <a href="#" title="주문 취소 건" onClick={(e) => onClickOrderStatus(e, 'CANCEL_PROCESSING,CANCEL_DONE')}>
              <strong className="val_txt">
                <span className="val">{summary.cancelProcessingCnt + summary.cancelDoneCnt}</span> 건
              </strong>
            </a>
          </p>
          <p
            className={`txt return ${hasOrder(
              summary.exchangeDoneCnt +
                summary.returnDoneCnt +
                summary.returnProcessingCnt +
                summary.returnProcessingCnt,
            )}`}
          >
            교환 반품{' '}
            <a title="교환 반품 건">
              <strong className="val_txt">
                <span className="val">
                  {summary.exchangeDoneCnt +
                    summary.returnDoneCnt +
                    summary.returnProcessingCnt +
                    summary.exchangeProcessingCnt}
                </span>{' '}
                건
              </strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
