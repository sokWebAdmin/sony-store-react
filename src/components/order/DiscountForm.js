import { useState, useMemo, useRef, useEffect } from 'react';

// global context
import { useMallState } from '../../context/mall.context';
import { toCurrencyString } from '../../utils/unit';

// components
import UseCoupon from '../popup/UseCoupon';

// utils
import { onKeyboardEventOnlyDigit } from '../../utils/listener';
import { setObjectState } from '../../utils/state';
import { debounce } from 'lodash';
import useDebounce from '../../hooks';

// 배송지 정보
const DiscountForm = ({ discount, setDiscount, paymentInfo, orderSheetNo, orderProducts }) => {
  const { accumulationConfig } = useMallState();

  // subPayAmt: number , coupons: nested object
  const { subPayAmt } = discount;
  // const handlePaymentChange = event => handleChange(event)(setDiscount);
  /**
   * Coupon
   */
  const [useCouponLoaded, setUseCouponLoaded] = useState(false);
  const [useCouponVisible, setUseCouponVisible] = useState(false);
  const [noCoupon, setNoCoupon] = useState(false);

  /**
   * Point
   */
  const [inputSubPayAmt, setInputSubPayAmt] = useState('');

  const debounced = useDebounce(inputSubPayAmt, 1000);
  useEffect(() => {
    if (debounced) {
      accumulationUseMinPriceWarn
        ? setObjectState('subPayAmt', 0)(setDiscount)
        : setObjectState('subPayAmt', inputSubPayAmt)(setDiscount);
    }
  }, [debounced]);

  const pointInput = useRef();

  const pointUnit = accumulationConfig?.accumulationUnit || 'M'; // falsy

  const accumulationAmt = useMemo(
    () => paymentInfo?.accumulationAmt ? toCurrencyString(
      paymentInfo.accumulationAmt) : 0, [paymentInfo]);

  const accumulationUseMinPriceWarn = useMemo(() =>
    (accumulationConfig?.accumulationUseMinPrice && inputSubPayAmt > 0 &&
      accumulationConfig.accumulationUseMinPrice > inputSubPayAmt) ||
    (paymentInfo?.cartAmt && inputSubPayAmt > 0 && paymentInfo.cartAmt <
      inputSubPayAmt), [accumulationConfig, inputSubPayAmt]);

  const checkValidPoint = () => accumulationUseMinPriceWarn &&
    setInputSubPayAmt(0);

  const toCurrency = event => {
    const amount = event.target.value.replaceAll(',', '') * 1;

    event.target.value = toCurrencyString(amount);
    setInputSubPayAmt(amount.toString());
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
                       value={paymentInfo?.productCouponAmt ? toCurrencyString(
                         paymentInfo?.productCouponAmt) : '0'}
                       disabled /><span
                className="unit">원</span>
              </div>
              <div className="acc_btn_box">
                <button
                  className="button button_negative button-s popup_comm_btn"
                  data-popup-name="coupon_inquiry"
                  onClick={() => {
                    if (noCoupon) {
                      alert('사용 가능한 쿠폰이 없습니다.');
                      return;
                    }

                    !useCouponLoaded && setUseCouponLoaded(true);
                    setUseCouponVisible(true);
                  }}
                  type="button">쿠폰 조회
                </button>
                {useCouponLoaded && <UseCoupon show={useCouponVisible}
                                               orderSheetNo={orderSheetNo}
                                               setVisible={setUseCouponVisible}
                                               orderProducts={orderProducts}
                                               discount={discount}
                                               setDiscount={setDiscount}
                                               setReject={setNoCoupon}
                />}
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
                       onBlur={checkValidPoint}
                       ref={pointInput}
                       value={inputSubPayAmt}
                /><span
                className="unit">점</span>
                <span className="focus_bg" />
              </div>
              <div className="acc_btn_box">
                <button
                  className="button button_negative button-s"
                  onClick={() => {
                    if (paymentInfo?.accumulationAmt) {
                      setInputSubPayAmt(
                        paymentInfo.accumulationAmt > paymentInfo.cartAmt
                          ? paymentInfo.cartAmt
                          : paymentInfo.accumulationAmt);
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
               style={accumulationUseMinPriceWarn
                 ? { color: '#e70000' }
                 : { color: 'inherit' }}>* 멤버십 마일리지는
              최소 {toCurrencyString(
                accumulationConfig.accumulationUseMinPrice)}점 {paymentInfo?.cartAmt &&
              <span>, 최대 {toCurrencyString(paymentInfo.cartAmt)}</span>
              } 사용 가능합니다.</p>}
          </div>
        </div>
      </>
    );
  }
;

export default DiscountForm;