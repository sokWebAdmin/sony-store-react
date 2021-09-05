import { useState } from "react";

export default function CountBox({ maxCount, changedCount }) {
  const [ count, setCount ] = useState(1);

  const onMinusClickHandler = event => {
    event.preventDefault();

    if (count <= 1) {
      alert('한개 이상 선택되어야 합니다.');
      return;
    }
    changedCount(count - 1);
    setCount(prev => prev - 1);
  }

  const onPlusClickHandler = event => {
    event.preventDefault();
    
    if (count >= maxCount) {
      alert("최대 구매 가능 갯수를 초과합니다.");
      return;
    }
    changedCount(count + 1);
    setCount(prev => prev + 1);
  }

  const onChangeHandler = ({ target }) => {
    const number = Number(target.value);
    setCount(number > 1 ? number : 1);
  }

  const onBlurHandler = ({ target }) => {
    let customCount = !target?.value ? 0 : Number(target.value);
    
    if (customCount < 1) {
      alert('한개 이상 선택되어야 합니다.');
      customCount = 1;
    } else if (customCount > maxCount) {
      alert("최대 구매 가능 갯수를 초과합니다.");
      customCount = maxCount;
    } 
    setCount(customCount);
    changedCount(customCount);
  }


  return (
    <div className="count_box">
      <button className="minus" onClick={ onMinusClickHandler }>감소</button>
      <input type="text" value={ count } className="count" onChange={onChangeHandler} onBlur={ onBlurHandler } />
      <button className="plus" onClick={ onPlusClickHandler }>증가</button>
    </div>
  )
}