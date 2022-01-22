import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import DateBox from 'components/myPage/DateBox';
import OldOrderListItem from 'components/myPage/order/OldOrderListItem';
import SEOHelmet from 'components/SEOHelmet';
import { SONY_RESPONSE } from 'utils/constants';
import { getOldOrders } from 'api/sony/order';
import 'assets/scss/contents.scss';
import 'assets/scss/mypage.scss';

export default function OldOrderList() {
    const [selectMenu, setSelectMenu] = useState('threeM');
    const [searchPeriod, setSearchPeriod] = useState({
        startDate: new Date(dayjs().subtract('3', 'months')),
        endDate: new Date(),
    });
    const [oldOrderProducts, setOldOrderProducts] = useState([]);
    const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(false);
    const nextPage = useRef(2);

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

    const search = async ({ startDate, endDate, pageNumber, pageSize }) => {
        const res = await getOldOrders({
            requestBody: {
                schStrtDt: dayjs(startDate).format('YYYY-MM-DD'),
                schEndDt: dayjs(endDate).format('YYYY-MM-DD'),
                pageIdx: pageNumber,
                rowsPerPage: pageSize,
                orderType: null,
            },
        });
        console.log('🚀 ~ file: OldOrderList.js ~ line 59 ~ search ~ res', res);

        if (res.data.errorCode === SONY_RESPONSE.SUCCESS) {
            showLoadMoreBtn(res.data.body);
            setOldOrderProducts((prev) => [...prev, ...res.data.body]);
            nextPage.current = 2;
        }

        setSearchPeriod({ startDate, endDate });
    };

    useEffect(() => {
        search({
            startDate: searchPeriod.startDate,
            endDate: searchPeriod.endDate,
            pageNumber: 1,
            pageSize: 10,
            orderType: null,
        });
    }, []);

    const onClickSearch = useCallback(async () => {
        const res = await getOldOrders({
            requestBody: {
                schStrtDt: dayjs(searchPeriod.startDate).format('YYYY-MM-DD'),
                schEndDt: dayjs(searchPeriod.endDate).format('YYYY-MM-DD'),
                pageIdx: 1,
                rowsPerPage: 10,
                orderType: null,
            },
        });

        if (res.data.errorCode === SONY_RESPONSE.SUCCESS) {
            showLoadMoreBtn(res.data.body);
            setOldOrderProducts((prev) => [...prev, ...res.data.body]);
            nextPage.current++;
        }
    }, [searchPeriod.startDate, searchPeriod.endDate]);

    const loadMore = async (pageIdx, rowsPerPage) => {
        const { startDate, endDate } = searchPeriod;

        const res = await getOldOrders({
            requestBody: {
                schStrtDt: dayjs(startDate).format('YYYY-MM-DD'),
                schEndDt: dayjs(endDate).format('YYYY-MM-DD'),
                pageIdx,
                rowsPerPage,
                orderType: null,
            },
        });

        if (res.data.errorCode === SONY_RESPONSE.SUCCESS) {
            showLoadMoreBtn(res.data.body);
            setOldOrderProducts((prev) => [...prev, ...res.data.body]);
            nextPage.current++;
        }
    };

    const onClickLoadMore = () => loadMore(nextPage.current, 10);

    // 다음 페이지가 없는 경우 loadmore 버튼 숨김
    const showLoadMoreBtn = (newOldOrderProducts) => {
        if (newOldOrderProducts.length === 0) {
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
            <SEOHelmet title={'마이페이지 : 이전 주문/배송 내역'} />
            <div className='contents mypage'>
                <div className='container my'>
                    <div className='content'>
                        <div className='common_head'>
                            <Link
                                to='/my-page/order-list'
                                className='common_head_back'
                            >
                                주문/배송내역
                            </Link>
                            <h1 className='common_head_name'>
                                이전 주문/배송내역
                            </h1>
                        </div>

                        <div className='cont recent_order prev_order'>
                            <div className='tit_head mileage_inquiry'>
                                <h3 className='cont_tit'>
                                    2021년 11월 이전 주문 내역
                                </h3>
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

                            <div className='col_table_wrap order_list'>
                                <div className='col_table'>
                                    <div className='col_table_head'>
                                        <div className='col_table_row'>
                                            <div className='col_table_cell'>
                                                주문날짜/번호
                                            </div>
                                            <div className='col_table_cell'>
                                                제품
                                            </div>
                                            <div className='col_table_cell'>
                                                처리상태
                                            </div>
                                        </div>
                                    </div>
                                    {oldOrderProducts.length > 0 && (
                                        <div className='col_table_body'>
                                            {oldOrderProducts.map(
                                                ({
                                                    orderid,
                                                    createdate,
                                                    status,
                                                    seqno,
                                                }) => (
                                                    <OldOrderListItem
                                                        orderid={orderid}
                                                        createdate={createdate}
                                                        status={status}
                                                        seqno={seqno}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                                {loadMoreBtnVisible && (
                                    <div
                                        className='my btn_article'
                                        style={{ textAlign: 'center' }}
                                    >
                                        <button
                                            href='#'
                                            className='more_btn'
                                            onClick={onClickLoadMore}
                                        >
                                            더보기
                                        </button>
                                    </div>
                                )}

                                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다.  */}
                                {oldOrderProducts.length === 0 && (
                                    <div className='no-data'>
                                        내역이 없습니다
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
