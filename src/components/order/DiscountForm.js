import { useEffect, useState, useContext, useMemo, useRef } from 'react';

// global context
import { useMallState } from '../../context/mall.context';
import { toCurrencyString } from '../../utils/unit';

// utils
import { onKeyboardEventOnlyDigit } from '../../utils/listener';
import { handleChange, setObjectState } from '../../utils/state';

// 배송지 정보
const DiscountForm = ({ discount, setDiscount, paymentInfo }) => {
    const { accumulationConfig } = useMallState();

    console.log(accumulationConfig?.accumulationUseMinPrice);

    // subPayAmt: number , coupons: nested object
    const { subPayAmt } = discount;
    // const handlePaymentChange = event => handleChange(event)(setDiscount);

    const pointInput = useRef();

    const pointUnit = accumulationConfig?.accumulationUnit || 'M'; // falsy

    const accumulationAmt = useMemo(
      () => paymentInfo?.accumulationAmt ? toCurrencyString(
        paymentInfo.accumulationAmt) : 0);

    const accumulationUseMinPriceWarnStyle = useMemo(() =>
      (accumulationConfig?.accumulationUseMinPrice && subPayAmt !== 0 &&
        accumulationConfig.accumulationUseMinPrice > subPayAmt) ?
        { color: '#e70000' } : {});

    const toCurrency = event => {
      const amount = event.target.value.replaceAll(',', '') * 1;

      if (amount > paymentInfo?.accumulationAmt) {
        event.target.value = accumulationAmt;
        setObjectState('subPayAmt', paymentInfo.accumulationAmt)(setDiscount);
        return;
      }

      event.target.value = toCurrencyString(amount);
      setObjectState('subPayAmt', amount)(setDiscount);
    };

    return (
      <>
        <div className="acc_form">
          <div className="acc_cell vat">
            <label htmlFor="coupon">쿠폰</label>
          </div>
          <div className="acc_cell">
            <div className="acc_group">
              <div className="acc_inp disable_type">
                <input type="text" id="coupon"
                       className="inp"
                       disabled /><span
                className="unit">원</span>
                <span className="focus_bg" />
              </div>
              <div className="acc_btn_box">
                <button
                  className="button button_negative button-s popup_comm_btn"
                  data-popup-name="coupon_inquiry"
                  type="button">쿠폰 조회
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="acc_form">
          <div className="acc_cell vat">
            <label htmlFor="mileage">멤버십 마일리지</label>
          </div>
          <div className="acc_cell parent">
            <div className="acc_group">
              <div className="acc_inp disable_type">
                <input type="text" id="mileage"
                       className="inp"
                       placeholder="0"
                       onKeyPress={onKeyboardEventOnlyDigit}
                       onChange={toCurrency}
                       ref={pointInput}
                /><span
                className="unit">점</span>
                <span className="focus_bg" />
              </div>
              <div className="acc_btn_box">
                <button
                  className="button button_negative button-s"
                  onClick={() => {
                    if (paymentInfo?.accumulationAmt) {
                      setObjectState('subPayAmt', paymentInfo.accumulationAmt)(
                        setDiscount);
                      pointInput.current.value = accumulationAmt;
                    }
                  }}
                  type="button">모두 사용
                </button>
                <span
                  className="my_point">(<em>{accumulationAmt} {pointUnit}</em> 보유)</span>
              </div>
            </div>
            {accumulationConfig?.accumulationUseMinPrice > 0 &&
            <p className="membership_info"
               style={accumulationUseMinPriceWarnStyle}>* 멤버십 마일리지는
              최소 {toCurrencyString(
                accumulationConfig.accumulationUseMinPrice)}점 부터 사용 가능합니다.</p>}
          </div>
        </div>
      </>
    );
  }
;

export default DiscountForm;