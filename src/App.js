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

            {!window.location.pathname.includes("product-view") ?
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
                  {/* 푸터 */}
                  <Footer />
                </div>
                </>
            :
            <>
              {/* 헤더 */}
              <Header />
              {/* 상품 상세페이지 */}
              <Route exact path="/product-view/:product_no" component={ProductView} />
              {/* 푸터 */}
              <Footer />
          </>
            }
           
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
