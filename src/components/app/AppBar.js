import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  useHeaderState,
  useHeaderDispatch,
  openSideBar,
  closeSideBar,
} from '../../context/header.context';

// style
import '../../assets/scss/partials/appBar.scss';

// images
import arrow from '../../assets/images/app/btn_arrow.svg';
import home from '../../assets/images/app/btn_home.svg';
import menu from '../../assets/images/app/btn_menu.svg';
import cart from '../../assets/images/app/btn_cart.svg';
import shipping from '../../assets/images/app/btn_shipping.svg';
import my from '../../assets/images/app/btn_my.svg';

const AppBar = ({ location, agent, scrollAction, y }) => {
  const scrollExceptions = useMemo(() => {
    console.log(location)
  },[location])


  const scrollStyle = useMemo(() => {
    if (scrollAction === 'up' || y <= 50) {
      return {
        transform: 'translateY(0)',
      };
    }

    if (scrollAction === 'down') {
      console.log(scrollExceptions)
      return {
        transform: 'translateY(100%)',
      };
    }

  }, [y, scrollAction]);

  return (
    <div className="appnavbar" style={{ ...scrollStyle, zIndex: 998 }}>
      <div className="appnavbar_inner">
        {agent.device === 'ios' && <GoBackButton />}
        <HomeButton />
        <MenuButton />
        <CartButton />
        <OrderListButton />
        <MyPageButton />
      </div>
    </div>
  );
};

/**
 * buttons
 */

// ios
const GoBackButton = () => {
  const history = useHistory();

  const goBack = evt => {
    evt.preventDefault();
    history.goBack();
  };

  return (
    <Link to="#goBack" onClick={goBack} className="appnavbar_btn">
      <img src={arrow} alt="뒤로 가기" />
    </Link>
  );
};

// all
const HomeButton = () => (
  <Link to="/" className="appnavbar_btn">
    <img src={home} alt="홈" />
  </Link>
);

// android
const MenuButton = () => {
  const headerDispatch = useHeaderDispatch();
  const { isSiderbarOpen } = useHeaderState();

  const toggle = () =>
    isSiderbarOpen ? closeSideBar(headerDispatch) : openSideBar(headerDispatch);

  return (
    <a href="#header" onClick={toggle} className="appnavbar_btn">
      <img src={menu} alt="메뉴" />
    </a>
  );
};

const CartButton = () => (
  <Link to="/cart" className="appnavbar_btn">
    <img src={cart} alt="장바구니" />
  </Link>
);

const OrderListButton = () => {
  return (
    <Link to="/my-page/order-list" className="appnavbar_btn">
      <img src={shipping} alt="주문/배송" />
    </Link>
  );
};

const MyPageButton = () => {
  return (
    <Link to="/my-page" className="appnavbar_btn">
      <img src={my} alt="마이메뉴" />
    </Link>
  );
};

export default AppBar;
