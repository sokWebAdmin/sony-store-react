// import { useEffect, useState, useContext, useRef } from 'react';

// 배송지 정보
const DiscountForm = prop => {
  console.log(prop);

  return (
    <div className="acc_form">
      <div className="acc_cell vat">
        <label htmlFor="coupon">쿠폰</label>
      </div>
      <div className="acc_cell">
        <div className="acc_group">
          <div className="acc_inp disable_type">
            <input type="text" id="coupon"
                   className="inp" defaultValue={3000}
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
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="mileage">멤버십 마일리지</label>
        </div>
        <div className="acc_cell parent">
          <div className="acc_group">
            <div className="acc_inp disable_type">
              <input type="text" id="mileage"
                     className="inp"
                     placeholder="0" /><span
              className="unit">점</span>
              <span className="focus_bg" />
            </div>
            <div className="acc_btn_box">
              <button
                className="button button_negative button-s"
                type="button">모두 사용
              </button>
              <span
                className="my_point">(<em>800,000 M</em> 보유)</span>
            </div>
          </div>
          <p className="membership_info">* 멤버십 마일리지는 최소
            5,000점 부터 사용 가능합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;