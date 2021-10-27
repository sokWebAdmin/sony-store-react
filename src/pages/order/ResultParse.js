import React, { useEffect, useMemo, useContext } from 'react';
import { useHistory } from 'react-router';
import { getUrlParam } from '../../utils/location';
import { getGuestOrderByOrderNo, getProfileOrderByOrderNo, postGuestOrdersOrderNo } from '../../api/order';
import GlobalContext from '../../context/global.context';
import { setGuestToken } from '../../utils/token';

// 주문결과 미들웨어
/**
 * status : 'DEPOSIT_WAIT'|'PAY_DONE'|'PAY_FAIL'|'UNDEFINED'
 * orderType : 'DEFAULT'|'GIFT'
 */
const ResultParse = ({ location }) => {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);

  const orderNo = useMemo(() => getUrlParam('orderNo'), [location]);
  const result = useMemo(() => getUrlParam('result'), [location]);
  const message = useMemo(() => getUrlParam('message'), [location]);

  const handleStatus = () => {
    result === 'SUCCESS' ? handleSuccessResult().catch(console.error) : handleFailResult();
  };

  useEffect(handleStatus, [location]);

  async function handleSuccessResult() {
    const orderTypeR = await orderTypeReferee();

    history.push(`/order/complete${location.search} + '&status=${orderTypeR.status}&orderType=${orderTypeR.orderType}`);
  }

  async function orderTypeReferee() {
    if (!isLogin) {
      setGuestToken(getUrlParam('guestToken'));
    }
    const { data } = isLogin
      ? await getProfileOrderByOrderNo({ path: { orderNo } })
      : await getGuestOrderByOrderNo({ path: { orderNo } });
    
      const isDepositWait = data.defaultOrderStatusType === 'DEPOSIT_WAIT';
    const isGift = data.shippingAddress?.receiverZipCd === '-' || !data?.shippingAddress?.receiverZipCd;

    return { status: isDepositWait ? 'DEPOSIT_WAIT' : 'PAY_DONE', orderType: isGift ? 'GIFT' : 'DEFAULT' };
  }

  function handleFailResult() {
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
