import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Switch, useLocation, Route, useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

//Component
import Header from './components/Header';
import Footer from './components/Footer';

//main
import Main from './pages/Main/Main';

//product
import Category from './pages/products/Category';
import ProductView from './pages/products/ProductView';

//recommend
import Recommend from './pages/recommend/Recommend';
import Curation from './pages/recommend/Curation';

//error
import Error404 from './pages/error/error404';
import ErrorServer from './pages/error/errorServer';

//고객지원
import Agreement from './pages/support/agreement';
import Faq from './pages/support/board/Faq';
import NoticeDetail from './pages/support/board/notice/Detail';
import Notice from './pages/support/board/Notice';
import purchaseConsulting from './pages/support/purchaseConsulting';
import StoreInfo from './pages/support/storeInfo';
import videoCourse from './pages/support/videoCourse';

//마이페이지
import myPageMain from './pages/mypage/MyPageMain';
import MyPageMember from './pages/mypage/MyPageMember';
import orderDetail from './pages/mypage/orderDetail';
import orderList from './pages/mypage/orderList';
import OldOrderList from './pages/mypage/OldOrderList';
import Rename from './pages/mypage/myPageMember/Rename';
import Withdraw from './pages/mypage/Withdraw';
import WithdrawComplete from './pages/mypage/WithdrawComplete';

//order
import Cart from './pages/order/Cart';

import ResultParse from './pages/order/ResultParse';
import OrderAgree from './pages/order/OrderAgree';
import OrderComplete from './pages/order/OrderComplete';
import OrderFail from './pages/order/OrderFail';
import OrderSheet from './pages/order/OrderSheet';
import GiftReceive from './pages/order/GiftReceive';

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
import Search from './pages/member/Search';
import InactiveAccounts from './pages/member/inactiveAccounts';
import ActiveAccounts from './pages/member/activeAccounts';
import LockedAccounts from './pages/member/lockedAccounts';
import OpenLogin from './components/member/OpenLogin';

// app
import PushList from './pages/app/PushList';

//footer
import Policy from './pages/footer/policy';
import Terms from './pages/footer/terms';
import SiteMap from './pages/footer/SiteMap';

//api

//검색
import SearchResult from './pages/footer/SearchResult';
import EspMain from './pages/esp/EspMain';
import EspList from './pages/esp/EspList';
import { fetchMallInfo, useMallDispatch, useMallState } from './context/mall.context';
import GlobalContext from './context/global.context';
import {
  fetchMyProfile,
  fetchProfile,
  resetProfile,
  setProfile,
  useProfileState,
  useProileDispatch,
} from './context/profile.context';
import Benefit from './pages/membership/Benefit';
import { initCategory, useCategoryDispatch } from './context/category.context';
import Only from './pages/event/Only';
import PreOrder from './pages/event/PreOrder';
import BenefitZone from './pages/event/BenefitZone';
import Expired from './pages/event/Expired';
import EventDetail from './pages/event/EventDetail';
import { getProfile } from './api/member';
import Callback from './pages/member/Callback';
import { getAgent } from './utils/detectAgent';

const App = (props) => {
  const agent = getAgent();
  const history = useHistory();

  const dispatch = useMallDispatch();
  const state = useMallState();
  const { isLogin } = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();
  const { my, profile } = useProfileState();

  const categoryDispatch = useCategoryDispatch();

  useEffect(() => {
    if (state?.mall) return;
    fetchMallInfo(dispatch);
  }, [dispatch, state?.mall]);

  const getMallInfo = async () => {
    if (window.location.pathname === '/callback' || window.location.pathname === '/member/joinStep') return;
    if (isLogin) {
      if (!profile) {
        const response = await getProfile();
        const data = { type: '30', customerid: response.data.memberId };
        setProfile(profileDispatch, response.data);
        await fetchMyProfile(profileDispatch, data);
      }
      if (profile && !my) {
        const data = { type: '30', customerid: profile.memberId };
        await fetchMyProfile(profileDispatch, data);
      }
    } else {
      resetProfile(profileDispatch);
    }
  };

  useEffect(() => {
    getMallInfo();
  }, [isLogin]);

  let location = useLocation();

  const [isStatus, setIsStatus] = useState(true);

  const syncScroll = useCallback(
    debounce((x, y, attempt) => {
      requestAnimationFrame(() => {
        if (attempt < 1) {
          return;
        }
        const { pageXOffset, pageYOffset } = window;
        if (x !== pageXOffset || y !== pageYOffset) {
          console.log(x, y);
          window.scrollTo(x, y);
          syncScroll(x, y, attempt - 1);
        }
      });
    }, 100),
    [],
  );

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const { pageXOffset, pageYOffset, location } = window;
      const { state: prevState = {} } = window.history;

      window.history.replaceState(
        {
          ...prevState,
          scroll: {
            x: pageXOffset,
            y: pageYOffset,
          },
        },
        '',
        location.href,
      );
    });
  }, []);

  useEffect(() => {
    const MAX_SYNC_ATTEMPT = 5;
    const unlisten = history.listen((location, action) => {
      const { state } = window.history;
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
      if (action === 'POP' && state && state.scroll) {
        const { x, y, attempt = MAX_SYNC_ATTEMPT } = state.scroll;
        syncScroll(x, y, attempt);
      } else {
        window.scrollTo(0, 0);
      }
    });
    return unlisten;
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!state?.categories) {
      return;
    }

    initCategory(categoryDispatch, state.categories);
  }, [state?.categories]);

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
            <Route exact path="/products/*" component={Category} />

            {/* 추천상품 */}
            <Route exact path="/recommend" component={Recommend} />
            <Route exact path="/curation" component={Curation} />

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
            <Route exact path="/my-page/old-order-list" component={OldOrderList} />
            <Route exact path="/my-page/rename" component={Rename} />
            <Route exact path="/my-page/withdraw" component={Withdraw} />
            <Route exact path="/my-page/withdraw-complete"
                   component={WithdrawComplete} />

            {/* 상품 상세페이지 */}
            <Route exact path="/product-view/:productNo"
                   component={ProductView} />

            {/* 주문 */}
            <Route exact path="/order/agree" component={OrderAgree} />

            <Route exact path="/order/parse" component={ResultParse} />
            <Route exact path="/order/complete" component={OrderComplete} />
            <Route exact path="/order/fail" component={OrderFail} />

            <Route exact path="/cart" component={Cart} />

            <Route exact path="/order/sheet" component={OrderSheet} />
            <Route exact path="/gift/sheet" component={OrderSheet} />
            <Route exact path="/gift/receive" component={GiftReceive} />

            {/* 이벤트  */}
            <Route exact path="/event/list" component={eventList} />
            <Route exact path="/event/only/:eventNo"
                   component={EventDetail} />
            <Route exact path="/event/detail/:eventNo"
                   component={EventDetail} />
            <Route exact path="/event/expired" component={Expired} />
            {/*<Route exact path="/event/benefit-zone"*/}
            {/*       component={BenefitZone} />/!*현재 데이터 없음*!/*/}
            {/*<Route exact path="/event/pre-order"*/}
            {/*       component={PreOrder} />/!*현재 데이터 없음*!/*/}
            <Route exact path="/event/asc/:eventNo" component={asc} />
            <Route exact path="/event/refined/:eventNo" component={refined} />
            <Route exact path="/event/live-on/:eventNo" component={liveon} />
            <Route exact path="/event/refurbish/:eventNo" component={refurbish} />
            <Route exact path="/event/employee/:eventNo" component={employee} />

            {/* 멤버쉽 */}
            <Route exact path="/membership/benefit" component={Benefit} />

            {/* member  */}
            <Route exact path="/member/join" component={join} />
            <Route exact path="/member/join-agree" component={JoinAgree} />
            <Route exact path="/member/joinStep" component={joinStep} />
            <Route exact path="/member/login" component={login} />
            <Route exact path="/member/search" component={Search} />
            <Route exact path="/member/inactiveAccounts"
                   component={InactiveAccounts} />
            <Route exact path="/member/activeAccounts"
                   component={ActiveAccounts} />
            <Route exact path="/member/lockedAccounts"
                   component={LockedAccounts} />
            <Route exact path="/callback" component={Callback} />

            {/* app */}
            {
              agent.isApp &&
              <>
                <Route exact path="/app/push-list" component={PushList} />
              </>
            }

            {/* 검색 결과  */}
            <Route exact path="/search-result/:keyword"
                   component={SearchResult} />

            {/* Footer  */}
            <Route exact path="/footer/policy" component={Policy} />
            <Route exact path="/footer/terms" component={Terms} />
            <Route exact path="/footer/sitemap" component={SiteMap} />

            {/* error */}
            <Route exact path="/404" component={Error404} />
            <Route exact path="/error-server" component={ErrorServer} />

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
