import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

//images
import logo from "../assets/images/common/logo.svg";
import search from "../assets/images/common/ic_search.svg";
import mypage from "../assets/images/common/ic_mypage.svg";
import cart from "../assets/images/common/ic_cart.svg";
import menu from "../assets/images/common/ic_menu.svg";
import close from "../assets/images/common/ic_close.svg";

//component
import Gnb from "./Gnb";
import Search from "./Search";

export default function Header() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const onClickLogout = () => {
    Cookies.remove("shopByToke n");
    window.history.go("/");
  };

  return (
    <>
      <header id="header" className="header">
        <div className="header__wrapper">
            <h1 className="header__logo"><a href="/"><img src={logo} alt="SONY" /></a></h1>
            <div className="header__menu">
                <button className="btn btn__mo__hidden btn__search" onClick={()=>{
                  setSearchOpen(true)
                }}><img src={search} alt="검색창 열기" /></button>
                <a href="#" className="btn btn__desktop btn__mypage"><img src={mypage} alt="마이페이지" onClick={()=>{
                  setInfoOpen(!isInfoOpen)
                }} /></a>
                <a href="cart" className="btn btn__cart"><img src={cart} alt="장바구니" /></a>
                <button type="button" className="btn btn__mo btn__menu__open"><img src={menu} alt="메뉴 열기" /></button>
                <button type="button" className="btn btn__mo btn__mo__hidden btn__menu__close"><img src={close} alt="메뉴 닫기" /></button>
            </div>
        
            <div className="header__inner">
  
            {/* 비회원/로그인 전 */}
            {
              isLoggedIn === false &&
              <>
              <div className={`member ${isInfoOpen && "member--visible"}`}>
            <div className="member__inner">
                <a href="#" className="member__msg member__msg__login">로그인이<br />필요합니다</a>
                <button type="button" className="btn btn__login" onClick={()=>{
                  window.location.href="/member/login"
                }}>로그인</button>
                <div className="member__menu">
                <ul>
                    <li className="member__menu__mypage"><a href="/member/join">회원가입</a></li>
                    <li className="member__menu__order"><a href="/my-page/order-list">주문/배송 조회</a></li>
                    <li className="member__menu__order"><a href="#" onClick={()=>{setLoggedIn(true)}}>임시)로그인 모드</a></li>
                    <li className="member__menu__cart"><a href="/order/cart.html">장바구니<span className="badge">99</span></a></li>
                </ul>
                </div>
            </div>
            </div>
              </>
            }
            
            {/* 회원/로그인 */}
            {
              isLoggedIn === true &&
              <>
              <div className={`member ${isInfoOpen && "member--visible"}`}>
                <div className="member__inner">
                    <p className="member__msg">박소니님<br />안녕하세요!</p>
                    <div className="member__menu">
                    <ul>
                        <li className="member__menu__mypage"><a href="/my-page">마이페이지</a></li>
                        <li className="member__menu__order"><a href="/my-page/order-list">주문/배송 조회</a></li>
                        <li className="member__menu__cart"><a href="/cart">장바구니<span className="badge">99</span></a></li>
                    </ul>
                    </div>
                    <button type="button" className="btn btn__logout" onClick={()=>{
                      setLoggedIn(false)
                    }}>로그아웃</button>
                </div>
                </div>
              </>
            }
            

            <Gnb />

            {/* 앱 전용 메뉴 */}
            <div className="appmenu">
            <ul>
                <li className="appmenu__qr"><a href="#">QR스캔</a></li>
                <li className="appmenu__setting"><a href="#">설정</a></li>
            </ul>
            </div>
        </div>
        {/* 검색 */}
            {
              isSearchOpen === true && <Search setSearchOpen={setSearchOpen} />
            }
      {/* 검색 */}
    </div>
  </header>
    </>
  );
}