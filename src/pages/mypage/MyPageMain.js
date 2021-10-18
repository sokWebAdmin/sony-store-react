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
import { fetchProfile, fetchMyProfile, useProfileState, useProileDispatch } from '../../context/profile.context';
import { getWish } from '../../api/order';
import { isTablet } from 'react-device-detect';

const HOW_MANY_WISH = isTablet ? 9 : 8;

export default function MyPageMain() {
  const [viewContent, setViewContent] = useState('mileage');

  const { my, profile } = useProfileState();
  const profileDispatch = useProileDispatch();

  const [wishList, setWishList] = useState([]);
  const [wishCount, setWishCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const rerenderWish = () => {
    fetchWish()
      .then(({ items, totalCount }) => {
        setWishList(items);
        setWishCount(totalCount);
      })
      .catch(console.error);
  };

  useEffect(async () => {
    if (!profile?.memberId) {
      await fetchProfile(profileDispatch);
    }

    if (!my && profile?.memberId) {
      await fetchMy(profile.memberId);
    }

    rerenderWish();
  }, []);

  useEffect(() => {
    fetchWish()
      .then(({ items, totalCount }) => {
        setWishList([...wishList, ...items]);
        setWishCount(totalCount);
      })
      .catch(console.error);
  }, [pageIndex]);

  const more = () => {
    setPageIndex(pageIndex + 1);
  };

  function fetchMy(customerid) {
    return fetchMyProfile(profileDispatch, { type: '30', customerid });
  }

  async function fetchWish() {
    const request = {
      pageNumber: pageIndex,
      pageSize: HOW_MANY_WISH,
      hasTotalCount: true,
    };

    const { data } = await getWish(request);
    return data;
  }

  const availablemileage = useMemo(() => {
    return my?.availablemileage || 0;
  }, [my]);

  const totalExpireMileage = useMemo(() => {
    return my?.totalExpireMileage || 0;
  }, [my]);

  return (
    <>
      <SEOHelmet title={'마이페이지 메인'} />
      <div className="contents mypage my">
        <div className="my_wrap">
          <div className="my_head">
            <h2 className="title">마이페이지</h2>
            <MemberSummary
              tabChange={setViewContent}
              profile={profile}
              availablemileage={availablemileage}
              wishCount={wishCount}
            />
          </div>
          <BToBBanners />

          <div className="cont_inner">
            {profile && (
              <>
                <OrderSummary />

                <MileageInfo
                  availablemileage={availablemileage}
                  totalExpireMileage={totalExpireMileage}
                  profile={profile}
                />
                <CouponList />

                <WishList rerender={rerenderWish} wishList={wishList} wishCount={wishCount} more={more} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
