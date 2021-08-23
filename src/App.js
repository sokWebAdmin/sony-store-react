import React, { useState, useEffect } from "react";
import { Redirect, Switch, useLocation, Route } from "react-router-dom";

//Component
import Header from './components/Header';
import Footer from './components/Footer';

//main
import Main from './pages/Main/Main';

//product
import ProductList from './pages/Products/ProductList'
import DetailList from './pages/Products/DetailList'
import ProductView from "./pages/Products/ProductView";

//recommend
import Recommend from "./pages/recommend/Recommend";

//error
import Error404 from './pages/error/error404';
import ErrorServer from "./pages/error/errorServer";

//고객지원
import Agreement from "./pages/support/agreement";
import Faq from "./pages/support/faq";
import Notice from "./pages/support/notice";
import NoticeList from "./pages/support/noticeList";
import purchaseConsulting from "./pages/support/purchaseConsulting";
import StoreInfo from "./pages/support/storeInfo";
import videoCourse from "./pages/support/videoCourse";

//마이페이지
import myPageMain from "./pages/mypage/myPageMain";
import myPageMember from "./pages/mypage/myPageMember";
import orderDetail from "./pages/mypage/orderDetail";
import orderList from "./pages/mypage/orderList";
import rename from "./pages/mypage/rename";
import withdraw from "./pages/mypage/withdraw";
import withdrawComplete from "./pages/mypage/withdrawComplete";

//order
import orderAgree from "./pages/order/orderAgree";
import orderComplete from "./pages/order/orderComplete";
import cart from "./pages/order/cart";

//api
import { sampleApi } from "./api/sample";

const App = (props) => {
  let location = useLocation();

  const [isStatus, setIsStatus] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = (e) => {
    // console.log(e.target.scrollingElement.scrollTop)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App" onScroll={handleScroll}>
      <>
        {isStatus ? (
          <Switch>

            
                <>
                <div className="wrapper" style={{backgroundColor:"white"}}>
                  <div id="skipnav" className="skipnav">
                      <a href="#container"><span>본문 바로가기</span></a>
                  </div>

                  {/* 헤더 */}
                  <Header />

                  {/* 메인 */}
                  <Route exact path="/" component={Main} />
                  <Route exact path="/main" component={Main} />

                  {/* 상품목록 */}
                  <Route exact path="/products/:type" component={ProductList} />

                  {/* 세부분류 상품목록 */}
                  <Route exact path="/products/:type/:detail_type" component={DetailList} />

                  {/* 추천상품 */}
                  <Route exact path="/recommend" component={Recommend} />


                  {/* errorServer */}
                  <Route exact path="/error-server" component={ErrorServer} />

                  {/* 고객지원  */}
                  <Route exact path="/agreement" component={Agreement} />
                  <Route exact path="/faq" component={Faq} />
                  <Route exact path="/notice" component={Notice} />
                  <Route exact path="/notice-list" component={NoticeList} />
                  <Route exact path="/purchase-consulting" component={purchaseConsulting} />
                  <Route exact path="/store-info" component={StoreInfo} />
                  <Route exact path="/video-course" component={videoCourse} />

                  {/* 마이페이지  */}
                  <Route exact path="/my-page" component={myPageMain} />
                  <Route exact path="/my-page/member" component={myPageMember} />
                  <Route exact path="/my-page/order-detail" component={orderDetail} />
                  <Route exact path="/my-page/order-list" component={orderList} />
                  <Route exact path="/my-page/rename" component={rename} />
                  <Route exact path="/my-page/withdraw" component={withdraw} />
                  <Route exact path="/my-page/withdraw-complete" component={withdrawComplete} />

                  {/* 상품 상세페이지 */}
                  <Route exact path="/product-view/:product_no" component={ProductView} />

                  {/* 주문 */}
                  <Route exact path="/order/agree" component={orderAgree} />
                  <Route exact path="/order/complete" component={orderComplete} />
                  <Route exact path="/cart" component={cart} />

                  {/* 404 */}
                  <Route exact path="/404" component={Error404} />


                  {/* 푸터 */}
                  <Footer />
                </div>
                </>
          </Switch>
        ) : (
          <>
            <div>Server Loading...</div>
          </>
        )}
      </>
    </div>
  );
};

export default App;
