import { toCurrencyString } from '../../../utils/unit';

const CouponListItem = ({ couponIssueNo, couponName, discountRate, minSalePrice, issueYmdt, useEndYmdt }) => {
  const getYmd = (ymdt) => {
    return ymdt.split(' ')[0];
  };

  return (
    <div className="coupon_box">
      <span className="coupon_type">COUPON</span>
      <div className="coupon">
        <div className="coupon_head">
          <span className="coupon_no">
            No. <span className="num">{couponIssueNo}</span>
          </span>
          <p className="tit">
            <span dangerouslySetInnerHTML={{ __html: couponName }} />
            <span className="percentage">{discountRate}%</span> 할인
          </p>
          <p className="cut_txt">{toCurrencyString(minSalePrice)}원 이상 구매 시 </p>
        </div>
        <p className="expiration_txt">
          <strong>유효 기간 </strong>
          {getYmd(issueYmdt)} ~ {getYmd(useEndYmdt)}
        </p>
      </div>
    </div>
  );
};

export default CouponListItem;
