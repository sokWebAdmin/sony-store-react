import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// global context
import { useMallState } from '../../context/mall.context';
import { toCurrencyString } from '../../utils/unit';
import { fetchProfile, fetchMyProfile, useProfileState, useProileDispatch } from '../../context/profile.context';

// components
import UseCoupon from '../popup/UseCoupon';

// utils
import { onKeyboardEventOnlyDigit } from '../../utils/listener';
import { setObjectState } from '../../utils/state';
import { debounce } from 'lodash';

import useDebounce, { useAlert } from '../../hooks';
import Alert from '../common/Alert';
import { getProductDetail } from '../../api/product';

// 배송지 정보
const DiscountForm = ({ discount, setDiscount, paymentInfo, orderSheetNo, orderProducts, deliveryGroups }) => {
  const { accumulationConfig } = useMallState();
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

  // subPayAmt: number , coupons: nested object
  const { subPayAmt } = discount;
  // const handlePaymentChange = event => handleChange(event)(setDiscount);
  /**
   * Coupon
   */
  const [useCouponLoaded, setUseCouponLoaded] = useState(false);
  const [useCouponVisible, setUseCouponVisible] = useState(false);
  const [noCoupon, setNoCoupon] = useState(false);
  useEffect(() => {
    if (!useCouponVisible) {
      document.body.style.overflow = 'visible';
    }
  }, [useCouponVisible]);

  /**
   * Point
   */
  const [fetchedLatestMileage, setFetchedLatestMileage] = useState(false);
  const [inputSubPayAmt, setInputSubPayAmt] = useState('');
  const [accumulationUse, setAccumulationUse] = useState(true);
  const { my, profile } = useProfileState();
  const profileDispatch = useProileDispatch();

  const minPriceLimitUnder = useMemo(() => paymentInfo?.minPriceLimit > paymentInfo?.cartAmt, [paymentInfo]);

  useEffect(() => {
    fetchPoint();
  }, []);
  useEffect(() => {
    getProductData();
  }, [deliveryGroups]);

  const getProductData = async () => {
    const productNos = deliveryGroups[0]?.orderProducts.map(({ productNo }) => productNo);
    await fetchProductData(productNos);
  };

  const fetchProductData = useCallback(async (productNos) => {
    try {
      if (productNos) {
        const ret = await Promise.all(productNos.map((productNo) => getProductDetail(productNo)));
        const products = ret.map(({ data }) => data);
        let isAccumulationUse = true;
        products.forEach(({ baseInfo }) => {
          if (baseInfo?.accumulationUseYn === 'N') {
            isAccumulationUse = false;
          }
        });
        if (isAccumulationUse === false) {
          setAccumulationUse(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const availablemileage = useMemo(() => {
    return my?.availablemileage;
  }, [my]);

  async function fetchPoint() {
    if (profile?.customerid === undefined) {
      await fetchProfile(profileDispatch); // 만일 특정 사유로 인해서 profile 없을 경우 중복
      // 호출감수하고 profile 갱신
    }

    try {
      await fetchMyProfile(profileDispatch, { type: '30', customerid: profile?.customerid });
      setFetchedLatestMileage(true);
    } catch (err) {
      console.error(err);
      setFetchedLatestMileage(false);
    }
  }

  const debounced = useDebounce(inputSubPayAmt, 1000);
  useEffect(() => {
    if (debounced) {
      accumulationUseMinPriceWarn
        ? setObjectState('subPayAmt', 0)(setDiscount)
        : setObjectState('subPayAmt', inputSubPayAmt)(setDiscount);
    }
  }, [debounced]);

  const pointInput = useRef();

  const pointUnit = 'M';

  const accumulationUseMinPriceWarn = useMemo(
    () =>
      (accumulationConfig?.accumulationUseMinPrice &&
        inputSubPayAmt > 0 &&
        accumulationConfig.accumulationUseMinPrice > inputSubPayAmt) ||
      (paymentInfo?.cartAmt && inputSubPayAmt > 0 && paymentInfo.cartAmt < inputSubPayAmt),
    [accumulationConfig, inputSubPayAmt],
  );

  const checkValidPoint = () => {
    if (!paymentInfo.isAvailableAccumulation) {
      openAlert('마일리지 사용 불가 제품입니다.', () => {
        setInputSubPayAmt(0);
      });
      return;
    }
    accumulationUseMinPriceWarn && setInputSubPayAmt(0);
  };

  const toCurrency = (event) => {
    const amount = event.target.value.replaceAll(',', '') * 1;

    event.target.value = toCurrencyString(amount);
    setInputSubPayAmt(amount.toString());
  };

  return (
    <>
      {alertVisible && <Alert onClose={() => closeModal()}>{alertMessage}</Alert>}
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="coupon">쿠폰</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group">
            <div className="acc_inp disable_type">
              <input
                type="text"
                id="coupon"
                className="inp"
                value={paymentInfo?.productCouponAmt ? toCurrencyString(paymentInfo?.productCouponAmt) : '0'}
                disabled
              />
              <span className="unit">원</span>
            </div>
            <div className="acc_btn_box">
              <button
                className="button button_negative button-s popup_comm_btn"
                data-popup-name="coupon_inquiry"
                onClick={() => {
                  !useCouponLoaded && setUseCouponLoaded(true);
                  setUseCouponVisible(true);
                }}
                type="button"
              >
                쿠폰 조회
              </button>
              {useCouponLoaded && (
                <UseCoupon
                  show={useCouponVisible}
                  orderSheetNo={orderSheetNo}
                  setVisible={setUseCouponVisible}
                  orderProducts={orderProducts}
                  discount={discount}
                  setDiscount={setDiscount}
                  setReject={setNoCoupon}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {
        <div className="acc_form">
          <div className="acc_cell vat">
            <label htmlFor="mileage">멤버십 마일리지</label>
          </div>
          <div className="acc_cell parent">
            <div className="acc_group">
              <div className="acc_inp disable_type">
                <input
                  type="text"
                  id="mileage"
                  className="inp"
                  placeholder="0"
                  onKeyPress={onKeyboardEventOnlyDigit}
                  onChange={toCurrency}
                  onBlur={checkValidPoint}
                  ref={pointInput}
                  value={inputSubPayAmt}
                  disabled={(minPriceLimitUnder && availablemileage === undefined) || accumulationUse === false}
                />
                <span className="unit">점</span>
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
                          : paymentInfo.accumulationAmt,
                      );
                    }
                  }}
                  type="button"
                  disabled={minPriceLimitUnder && availablemileage === undefined}
                >
                  모두 사용
                </button>
                <span className="my_point">
                  (
                  <em>
                    {availablemileage} {pointUnit}
                  </em>{' '}
                  보유)
                </span>
              </div>
            </div>
            {accumulationConfig?.accumulationUseMinPrice > 0 && (
              <p
                className="membership_info"
                style={accumulationUseMinPriceWarn ? { color: '#e70000' } : { color: 'inherit' }}
              >
                * 멤버십 마일리지는 최소 5,000점 부터 사용 가능합니다.
              </p>
            )}
          </div>
        </div>
      }
    </>
  );
};
export default DiscountForm;
