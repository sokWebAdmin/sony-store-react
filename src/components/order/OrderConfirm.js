import React, { useState } from 'react';

const OrderConfirm = ({ tid }) => {
  const env = {
    mid: process.env.REACT_APP_INICIS_PG_MID,
    mKey: process.env.REACT_APP_INICIS_PG_M_KEY,
  }

  const [timeStamp, setTimeStamp] = useState(0)



  const submit = () => {
    setTimeStamp(Date.now())

    window.INIStdPay.pay('SendPayForm_id')
  }

  return (
    <>
      <button type="button" className="button button_negative button-s" onClick={submit}>
        구매확정
      </button>
      <form id="sendOrderConfirm" method="POST">
        <input type="hidden" name="version" value="1.0" />
        <input type="hidden" name="mid" value={env.mid} />
        <input type="hidden" name="tid" value={tid} />
        <input type="hidden" name="currency" value="WON" />
        <input type="hidden" name="timestamp" value={timeStamp} /> {/* wtf */}
        <input type="hidden" name="mKey" value={env.mKey} />
        <input type="hidden" name="returnUrl"
               value={window.location.href} /> {/* wtf */}
        <input type="hidden" name="closeUrl"
               value={window.location.href} /> {/* wtf */}
        <input type="hidden" name="popupUrl"
               value={window.location.href} /> {/* wtf */}
      </form>
    </>
  );
};

export default OrderConfirm;