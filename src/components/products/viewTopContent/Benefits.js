import { wonComma } from "../../../utils/utils";

// 할인 혜택
export default function Benefits({ price }) {
  return (
    <div className="cont line">
      <p className="tit">회원별 마일리지 적립혜택 <span className="icon_question">!</span></p>
      <ul className="membership_rating">
        <li className="vvip">{/* class 별 등급 색상 지정 vvip / vip / family */}
          <span className="mark">VV</span>
          <div className="save_info">
            <span className="percentage">VVIP 8%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.08)}</span> P</p>
          </div>
        </li>
        <li className="vip">
          <span className="mark">V</span>
          <div className="save_info">
            <span className="percentage">VIP 4%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.04)}</span> P</p>
          </div>
        </li>
        <li className="family">
          <span className="mark">M</span>
          <div className="save_info">
            <span className="percentage">MEMBERSHIP 2%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.02)}</span> P</p>
          </div>
        </li>
      </ul>
    </div>
  )
}