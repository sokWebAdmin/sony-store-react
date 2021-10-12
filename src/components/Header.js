import React, { useState, useContext, useEffect, useRef } from 'react';

//images
import logo from '../assets/images/common/logo.svg';
import search from '../assets/images/common/ic_search.svg';
import mypage from '../assets/images/common/ic_mypage.svg';
import cart from '../assets/images/common/ic_cart.svg';
import menu from '../assets/images/common/ic_menu.svg';
import close from '../assets/images/common/ic_close.svg';

//component
import Gnb from './Gnb';
import Search from './Search';
import CartCount from './cart/CartCount';

//context
import GlobalContext from '../context/global.context';
import { useHeaderDispatch, useHeaderState, openSideBar, closeSideBar } from '../context/header.context';

//utils
import { Link, useHistory } from 'react-router-dom';
import { removeAccessToken } from '../utils/token';
import { resetProfile, useProfileState, useProileDispatch } from '../context/profile.context';
import { useClickOutside, useScroll } from '../hooks';

export default function Header (location) {
  const history = useHistory();
  const { onChangeGlobal, isLogin } = useContext(GlobalContext);
  const { profile, my } = useProfileState();
  const { isSiderbarOpen } = useHeaderState();
  const profileDispatch = useProileDispatch();
  const headerDispatch = useHeaderDispatch();

  const [visible, setVisible] = useState(true);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const { scrollY } = useScroll();

  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);

  const header = useRef();

  useEffect(() => {
    const menuOpen = history.location.state?.menuOpen;
    menuOpen && openSideBar(headerDispatch);
  }, [location]);

  useEffect(() => {
    if (prevScrollY > window.scrollY || header.current.offsetHeight >
      window.scrollY) {
      setVisible(true);
    }
    else {
      setVisible(false);
    }

    setPrevScrollY(window.scrollY);
  }, [scrollY]);

  const closeSubSlider = () => {
    setInfoOpen(false);
    closeSideBar(headerDispatch);
  };

  useEffect(() => {
    const $body = document.querySelector('body');
    $body.setAttribute('style', isSearchOpen ? 'overflow: hidden' : 'overflow: auto');
    !isSearchOpen && closeSubSlider();
  }, [isSearchOpen]);

  const sideRef = useRef(null);
  useClickOutside(sideRef, () => isInfoOpen && setInfoOpen(false));

  return (
    <>
      <header ref={ header } id="header" className={`header ${visible ?'header--visible' : 'header--invisible'} ${isSiderbarOpen ? 'header--active' : ''} ${ isSearchOpen ? 'header--search' : '' }`}>
        <div className="header__wrapper">
          <h1 className="header__logo">
            <Link to="/">
              <img src={logo} alt="SONY" />
            </Link>
          </h1>
          <div className="header__menu">
            <button
              className="btn btn__mo__hidden btn__search"
              onClick={() => {
                setSearchOpen(true);
              }}
            >
              <img src={search} alt="검색창 열기" />
            </button>
            <a href="#" className="btn btn__desktop btn__mypage" onClick={e => {
              e.preventDefault();
              setInfoOpen(!isInfoOpen);
            }}>
              <img src={mypage} alt="마이페이지" />
            </a>
            <a href="#" className="btn btn__cart" onClick={e => {
              e.preventDefault();
              history.push('/cart');
            }}>
              <img src={cart} alt="장바구니" />
            </a>
            <button
              type="button"
              className="btn btn__mo btn__menu__open"
              onClick={() => {
                openSideBar(headerDispatch);
              }}
            >
              <img src={menu} alt="메뉴 열기" />
            </button>
            <button
              type="button"
              className="btn btn__mo btn__mo__hidden btn__menu__close"
              onClick={() => {
                closeSideBar(headerDispatch);
              }}
            >
              <img src={close} alt="메뉴 닫기" />
            </button>
          </div>

          <div className="header__inner">
            {/* 비회원/로그인 전 */}
            {!isLogin && (
              <>
                <div ref={sideRef} className={`member ${isInfoOpen && 'member--visible'}`}>
                  <div className="member__inner">
                    <Link to="/member/login" onClick={closeSubSlider} className="member__msg member__msg__login">
                      로그인이
                      <br />
                      필요합니다
                    </Link>
                    <button
                      type="button"
                      className="btn btn__login"
                      onClick={() => {
                        history.push('/member/login');
                        setInfoOpen(false);
                      }}
                    >
                      로그인
                    </button>
                    <div className="member__menu">
                      <ul>
                        <li className="member__menu__mypage">
                          <Link to="/member/join" onClick={closeSubSlider}>
                            회원가입
                          </Link>
                        </li>
                        <li className="member__menu__order">
                          <Link to={isLogin ? '/my-page/order-list' : '/member/login'} onClick={closeSubSlider}>
                            주문/배송 조회
                          </Link>
                        </li>
                        <li className="member__menu__cart">
                          <Link to="/cart" onClick={closeSubSlider}>
                            장바구니<span className="badge"><CartCount
                            isOpened={isSiderbarOpen} /></span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 회원/로그인 */}
            {isLogin && (
              <>
                <div ref={sideRef} className={`member ${isInfoOpen && 'member--visible'}`}>
                  <div className="member__inner">
                    <p className="member__msg">
                      {my?.firstname ?? profile?.memberName}님<br />
                      안녕하세요!
                    </p>
                    <div className="member__menu">
                      <ul>
                        <li className="member__menu__mypage">
                          <Link to="/my-page" onClick={closeSubSlider}>
                            마이페이지
                          </Link>
                        </li>
                        <li className="member__menu__order">
                          <Link to={isLogin ? '/my-page/order-list' : '/member/login'} onClick={closeSubSlider}>
                            주문/배송 조회
                          </Link>
                        </li>
                        <li className="member__menu__cart">
                          <Link to="/cart" onClick={closeSubSlider}>
                            장바구니<span className="badge">
                            <CartCount isOpened={isSiderbarOpen} />
                          </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="btn btn__logout"
                      onClick={() => {
                        setInfoOpen(false);
                        removeAccessToken();
                        onChangeGlobal({ isLogin: false });
                        resetProfile(profileDispatch);
                        closeSubSlider();
                        history.push('/');
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </>
            )}

            <Gnb />

            {/* 앱 전용 메뉴 */}
            <div className="appmenu">
              <ul>
                <li className="appmenu__qr">
                  <a>QR스캔</a>
                </li>
                <li className="appmenu__setting">
                  <a>설정</a>
                </li>
              </ul>
            </div>
          </div>
          {/* 검색 */}
          {isSearchOpen === true && <Search setSearchOpen={setSearchOpen} />}
          {/* 검색 */}
        </div>
      </header>
    </>
  );
}
