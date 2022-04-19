import { useState, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';

import SEO from 'components/SEO';
import MemberSummary from 'components/myPage/main/MemberSummary';
import BToBBanners from 'components/myPage/main/BToBBanners';
import OrderSummary from 'components/myPage/main/OrderSummary';
import MileageInfo from 'components/myPage/main/MileageInfo';
import CouponList from 'components/myPage/main/CouponList';
import WishList from 'components/myPage/main/WishList';
import {
    fetchProfile,
    fetchMyProfile,
    useProfileState,
    useProileDispatch,
} from 'context/profile.context';
import { DEFAULT_SEARCH_PERIOD, HOW_MANY_WISH } from 'utils/constants';
import { getWish } from 'api/order';
import { getProfileOrdersSummaryStatus } from 'api/order';
import 'assets/scss/contents.scss';
import 'assets/css/mypage.css';

export default function MyPageMain() {
    const [viewContent, setViewContent] = useState('mileage');

    const { my, profile } = useProfileState();
    const profileDispatch = useProileDispatch();

    const [wishList, setWishList] = useState([]);
    const [wishCount, setWishCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);

    const [summary, setSummary] = useState({
        depositWaitCnt: 0,
        payDoneCnt: 0,
        productPrepareCnt: 0,
        deliveryPrepareCnt: 0,
        deliveryIngCnt: 0,
        deliveryDoneCnt: 0,
        buyConfirmCnt: 0,
        cancelDoneCnt: 0,
        returnDoneCnt: 0,
        exchangeDoneCnt: 0,
        cancelProcessingCnt: 0,
        returnProcessingCnt: 0,
        exchangeProcessingCnt: 0,
    });

    // 기본 주문 검색 기간 3개월로 설정
    useEffect(() => {
        (async () => {
            const response = await getProfileOrdersSummaryStatus({
                params: {
                    startYmd: dayjs()
                        .subtract(DEFAULT_SEARCH_PERIOD, 'months')
                        .format('YYYY-MM-DD'),
                    endYmd: dayjs().format('YYYY-MM-DD'),
                },
            });
            setSummary((prev) => {
                return { ...prev, ...response.data };
            });
        })();
    }, []);

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

    const availableMileage = useMemo(() => {
        return my?.availablemileage || 0;
    }, [my]);

    const totalExpireMileage = useMemo(() => {
        return my?.totalExpireMileage || 0;
    }, [my]);

    const memberName = useMemo(
        () => my?.firstname ?? profile?.memberName,
        [my],
    );

    return (
        <>
            <SEO data={{ title: '마이페이지 메인' }} />

            <div className='contents mypage my'>
                <div className='my_wrap'>
                    <div className='my_head'>
                        <h2 className='title'>마이페이지</h2>
                        <MemberSummary
                            tabChange={setViewContent}
                            profile={profile}
                            memberName={memberName}
                            availableMileage={availableMileage}
                            wishCount={wishCount}
                        />
                    </div>

                    <BToBBanners />

                    <div className='cont_inner'>
                        {profile && (
                            <>
                                <OrderSummary {...summary} />

                                <MileageInfo
                                    availableMileage={availableMileage}
                                    totalExpireMileage={totalExpireMileage}
                                    profile={profile}
                                />
                                <CouponList />

                                <WishList
                                    rerender={rerenderWish}
                                    wishList={wishList}
                                    wishCount={wishCount}
                                    more={more}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
