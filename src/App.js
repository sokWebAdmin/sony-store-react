import React, { useState, useEffect } from 'react';
import { Switch, useLocation, Route } from 'react-router-dom';

//Component
import Header from './components/Header';
import Footer from './components/Footer';

//main
import Main from './pages/Main/Main';

//product
import ProductList from './pages/Products/ProductList';
import DetailList from './pages/Products/DetailList';
import ProductView from './pages/Products/ProductView';

//recommend
import Recommend from './pages/recommend/Recommend';

//error
import Error404 from './pages/error/error404';
import ErrorServer from './pages/error/errorServer';

//고객지원
import Agreement from './pages/support/agreement';
import Faq from './pages/support/board/faq';
import NoticeDetail from './pages/support/board/notice/detail';
import Notice from './pages/support/board/notice';
import purchaseConsulting from './pages/support/purchaseConsulting';
import StoreInfo from './pages/support/storeInfo';
import videoCourse from './pages/support/videoCourse';

//마이페이지
import myPageMain from './pages/mypage/myPageMain';
import MyPageMember from './pages/mypage/MyPageMember';
import orderDetail from './pages/mypage/orderDetail';
import orderList from './pages/mypage/orderList';
import rename from './pages/mypage/rename';
import withdraw from './pages/mypage/withdraw';
import withdrawComplete from './pages/mypage/withdrawComplete';

//order
import orderAgree from './pages/order/orderAgree';
import orderComplete from './pages/order/orderComplete';
import cart from './pages/order/cart';
import cartEmpty from './pages/order/cartEmpty';
import orderStep1 from './pages/order/orderStep1';
import orderStep2 from './pages/order/orderStep2';
import orderStep3 from './pages/order/orderStep3';

//event
import liveon from './pages/event/liveon';
import eventList from './pages/event/eventList';
import refurbish from './pages/event/refurbish';
import employee from './pages/event/employee';
import asc from './pages/event/asc';
import refined from './pages/event/refined';

//member
import join from './pages/member/join';
import JoinAgree from './pages/member/JoinAgree';
import joinStep from './pages/member/joinStep';
import login from './pages/member/login';
import Search from "./pages/member/Search"

//footer
import policy from './pages/footer/policy';
import terms from './pages/footer/terms';
import sitemap from './pages/footer/sitemap';

//api

//검색
import SearchResult from './pages/footer/searchResult';
import EspMain from './pages/esp/EspMain';
import EspList from './pages/esp/EspList';
import { fetchMallInfo, useMallDispatch, useMallState } from './context/mall.context';

const App = (props) => {
  const dispatch = useMallDispatch();
  const state = useMallState();

  useEffect(() => {
    if (state?.mall) return;
    fetchMallInfo(dispatch);
  }, [dispatch, state?.mall]);


  let location = useLocation();

  const [isStatus, setIsStatus] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = (e) => {
    // console.log(e.target.scrollingElement.scrollTop)
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" onScroll={handleScroll}>
      {isStatus ? (
        <div className="wrapper" style={{ backgroundColor: 'white' }}>
          <div id="skipnav" className="skipnav">
            <a href="#container"><span>본문 바로가기</span></a>
          </div>
          {/* 헤더 */}
          <Header />
            <Switch>
              {/* 메인 */}
              <Route exact path="/" component={Main} />
              <Route exact path="/main" component={Main} />

              {/* 상품목록 */}
              <Route exact path="/products/:type" component={ProductList} />

              {/* 세부분류 상품목록 */}
              <Route exact path="/products/:type/:detail_type" component={DetailList} />

              {/* 추천상품 */}
              <Route exact path="/recommend" component={Recommend} />

              {/* esp */}
              <Route exact path="/esp" component={EspMain} />
              <Route exact path="/esp/list" component={EspList} />

              {/* 고객지원  */}
              <Route exact path="/agreement" component={Agreement} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/notice" component={Notice} />
              <Route exact path="/notice/:articleNo" from="detail" component={NoticeDetail} />
              <Route exact path="/purchase-consulting" component={purchaseConsulting} />
              <Route exact path="/store-info" component={StoreInfo} />
              <Route exact path="/video-course" component={videoCourse} />

              {/* 마이페이지  */}
              <Route exact path="/my-page" component={myPageMain} />
              <Route exact path="/my-page/member" component={MyPageMember} />
              <Route exact path="/my-page/order-detail" component={orderDetail} />
              <Route exact path="/my-page/order-list" component={orderList} />
              <Route exact path="/my-page/rename" component={rename} />
              <Route exact path="/my-page/withdraw" component={withdraw} />
              <Route exact path="/my-page/withdraw-complete" component={withdrawComplete} />

              {/* 상품 상세페이지 */}
              <Route exact path="/product-view/:productNo" component={ProductView} />

              {/* 주문 */}
              <Route exact path="/order/agree" component={orderAgree} />
              <Route exact path="/order/complete" component={orderComplete} />
              <Route exact path="/cart" component={cart} />
              <Route exact path="/cart-empty" component={cartEmpty} />
              <Route exact path="/order/step/1" component={orderStep1} />
              <Route exact path="/order/step/2" component={orderStep2} />
              <Route exact path="/order/step/3" component={orderStep3} />

              {/* 이벤트  */}
              <Route exact path="/event/live-on" component={liveon} />
              <Route exact path="/event/list" component={eventList} />
              <Route exact path="/event/refurbish" component={refurbish} />
              <Route exact path="/event/employee" component={employee} />
              <Route exact path="/event/asc" component={asc} />
              <Route exact path="/event/refined" component={refined} />

              {/* member  */}
              <Route exact path="/member/join" component={join} />
              <Route exact path="/member/join-agree" component={JoinAgree} />
              <Route exact path="/member/joinStep" component={joinStep} />
              <Route exact path="/member/login" component={login} />
              <Route exact path="/member/search" component={Search} />

              {/* Footer  */}
              <Route exact path="/footer/policy" component={policy} />
              <Route exact path="/footer/terms" component={terms} />
              <Route exact path="/footer/sitemap" component={sitemap} />

              {/* error */}
              <Route exact path="/404" component={Error404} />
              <Route exact path="/error-server" component={ErrorServer} />

              {/* 검색 결과  */}
              <Route exact path="/search-result/:keyword" component={SearchResult} />

              <Route component={Error404} />
              {/* 푸터 */}
            </Switch>
          <Footer />
        </div>
      ) : (
        <div>Server Loading...</div>
      )}
    </div>
  );
};

export default App;
