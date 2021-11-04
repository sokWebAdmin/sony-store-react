import React, { useState } from 'react';

/**
 * 이니시스 구매확정 API 다이렉트 연동
 *
 * https://manual.inicis.com/stdpay/std-add.php#escrow
 */
const OrderConfirm = ({ tid }) => {
  const env = {
    mid: process.env.REACT_APP_INICIS_PG_MID,
    mKey: process.env.REACT_APP_INICIS_PG_M_KEY,
  }

  const [timeStamp, setTimeStamp] = useState(0)

  const submit = () => {
    setTimeStamp(Date.now())

    window.INIStdPay.pay('sendOrderConfirm')
  }

  return (
    <>
      <button type="button" className="button button_positive" onClick={submit}>
        테스트용 구매확정 버튼
      </button>
      <form id="sendOrderConfirm" style={{ position: 'absolute'}} method="POST">
        <input type="hidden" name="version" value="1.0" />
        <input type="hidden" name="mid" value={env.mid} />
        <input type="hidden" name="tid" value={tid} />
        <input type="hidden" name="currency" value="WON" />
        <input type="hidden" name="timestamp" value={timeStamp} />
        <input type="hidden" name="mKey" value={env.mKey} />
        <input type="hidden" name="acceptmethod" value="escrow_buyd(co)" />
        <input type="hidden" name="returnUrl"
               value={window.location.href} /> {/* wtf */}
        <input type="hidden" name="closeUrl"
               value="javascript:alert('브라우저를 새로고침 해주세요.')" />
      </form>
    </>
  );
};

export default OrderConfirm;