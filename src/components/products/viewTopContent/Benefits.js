import { useMallState } from "../../../context/mall.context";
import { getPricePerProduct } from "../../../utils/product";
import { wonComma } from "../../../utils/utils";

// 할인 혜택
export default function Benefits({ price }) {

  const mallInfo = useMallState();

  const { discount } = getPricePerProduct(price);

  const unit = mallInfo?.accumulationUnit;
  
  return (
    <div className="cont line">
      <p className="tit">회원별 마일리지 적립혜택 <span className="icon_question">!</span></p>
      <ul className="membership_rating">
        {
          mallInfo?.mall?.grades.reverse().filter(({ reserveBenefit }) => reserveBenefit.reserveRate > 0).map((g, idx) => {
            const UPPERCASE = g.label.toUpperCase();
            const LOWERCASE = g.label.toLowerCase();
            return (
              <li key={`${g.label}${idx}`} className={g.label === 'Membership' ? 'family' : LOWERCASE}>{/* class 별 등급 색상 지정 vvip / vip / family */}
                <span className="mark">{UPPERCASE.includes('VIP') ? UPPERCASE.split('IP')[0] : UPPERCASE}</span>
                <div className="save_info">
                  <span className="percentage">{UPPERCASE} {g.reserveBenefit.reserveRate}%</span>
                  <p className="mileage"><span className="num">{wonComma(discount * (g.reserveBenefit.reserveRate/100))}</span> {unit}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}