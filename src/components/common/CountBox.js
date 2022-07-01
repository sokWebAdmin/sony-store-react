import { useEffect, useState } from 'react';

/**
 * CountBox
 *
 * @param initialCount?: number;
 * @param maxCount: number;
 * @param changedCount: (changedCount) => {}
 * @param errorMsg?: { min?: '', max?: '' }
 */
export default function CountBox({ initialCount, maxCount, changedCount, errorMsg }) {
  const [count, setCount] = useState(initialCount);
  
  useEffect(() => setCount(initialCount), [initialCount]);

  maxCount = 99;

  const onMinusClickHandler = (event) => {
    event.preventDefault();

    if (count <= 1) {
      alert(errorMsg.min);
      return;
    }
    changedCount(count - 1);
    setCount((prev) => prev - 1);
  };

  const onPlusClickHandler = (event) => {
    event.preventDefault();

    if (count >= maxCount) {
      alert(errorMsg.max);
      return;
    }
    changedCount(count + 1);
    setCount((prev) => prev + 1);
  };

  const onChangeHandler = ({ target }) => {
    const number = Number(target.value);
    setCount(number > 1 ? number : 1);
  };

  const onBlurHandler = ({ target }) => {
    let customCount = !target?.value ? 0 : Number(target.value);

    if (customCount < 1) {
      alert(errorMsg.min);
      customCount = 1;
    } else if (customCount > maxCount) {
      alert(errorMsg.max);
      customCount = maxCount;
    }
    setCount(customCount);
    changedCount(customCount);
  };

  return (
    <div className="count_box">
      <button className="minus" onClick={onMinusClickHandler}>
        감소
      </button>
      <input className="count" type="text" value={count} onChange={onChangeHandler} onBlur={onBlurHandler} />
      <button className="plus" onClick={onPlusClickHandler}>
        증가
      </button>
    </div>
  );
}

CountBox.defaultProps = {
  initialCount: 1,
  errorMsg: {
    min: '한개 이상 선택되어야 합니다.',
    max: '상품은 최대 99개까지 주문할 수 있습니다.',
  },
};
