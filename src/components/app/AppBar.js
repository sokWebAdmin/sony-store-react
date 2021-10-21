import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  useHeaderState,
  useHeaderDispatch,
  openSideBar,
  closeSideBar,
} from '../../context/header.context';

// images
import arrow from '../../assets/images/app/btn_arrow.svg';
import home from '../../assets/images/app/btn_home.svg';
import menu from '../../assets/images/app/btn_menu.svg';

const AppBar = ({ agent }) => {
  const init = () => {
    console.log(agent);
  };

  useEffect(init, []);

  return (
    <div className="appnavbar" style={{ zIndex: 998 }}>
      <div className="appnavbar_inner">
        {agent.device === 'android' &&
        <>
          {/* test */}
          <GoBackButton />
          <HomeButton />
          <MenuButton />
        </>
        }
        {
          agent.device === 'ios' &&
          <>
            <GoBackButton />
            <HomeButton />
          </>
        }


        {/*<a href="#" className="appnavbar_btn android"><img*/}
        {/*  src="/dist/images/app/btn_menu.svg" alt="메뉴" /></a>*/}
        {/*<a href="#" className="appnavbar_btn"><img*/}
        {/*  src="/dist/images/app/btn_cart.svg" alt="장바구니" /></a>*/}
        {/*<a href="#" className="appnavbar_btn"><img*/}
        {/*  src="/dist/images/app/btn_shipping.svg" alt="주문/배송" /></a>*/}
        {/*<a href="#" className="appnavbar_btn"><img*/}
        {/*  src="/dist/images/app/btn_my.svg" alt="마이메뉴" /></a>*/}
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
    <Link href="#" onClick={goBack} className="appnavbar_btn">
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
    <a href="#menu" onClick={toggle} className="appnavbar_btn">
      <img src={menu} alt="메뉴" />
    </a>
  );
};

export default AppBar;
