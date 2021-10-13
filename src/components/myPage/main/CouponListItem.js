import { toCurrencyString } from '../../../utils/unit';

const CouponListItem = ({ couponIssueNo, couponName, discountRate, minSalePrice, issueYmdt, useEndYmdt, index }) => {
  const getYmd = (ymdt) => {
    return ymdt.split(' ')[0];
  };

  return (
    <CouponList index={index}>
      <div className="coupon_box">
        <span className="coupon_type">COUPON</span>
        <div className="coupon">
          <div className="coupon_head">
            <span className="coupon_no">
              No. <span className="num">{couponIssueNo}</span>
            </span>
            <p className="tit">
              {couponName} <span className="percentage">{discountRate}%</span> 할인
            </p>
            <p className="cut_txt">{toCurrencyString(minSalePrice)}원 이상 구매 시 </p>
          </div>
          <p className="expiration_txt">
            <strong>유효 기간 </strong>
            {getYmd(issueYmdt)} ~ {getYmd(useEndYmdt)}
          </p>
        </div>
      </div>
    </CouponList>
  );
};

const CouponList = ({ children, index }) => {
  return index % 2 === 0 ? <div className="coupon_list">{children}</div> : children;
};

export default CouponListItem;
