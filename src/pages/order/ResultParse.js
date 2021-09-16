import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { getUrlParam } from '../../utils/location';
import { getProfileOrderByOrderNo } from '../../api/order';

// 주문결과 미들웨어
/**
 * status : 'DEPOSIT_WAIT'|'PAY_DONE'|'PAY_FAIL'|'UNDEFINED'
 * orderType : 'DEFAULT'|'GIFT'
 */
const ResultParse = ({ location }) => {
  const history = useHistory();

  const orderNo = useMemo(() => getUrlParam('orderNo'), [location]);
  const result = useMemo(() => getUrlParam('result'), [location]);
  const message = useMemo(() => getUrlParam('message'), [location]);

  const handleStatus = () => {
    result === 'SUCCESS'
      ? handleSuccessResult().catch(console.error)
      : handleFailResult();
  };

  useEffect(handleStatus, [location]);

  async function handleSuccessResult () {
    const orderType = await orderTypeReferee();

    if (orderType === 'DEPOSIT_WAIT') {
      history.push(`/order/complete${location.search + '&status=DEPOSIT_WAIT'}`);  // 입금 대기
      return;
    }

    if (orderType === 'GIFT') {
      history.push(
        `/order/complete${location.search} + '&status=PAY_DONE&orderType=GIFT`);
      return;
    }

    history.push(
      `/order/complete${location.search} + '&status=PAY_DONE&orderType=DEFAULT`);
  }

  async function orderTypeReferee () {
    const { data } = await getProfileOrderByOrderNo({ path: { orderNo } });
    const isDepositWait = data.defaultOrderStatusType === 'DEPOSIT_WAIT';
    if (isDepositWait) {
      return 'DEPOSIT_WAIT';
    }

    const isGift = data.shippingAddress?.receiverZipCd === '-' ||
      !data?.shippingAddress?.receiverZipCd;
    if (isGift) {
      return 'GIFT';
    }
    console.log(data);

  }

  function handleFailResult () {
    const isCancel = message.includes('V801'); // 취소 코드. 다른 사유 있을경우 추가

    if (isCancel) {
      history.push(`/order/fail${location.search + '&status=PAY_FAIL'}`);
      return;
    }

    history.push(`/order/fail${location.search + '&status=UNDEFINED'}`);
  }

  return (
    <>
      <template>order result parsing...</template>
    </>
  );
};

export default ResultParse;