import { useMallState } from 'context/mall.context';
import currency from 'currency.js';

// 할인 혜택
export default function Benefits({ price, accumulationUseYn }) {
    const mallInfo = useMallState();
    const discount = price.salePrice;
    const unit = mallInfo?.accumulationUnit || '';
    const nonProfit = price.accumulationRate === 0;

    return (
        <div className='cont line'>
            <p className='tit'>
                {nonProfit
                    ? '본 상품은 마일리지가 적립되지 않는 상품입니다.'
                    : '회원별 마일리지 적립혜택 '}
                <span className='icon_question'>!</span>
            </p>
            {!nonProfit && (
                <ul className='membership_rating'>
                    {mallInfo?.mall?.grades
                        .filter(
                            ({ reserveBenefit, used }) =>
                                reserveBenefit.reserveRate > 0 && used === true,
                        )
                        .reverse()
                        .map((grade, index) => {
                            const UPPERCASE = grade.label.toUpperCase();
                            const LOWERCASE = grade.label.toLowerCase();
                            const reserveRate =
                                grade.reserveBenefit.reserveRate;

                            return (
                                <li
                                    key={`${grade.label}${index}`}
                                    className={
                                        grade.label === 'Membership'
                                            ? 'family'
                                            : LOWERCASE
                                    }
                                >
                                    {/* class 별 등급 색상 지정 vvip / vip / family */}
                                    <span className='mark'>
                                        {UPPERCASE.includes('VIP')
                                            ? UPPERCASE.split('IP')[0]
                                            : UPPERCASE}
                                    </span>
                                    <div className='save_info'>
                                        <span className='percentage'>
                                            {UPPERCASE} {reserveRate}%
                                        </span>
                                        <p className='mileage'>
                                            <span className='num'>
                                                {currency(discount, {
                                                    symbol: unit,
                                                    precision: 0,
                                                    pattern: `# !`,
                                                })
                                                    .multiply(reserveRate)
                                                    .divide(100)
                                                    .format()}
                                            </span>{' '}
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