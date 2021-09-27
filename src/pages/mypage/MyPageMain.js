import { React, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

//utils
import MemberSummary from '../../components/myPage/main/MemberSummary';
import BToBBanners from '../../components/myPage/main/BToBBanners';
import OrderSummary from '../../components/myPage/main/OrderSummary';
import MileageInfo from '../../components/myPage/main/MlieageList';
import CouponList from '../../components/myPage/main/CouponList';
import WishList from '../../components/myPage/main/WishList';

export default function MyPageMain () {
  const [viewContent, setViewContent] = useState('mileage');

  return (
    <>
      <SEOHelmet title={'마이페이지'} />
      <div className="contents mypage">
        <div className="my_wrap">
          <div className="my_head">
            <h2 className="title">마이페이지</h2>
            <MemberSummary tabChange={setViewContent} />
          </div>
          <BToBBanners />

          <div className="cont_inner">
            <OrderSummary />
            {viewContent === 'mileage' && <MileageInfo />}
            {viewContent === 'coupon' && <CouponList />}
            {viewContent === 'wish' && <WishList />}
          </div>
        </div>
      </div>


    </>
  );
}