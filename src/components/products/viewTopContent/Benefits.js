import { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';

import { useMallState } from 'context/mall.context';

// 할인 혜택
const Benefits = ({ price, accumulationUseYn }) => {
    const mallInfo = useMallState();
    const discount = price.salePrice;
    const unit = mallInfo?.accumulationUnit || '';
    const nonProfit = price.accumulationRate === 0;
    const [isTouched, setIsTouched] = useState(false);

    const questionSignRef = useRef(null);

    const onQuestionMarkMouseOver = () => {
        if (questionSignRef.current !== null) {
            questionSignRef.current.style.display = 'block';
        }
    };

    const onQuestionMarkMouseLeave = () => {
        if (questionSignRef.current !== null) {
            questionSignRef.current.style.display = 'none';
        }
    };

    const onQuestionMarkTouchStart = () => setIsTouched((prev) => !prev);

    const onQuestionMarkTouchEnd = () => {
        if (questionSignRef.current !== null) {
            questionSignRef.current.style.display = isTouched
                ? 'block'
                : 'none';
        }
    };

    return (
        <div className='cont line'>
            <p className='tit'>
                {nonProfit
                    ? '본 상품은 마일리지가 적립되지 않는 상품입니다.'
                    : '회원별 마일리지 적립혜택 '}
                <span
                    class='icon_question'
                    onMouseOver={onQuestionMarkMouseOver}
                    onMouseLeave={onQuestionMarkMouseLeave}
                    onTouchStart={onQuestionMarkTouchStart}
                    onTouchEnd={onQuestionMarkTouchEnd}
                >
                    !
                </span>
            </p>
            <div class='question_sign' ref={questionSignRef}>
                <p class='sign_txt'>
                    회원 등급별 기본으로 적립되는 마일리지 혜택과&nbsp;
                    <br class='mo_none' />
                    이벤트를 통해 지급되는 마일리지는 상이할 수 있습니다.
                </p>
            </div>
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
};

Benefits.propTypes = {
    price: PropTypes.object.isRequired,
    accumulationUseYn: PropTypes.string,
};

export default memo(Benefits);
