import React from 'react';

const Header = () => {
  return (
    <>
      <h2 className="order_box__tit">장바구니</h2>
      <ol className="order_box__list">
        <li className="on">
          <i className="step_ico cart" />
          <p>장바구니</p>
        </li>
        <li>
          <i className="step_ico order" />
          <p>주문·결제</p>
        </li>
        <li>
          <i className="step_ico confirm" />
          <p>주문 완료</p>
        </li>
      </ol>
    </>
  );
};

export default Header;