import React, {useState, useContext, useEffect} from "react";
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

//context
import GlobalContext from '../context/global.context';

//utils
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const [sideBarOpen, setMobileSideBarOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const {shopByToken, onChangeGlobal} = useContext(GlobalContext)

    useEffect(()=>{
      console.log("token Changed")
      console.log(shopByToken)
      if(shopByToken){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
    },[shopByToken])
  return (
    <>
      <header id="header" className={`header ${sideBarOpen == true && "header--active"}`}>
        <div className="header__wrapper">
            <h1 className="header__logo"><a href="/"><img src={logo} alt="SONY" /></a></h1>
            <div className="header__menu">
                <button className="btn btn__mo__hidden btn__search" onClick={()=>{
                  setSearchOpen(true)
                }}><img src={search} alt="검색창 열기" /></button>
                <a href="#" className="btn btn__desktop btn__mypage"><img src={mypage} alt="마이페이지" onClick={()=>{
                  setInfoOpen(!isInfoOpen)
                }} /></a>
                <a href="/cart" className="btn btn__cart"><img src={cart} alt="장바구니" /></a>
                <button type="button" className="btn btn__mo btn__menu__open" onClick={()=>{
                  setMobileSideBarOpen(true)
                }}><img src={menu} alt="메뉴 열기" /></button>
                <button type="button" className="btn btn__mo btn__mo__hidden btn__menu__close" onClick={()=>{
                  setMobileSideBarOpen(false)
                }}><img src={close} alt="메뉴 닫기" /></button>
            </div>
        
            <div className="header__inner">
  
            {/* 비회원/로그인 전 */}
            {
              isLoggedIn === false &&
              <>
              <div className={`member ${isInfoOpen && "member--visible"}`}>
            <div className="member__inner">
                <a href="/member/login" className="member__msg member__msg__login">로그인이<br />필요합니다</a>
                <button type="button" className="btn btn__login" onClick={()=>{
                  history.push("/member/login")
                  setInfoOpen(false);
                }}>로그인</button>
                <div className="member__menu">
                <ul>
                    <li className="member__menu__mypage"><a href="/member/join">회원가입</a></li>
                    <li className="member__menu__order"><a href="/my-page/order-list">주문/배송 조회</a></li>
                    <li className="member__menu__cart"><a href="/cart">장바구니<span className="badge">99</span></a></li>
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
                      setInfoOpen(false)
                      onChangeGlobal({shopByToken:""})
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