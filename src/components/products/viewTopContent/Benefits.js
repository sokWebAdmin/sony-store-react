import { useMallState } from '../../../context/mall.context';
import { getPricePerProduct } from '../../../utils/product';
import { wonComma } from '../../../utils/utils';

// 할인 혜택
export default function Benefits({ price, accumulationUseYn }) {
  const mallInfo = useMallState();
  const discount = price.salePrice;
  // const { discount } = getPricePerProduct(price);

  const useAcc = accumulationUseYn === 'Y';
  const unit = mallInfo?.accumulationUnit;
  const nonProfit = price.accumulationRate === 0;
  const hasSpecialProfit = price.accumulationRate > 0;

  return (
    <div className="cont line">
      <p className="tit">
        {useAcc && nonProfit ? '본 상품은 적립금이 적립되지 않는 상품입니다.' : '회원별 마일리지 적립혜택 '}
        <span className="icon_question">!</span>
      </p>
      {!nonProfit && (
        <ul className="membership_rating">
          {mallInfo?.mall?.grades
            .filter(({ reserveBenefit, used }) => reserveBenefit.reserveRate > 0 && used === true)
            .map((g, idx) => {
              const UPPERCASE = g.label.toUpperCase();
              const LOWERCASE = g.label.toLowerCase();
              const _profit = useAcc && hasSpecialProfit ? price.accumulationRate : g.reserveBenefit.reserveRate;
              return (
                <li key={`${g.label}${idx}`} className={g.label === 'Membership' ? 'family' : LOWERCASE}>
                  {/* class 별 등급 색상 지정 vvip / vip / family */}
                  <span className="mark">{UPPERCASE.includes('VIP') ? UPPERCASE.split('IP')[0] : UPPERCASE}</span>
                  <div className="save_info">
                    <span className="percentage">
                      {UPPERCASE} {_profit}%
                    </span>
                    <p className="mileage">
                      <span className="num">{wonComma(discount * (_profit / 100))}</span> {unit}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
