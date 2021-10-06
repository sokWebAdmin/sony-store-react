import React, { useEffect, useState, useRef } from 'react';
import { addMonth, changeDateFormat } from '../../utils/dateFormat';
import { Link } from 'react-router-dom';
import { getProfileOrders, getProfileOrdersSummaryStatus } from '../../api/order';
import { useQuery } from '../../hooks';

import OrderStatusSummary from '../../components/myPage/order/OrderStatusSummary';
import DateBox from '../../components/myPage/DateBox';
import OrderListTable from '../../components/myPage/order/OrderListTable';
import OrderListItem from '../../components/myPage/order/OrderListItem';
import OrderNotice from '../../components/myPage/order/OrderNotice';
import OrderListLinkBox from '../../components/myPage/order/OrderListLinkBox';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderList() {
  const query = useQuery();
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

  const [searchPeriod, setSearchPeriod] = useState({
    startDate: new Date(addMonth(new Date(), -3)),
    endDate: new Date(),
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(true);
  const nextPage = useRef(2);

  useEffect(async () => {
    const summaryRes = await getProfileOrdersSummaryStatus();
    const orderRequestTypesQuery = query.get('orderRequestTypes');

    setSummary(summaryRes.data);
    await search({
      startDate: new Date(addMonth(new Date(), -3)),
      endDate: new Date(),
      pageNumber: 1,
      pageSize: 10,
      orderRequestTypes: orderRequestTypesQuery ? orderRequestTypesQuery : '',
    });
  }, []);

  const search = async ({ startDate, endDate, pageNumber = 1, pageSize = 10, orderRequestTypes = '' }) => {
    const startYmd = changeDateFormat(startDate, 'YYYY-MM-DD');
    const endYmd = changeDateFormat(endDate, 'YYYY-MM-DD');

    const res = await getProfileOrders({ params: { startYmd, endYmd, pageSize, pageNumber, orderRequestTypes } });
    const newOrderProducts = makeOrderProductsList(res.data);

    showLoadMoreBtn(newOrderProducts);
    setOrderProducts(newOrderProducts);
    setSearchPeriod({ startDate, endDate });
    nextPage.current = 2;
  };

  const makeOrderProductsList = (profileOrdersResponse) => {
    const newOrderProducts = profileOrdersResponse.items.flatMap((item) => makeOrderProduct(item));
    return newOrderProducts;
  };

  const makeOrderProduct = (orderItem) => {
    const { payType, orderYmdt } = orderItem;

    return orderItem.orderOptions.map((orderOption) => ({
      payType,
      orderYmdt,
      ...orderOption,
    }));
  };

  const onClickLoadMore = (e) => {
    e.preventDefault();
    loadMore(nextPage.current, 10);
  };

  const loadMore = async (pageNumber, pageSize) => {
    const { startDate, endDate } = searchPeriod;
    const startYmd = changeDateFormat(startDate, 'YYYY-MM-DD');
    const endYmd = changeDateFormat(endDate, 'YYYY-MM-DD');

    const res = await getProfileOrders({
      params: { startYmd, endYmd, pageNumber, pageSize },
    });
    const newOrderProducts = makeOrderProductsList(res.data);

    showLoadMoreBtn(newOrderProducts);
    setOrderProducts([...orderProducts, ...newOrderProducts]);
    nextPage.current += 1;
  };

  // 다음 페이지가 없는 경우 loadmore 버튼 숨김
  const showLoadMoreBtn = (newOrderProducts) => {
    if (newOrderProducts.length === 0) {
      setLoadMoreBtnVisible(false);
      return;
    }

    setLoadMoreBtnVisible(true);
  };

  return (
    <>
      <SEOHelmet title={'주문/배송내역'} />
      <div className="contents mypage">
        <div className="container my">
          <div className="content">
            <div className="common_head">
              <Link to="/my-page" className="common_head_back">
                마이페이지
              </Link>
              <h1 className="common_head_name">주문/배송내역</h1>
            </div>
            <OrderStatusSummary summary={summary} search={search} />
            <div className="cont recent_order">
              <div className="tit_head mileage_inquiry">
                <h3 className="cont_tit">최근주문</h3>
                <DateBox search={search} />
              </div>
              {/* 주문 정보 */}
              <div className="col_table_wrap order_list">
                <OrderListTable>
                  {orderProducts.length > 0 && (
                    <div className="col_table_body">
                      {orderProducts.map((orderProduct, index) => (
                        <OrderListItem
                          orderNo={orderProduct.orderNo}
                          orderOptionNo={orderProduct.orderOptionNo}
                          payType={orderProduct.payType}
                          orderYmdt={orderProduct.orderYmdt}
                          imageUrl={orderProduct.imageUrl}
                          productName={orderProduct.productName}
                          optionTitle={orderProduct.optionTitle}
                          orderCnt={orderProduct.orderCnt}
                          orderStatusType={orderProduct.orderStatusType}
                          claimNo={orderProduct.claimNo}
                          claimStatusType={orderProduct.claimStatusType}
                          orderStatusTypeLabel={orderProduct.orderStatusTypeLabel}
                          delivery={orderProduct.delivery}
                          key={index}
                        />
                      ))}
                    </div>
                  )}
                </OrderListTable>
                {loadMoreBtnVisible && (
                  <div className="my btn_article" style={{ textAlign: 'center' }}>
                    <a href="#" className="more_btn" onClick={onClickLoadMore}>
                      더보기
                    </a>
                  </div>
                )}

                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다. */}
                {orderProducts.length === 0 && <div className="no-data">내역이 없습니다</div>}
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
