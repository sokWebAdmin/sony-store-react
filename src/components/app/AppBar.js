import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// images
import arrow from '../../assets/images/app/btn_arrow.svg';
import home from '../../assets/images/app/btn_home.svg';

const AppBar = ({ agent }) => {
  const init = () => {
    console.log(agent);
  };

  useEffect(init, []);

  return (
    <div className="appnavbar">
      <div className="appnavbar_inner">
        {agent.device === 'android' &&
        <>
          {/* test */}
          <GoBackButton />
          <HomeButton />
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

const GoBackButton = () => {
  const history = useHistory();

  const goBack = evt => {
    evt.preventDefault();
    history.goBack();
  };

  // ios
  return (
    <Link href="#" onClick={goBack} className="appnavbar_btn">
      <img src={arrow} alt="뒤로 가기" />
    </Link>
  );
};

const HomeButton = () => (
  <Link to="/" className="appnavbar_btn">
    <img src={home} alt="홈" />
  </Link>
);

export default AppBar;
