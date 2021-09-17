import { toCurrencyString } from '../../../utils/unit';

const TotalAmount = ({ productCount, amount }) => {
  return (
    <div className="col_table_foot">
      <div className="prd_summary">
        <span className="prd_summary_length">결제 예정 금액 (총 {productCount}개)</span>
        <span className="prd_summary_price">{toCurrencyString(
          amount.buyAmt)}<span
          className="won">원</span></span>
        <p className="prd_summary_warning">* 최종 결제금액은 고객님의 <span
          className="mo_block">쿠폰 / 마일리지 적용에 따라 달라질 수 있습니다.</span></p>
      </div>
    </div>
  );
};

export default TotalAmount;