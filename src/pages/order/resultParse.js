import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { getUrlParam } from '../../utils/location';

// 주문결과 미들웨어
const ResultParse = ({ location }) => {
  const history = useHistory();

  const orderSheetNo = useMemo(() => getUrlParam('orderSheetNo'), [location]);
  const orderNo = useMemo(() => getUrlParam('orderNo'), [location]);
  const payType = useMemo(() => getUrlParam('PayType'), [location]);
  const result = useMemo(() => getUrlParam('result'), [location]);

  const handleStatus = () => {
    result === 'SUCCESS' ? handleSuccessResult() : handleFailResult();
  };

  useEffect(handleStatus, [location]);

  function handleSuccessResult () {
    const isDepositWait = payType === 'VIRTUAL_ACCOUNT';
    isDepositWait
      ? history.push(
      `/order/complete${location.search + '&status=DEPOSIT_WAIT'}`)  // 입금 대기
      : history.push(`/order/complete${location.search} + '&status=PAY_DONE'`); // 결제
                                                                               // 완료
  }

  function handleFailResult () {
    console.log(result);
  }

  return (
    <>
      <template>order result parsing...</template>
    </>
  );
};

export default ResultParse;