import React, { useEffect, useState, useRef } from 'react';
import { addMonth, changeDateFormat } from '../../utils/dateFormat';
import { Link } from 'react-router-dom';
import { getProfileOrders, getProfileOrdersSummaryStatus } from '../../api/order';

import OrderStatusSummary from '../../components/myPage/order/OrderStatusSummary';
import DateBox from '../../components/myPage/DateBox';
import OrderListItem from '../../components/myPage/order/OrderListItem';
import RefundAccount from '../order/RefundAccount';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderList() {
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

  const [refundAccountVisible, setRefundAccountVisible] = useState(false);
  const [searchPeriod, setSearchPeriod] = useState({
    startDate: new Date(addMonth(new Date(), -3)),
    endDate: new Date(),
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(true);
  const nextPage = useRef(2);

  useEffect(() => {
    getProfileOrdersSummaryStatus().then((res) => {
      setSummary(res.data);
    });
  }, []);

  useEffect(() => {
    search({
      startDate: new Date(addMonth(new Date(), -3)),
      endDate: new Date(),
      pageNumber: 1,
      pageSize: 10,
      orderRequestTypes: '',
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
            <OrderStatusSummary summary={summary} />
            <div className="cont recent_order">
              <div className="tit_head mileage_inquiry">
                <h3 className="cont_tit">최근주문</h3>
                <DateBox search={search} />
              </div>
              {/* 주문 정보 */}
              <div className="col_table_wrap order_list">
                <div className="col_table">
                  <div className="col_table_head">
                    <div className="col_table_row">
                      <div className="col_table_cell">주문날짜/번호</div>
                      <div className="col_table_cell">제품</div>
                      <div className="col_table_cell">수량</div>
                      <div className="col_table_cell">처리상태</div>
                    </div>
                  </div>
                  {orderProducts.length > 0 && (
                    <div className="col_table_body">
                      {orderProducts.map((orderProduct) => (
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
                          key={orderProduct.orderNo}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {loadMoreBtnVisible && (
                  <div className="my btn_article" style={{ textAlign: 'center' }}>
                    <a href="#" className="more_btn" onClick={onClickLoadMore}>
                      더보기
                    </a>
                  </div>
                )}

                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다. */}
                {orderProducts.length === 0 && <div class="no-data">내역이 없습니다</div>}
              </div>
              {/*// 주문 정보 */}
            </div>
            <div className="order_notice">
              <h3 className="order_notice_title">주문/배송 시 주의사항</h3>
              <ul className="list_dot">
                <li>주문 취소 접수 후에는 사용하신 쿠폰은 사라지며, 재 주문 시에 다시 복원되지 않습니다.</li>
                <li>
                  처리 상태가 <strong>배송중, 배송 완료 상태</strong>인 경우는 온라인 상으로 주문 취소 접수가 되지
                  않으며, 소니코리아 고객지원센터(
                  <strong>1588-0911</strong>)를 통해서 주문 취소 요청을 하실 수 있습니다.
                </li>
                <li>주문 마감 기간의 경우는 주문 취소 접수가 되지 않을 수 있습니다.</li>
                <li>
                  <strong>
                    신용카드 영수증, 현금영수증 신청을 클릭하시면 출력하실 수 있습니다. (PC버전에서만 가능합니다.)
                  </strong>
                </li>
              </ul>
            </div>
            <div className="ico_box_link">
              <a href="https://www.sony.co.kr/electronics/support" className="box_link_inner ico_type3" target="_blank">
                <div className="txt_box">
                  <p className="tit">고객지원 센터</p>
                  <p className="txt">제품 서비스 및 보증기간을 확인하세요!</p>
                </div>
              </a>
              {/* TODO: svg 파일 누락됨 문의중 https://nhnent.dooray.com/project/posts/3089165614751281840 */}
              <Link to="/my-page/old-order-list" class="box_link_inner ico_type4">
                <div class="txt_box">
                  <p class="tit">2021년 9월 이전 주문 내역</p>
                  <p class="txt">이전 소니스토어에서 구매하신 내역을 확인하세요!</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
