import React, { useState, useEffect } from 'react';
import { toCurrencyString } from '../../../utils/unit';
import { isSgicExists } from "../../../api/sony/order";

export default function PurchaseInfo({ amountInfo, payInfo, receiptInfos, orderNo }) {

  let sgicYn = "N";
  const [sgicUrl, setSgicUrl] = useState(null);

  const getInstallmentPeriod = (cardInfo) => {
    const { installmentPeriod, noInterest } = cardInfo;
    if (installmentPeriod === 0) {
      return '일시불';
    }
    return `${installmentPeriod}개월 할부${noInterest ? '(무)' : ''}`;
  };

  const openCredicardReceipt = (receiptInfoUrl) => {
    window.openWindow(receiptInfoUrl);
  };

  async function isSgicExistsCheck() {
    try {
      const res = await isSgicExists(orderNo);
      if (res?.data?.body) {
        return res.data.body;
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (payInfo.payType === 'VIRTUAL_ACCOUNT' && typeof amountInfo.extraData.privateAgree !== 'undefined') {
    sgicYn = amountInfo.extraData.privateAgree;

  }

  useEffect(() => {
    if (sgicYn === 'Y') {
      isSgicExistsCheck().then(r => setSgicUrl(r));
    }
  }, [sgicYn]);

  return (
    <div className="cont purchase_info">
      <h3 className="cont_tit">결제 정보</h3>
      <div className="purchase_info_inner">
        <dl className="purchase">
          <dt className="purchase_term purchase_price">총 주문금액</dt>
          <dd className="purchase_desc purchase_price">
            {toCurrencyString(amountInfo.totalProductAmt)}
            <span className="won">원</span>
          </dd>
          <dt className="purchase_term purchase_discount">할인 금액</dt>
          <dd className="purchase_desc purchase_discount">
            - {toCurrencyString(amountInfo.totalDiscountAmount)} <span className="won">원</span>
          </dd>
          <dt className="purchase_term purchase_discount_sub">프로모션 할인</dt>
          <dd className="purchase_desc purchase_discount_sub">
            - {toCurrencyString(amountInfo.promotionDiscountAmt)} <span className="won">원</span>
          </dd>
          <dt className="purchase_term purchase_discount_sub">쿠폰 사용</dt>
          <dd className="purchase_desc purchase_discount_sub">
            - {toCurrencyString(amountInfo.couponDiscountAmt)} <span className="won">원</span>
          </dd>
          <dt className="purchase_term purchase_discount_sub">마일리지 사용</dt>
          <dd className="purchase_desc purchase_discount_sub">
            - {toCurrencyString(amountInfo.mileageAmt)} <span className="won">원</span>
          </dd>
          <dt className="purchase_term purchase_detail">결제 내역</dt>
          <dd className="purchase_desc purchase_detail">
            <div className="purchase_detail_price">
              {toCurrencyString(amountInfo.payAmt)} <span className="won">원</span>
            </div>
            {/* 결제정보 현금 */}
            {payInfo.payType === 'VIRTUAL_ACCOUNT' && (
              <>
                <div className="purchase_detail_method">
                  가상 계좌 : {payInfo.bankInfo.bankName}({payInfo.bankInfo.account})
                </div>

                {(sgicYn === 'Y' && typeof sgicUrl === 'string' && sgicUrl !== '')? (
                    <a href={sgicUrl} target="_blank" className="button button_negative button-s">보증보험 조회하기</a>
                ) : (
                  <button
                  type="button"
                  className="button button_negative button-s"
                  disabled
                  >
                  보증보험 신청중
                  </button>
                  )}
              </>
            )}
            {payInfo.payType === 'CREDIT_CARD' && (
              <>
                <div className="purchase_detail_method">
                  {payInfo.cardInfo.cardName} / {getInstallmentPeriod(payInfo.cardInfo)}
                </div>
                <button
                  type="button"
                  className="button button_negative button-s"
                  onClick={() => openCredicardReceipt(receiptInfos[0].url)}
                >
                  신용카드 영수증
                </button>
              </>
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
}
