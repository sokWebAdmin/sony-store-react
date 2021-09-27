import React, { useState, useMemo, useEffect } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/css/mypage.css';

//utils
import MemberSummary from '../../components/myPage/main/MemberSummary';
import BToBBanners from '../../components/myPage/main/BToBBanners';
import OrderSummary from '../../components/myPage/main/OrderSummary';
import MileageInfo from '../../components/myPage/main/MlieageList';
import CouponList from '../../components/myPage/main/CouponList';
import WishList from '../../components/myPage/main/WishList';
import {
  fetchProfile,
  fetchMyProfile,
  useProfileState,
  useProileDispatch,
} from '../../context/profile.context';

export default function MyPageMain () {
  const [viewContent, setViewContent] = useState('mileage');

  const { my, profile } = useProfileState();
  const profileDispatch = useProileDispatch();

  useEffect(async () => {
    if (!profile?.memberId) {
      await fetchProfile(profileDispatch);
    }

    if (!my && profile?.memberId) {
      await fetchMy(profile.memberId);
    }
  }, []);

  function fetchMy (customerid) {
    return fetchMyProfile(profileDispatch, { type: '30', customerid });
  }

  const availablemileage = useMemo(() => {
    return my?.availablemileage || 0;
  }, [my]);

  return (
    <>
      <SEOHelmet title={'마이페이지'} />
      <div className="contents mypage my">
        <div className="my_wrap">
          <div className="my_head">
            <h2 className="title">마이페이지</h2>
            <MemberSummary tabChange={setViewContent} profile={profile}
                           availablemileage={availablemileage} />
          </div>
          <BToBBanners />

          <div className="cont_inner">
            {profile &&
            <>
              <OrderSummary />
              {viewContent === 'mileage' &&
              <MileageInfo availablemileage={availablemileage}
                           profile={profile} />}
              {viewContent === 'coupon' && <CouponList />}
              {viewContent === 'wish' && <WishList />}
            </>
            }
          </div>
        </div>
      </div>


    </>
  );
}