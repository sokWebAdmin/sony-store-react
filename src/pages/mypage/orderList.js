import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import qs from 'qs';

import SEOHelmet from 'components/SEOHelmet';
import OrderStatusSummary from 'components/myPage/order/OrderStatusSummary';
import DateBox from 'components/myPage/DateBox';
import OrderListTable from 'components/myPage/order/OrderListTable';
import OrderListItem from 'components/myPage/order/OrderListItem';
import OrderNotice from 'components/myPage/order/OrderNotice';
import OrderListLinkBox from 'components/myPage/order/OrderListLinkBox';
import { getProfileOrders, getProfileOrdersSummaryStatus } from 'api/order';
import { DEFAULT_SEARCH_PERIOD } from 'utils/constants';
import 'assets/scss/contents.scss';
import 'assets/scss/mypage.scss';

export default function OrderList() {
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

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
    const [selectMenu, setSelectMenu] = useState('threeM');
    const [searchPeriod, setSearchPeriod] = useState({
        startDate: new Date(dayjs().subtract(DEFAULT_SEARCH_PERIOD, 'months')),
        endDate: new Date(),
    });
    const [nextOrderRequestTypes, setNextOrderRequestTypes] = useState('');
    const [orderProducts, setOrderProducts] = useState([]);
    const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(true);
    const nextPage = useRef(2);

    useEffect(() => {
        (async () => {
            const summaryRes = await getProfileOrdersSummaryStatus({
                params: {
                    startYmd: dayjs(searchPeriod.startDate).format(
                        'YYYY-MM-DD',
                    ),
                    endYmd: dayjs(searchPeriod.endDate).format('YYYY-MM-DD'),
                },
            });

            setSummary(summaryRes.data);

            await search({
                startDate: searchPeriod.startDate,
                endDate: searchPeriod.endDate,
                pageNumber: 1,
                pageSize: 10,
                orderRequestTypes: query?.orderRequestTypes,
            });
        })();
    }, []);

    const makeOrderProductsList = useCallback((profileOrdersResponse) => {
        const newOrderProducts = profileOrdersResponse.items.flatMap((item) =>
            makeOrderProduct(item),
        );
        return newOrderProducts;
    }, []);

    const onClickTab = useCallback((menu) => {
        setSelectMenu(menu);

        if (menu === 'threeM') {
            setSearchPeriod((prev) => ({
                ...prev,
                startDate: new Date(
                    dayjs(prev.endDate).subtract('3', 'months'),
                ),
            }));
        }
        if (menu === 'sixM') {
            setSearchPeriod((prev) => ({
                ...prev,
                startDate: new Date(
                    dayjs(prev.endDate).subtract('6', 'months'),
                ),
            }));
        }
        if (menu === 'oneY') {
            setSearchPeriod((prev) => ({
                ...prev,
                startDate: new Date(dayjs(prev.endDate).subtract('1', 'year')),
            }));
        }
    }, []);

    const search = useCallback(
        async ({
            startDate,
            endDate,
            pageNumber = 1,
            pageSize = 10,
            orderRequestTypes = '',
        }) => {
            const res = await getProfileOrders({
                params: {
                    startYmd: dayjs(startDate).format('YYYY-MM-DD'),
                    endYmd: dayjs(endDate).format('YYYY-MM-DD'),
                    pageSize,
                    pageNumber,
                    orderRequestTypes,
                },
            });
            const newOrderProducts = makeOrderProductsList(res.data);

            showLoadMoreBtn(newOrderProducts);
            setOrderProducts(newOrderProducts);
            setSearchPeriod((prev) => ({ ...prev, startDate, endDate }));
            setNextOrderRequestTypes(orderRequestTypes);
            nextPage.current = 2;
        },
        [makeOrderProductsList],
    );

    const onClickSearch = useCallback(async () => {
        const startYmd = dayjs(searchPeriod.startDate).format('YYYY-MM-DD');
        const endYmd = dayjs(searchPeriod.endDate).format('YYYY-MM-DD');

        const res = await getProfileOrders({
            params: {
                startYmd,
                endYmd,
                pageSize: 10,
                pageNumber: 1,
                orderRequestTypes: nextOrderRequestTypes,
            },
        });
        const newOrderProducts = makeOrderProductsList(res.data);

        const summaryRes = await getProfileOrdersSummaryStatus({
            params: {
                startYmd,
                endYmd,
            },
        });

        setSummary(summaryRes.data);

        showLoadMoreBtn(newOrderProducts);
        setOrderProducts(newOrderProducts);
        setNextOrderRequestTypes(nextOrderRequestTypes);
        nextPage.current = 2;
    }, [
        makeOrderProductsList,
        nextOrderRequestTypes,
        searchPeriod.endDate,
        searchPeriod.startDate,
    ]);

    const makeOrderProduct = (orderItem) => {
        const { payType, orderYmdt } = orderItem;

        return orderItem.orderOptions.map((orderOption) => ({
            payType,
            orderYmdt,
            ...orderOption,
        }));
    };

    const onClickLoadMore = () =>
        loadMore(nextPage.current, 10, nextOrderRequestTypes);

    const loadMore = async (pageNumber, pageSize, orderRequestTypes = '') => {
        const { startDate, endDate } = searchPeriod;

        const res = await getProfileOrders({
            params: {
                startYmd: dayjs(startDate).format('YYYY-MM-DD'),
                endYmd: dayjs(endDate).format('YYYY-MM-DD'),
                pageNumber,
                pageSize,
                orderRequestTypes,
            },
        });
        const newOrderProducts = makeOrderProductsList(res.data);

        showLoadMoreBtn(newOrderProducts);
        setOrderProducts([...orderProducts, ...newOrderProducts]);
        nextPage.current += 1;
    };

    // 다음 페이지가 없는 경우 loadmore 버튼 숨김
    const showLoadMoreBtn = (newOrderProducts) => {
        if (newOrderProducts.length < 10) {
            setLoadMoreBtnVisible(false);
            return;
        }

        setLoadMoreBtnVisible(true);
    };

    const onChangeStartDate = (startDate) => {
        if (startDate > searchPeriod.endDate) {
            alert('종료일보다 큰 날짜를 선택할 수 없습니다.');
            setSearchPeriod((prev) => ({ ...prev }));
            return false;
        } else {
            setSearchPeriod((prev) => ({ ...prev, startDate }));
        }
    };

    const onChangeEndDate = (endDate) => {
        if (endDate < searchPeriod.startDate) {
            alert('시작일보다 작은 날짜를 선택할 수 없습니다.');
            setSearchPeriod((prev) => ({ ...prev }));
            return false;
        } else {
            setSearchPeriod((prev) => ({ ...prev, endDate }));
        }
    };

    return (
        <>
            <SEOHelmet title={'마이페이지 : 주문/배송 내역'} />
            <div className='contents mypage'>
                <div className='container my'>
                    <div className='content'>
                        <div className='common_head'>
                            <Link to='/my-page' className='common_head_back'>
                                마이페이지
                            </Link>
                            <h1 className='common_head_name'>주문/배송내역</h1>
                        </div>
                        <OrderStatusSummary
                            summary={summary}
                            search={search}
                            startDate={searchPeriod.startDate}
                            endDate={searchPeriod.endDate}
                        />
                        <div className='cont recent_order'>
                            <div className='tit_head mileage_inquiry'>
                                <h3 className='cont_tit'>최근주문</h3>
                                <DateBox
                                    selectMenu={selectMenu}
                                    onClickTab={onClickTab}
                                    onClickSearch={onClickSearch}
                                    startDate={searchPeriod.startDate}
                                    endDate={searchPeriod.endDate}
                                    onChangeStartDate={onChangeStartDate}
                                    onChangeEndDate={onChangeEndDate}
                                    style={{ paddingBottom: '24px' }}
                                />
                            </div>
                            {/* 주문 정보 */}
                            <div className='col_table_wrap order_list'>
                                <OrderListTable>
                                    {orderProducts.length > 0 && (
                                        <div className='col_table_body'>
                                            {orderProducts.map(
                                                (
                                                    {
                                                        orderNo,
                                                        orderOptionNo,
                                                        payType,
                                                        orderYmdt,
                                                        imageUrl,
                                                        productName,
                                                        optionTitle,
                                                        orderCnt,
                                                        orderStatusType,
                                                        claimNo,
                                                        claimStatusType,
                                                        orderStatusTypeLabel,
                                                        claimStatusTypeLabel,
                                                        delivery,
                                                    },
                                                    index,
                                                ) => (
                                                    <OrderListItem
                                                        orderNo={orderNo}
                                                        orderOptionNo={
                                                            orderOptionNo
                                                        }
                                                        payType={payType}
                                                        orderYmdt={orderYmdt}
                                                        imageUrl={imageUrl}
                                                        productName={
                                                            productName
                                                        }
                                                        optionTitle={
                                                            optionTitle
                                                        }
                                                        orderCnt={orderCnt}
                                                        orderStatusType={
                                                            orderStatusType
                                                        }
                                                        claimNo={claimNo}
                                                        claimStatusType={
                                                            claimStatusType
                                                        }
                                                        orderStatusTypeLabel={
                                                            orderStatusTypeLabel
                                                        }
                                                        claimStatusTypeLabel={
                                                            claimStatusTypeLabel
                                                        }
                                                        delivery={delivery}
                                                        key={index}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </OrderListTable>
                                {loadMoreBtnVisible && (
                                    <div
                                        className='my btn_article'
                                        style={{ textAlign: 'center' }}
                                    >
                                        <button
                                            className='more_btn'
                                            onClick={onClickLoadMore}
                                        >
                                            더보기
                                        </button>
                                    </div>
                                )}

                                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다. */}
                                {orderProducts.length === 0 && (
                                    <div className='no-data'>
                                        내역이 없습니다
                                    </div>
                                )}
                            </div>
                            {/*// 주문 정보 */}
                        </div>
                        <OrderNotice />
                        <OrderListLinkBox />
                    </div>
                </div>
            </div>
        </>
    );
}
