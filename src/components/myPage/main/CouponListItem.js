const CouponListItem = () => {
  return (
    <div className="coupon_box">
      <div className="coupon">
        <span className="coupon_no">
          No. <span className="num">3757897055</span>
        </span>
        <p className="tit">
          정품등록감사
          <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
        </p>
        <p className="cut_txt">3만원 이상 구매 시 </p>
        <p className="expiration_txt">
          <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
        </p>
      </div>
    </div>
  );
};

export default CouponListItem;
