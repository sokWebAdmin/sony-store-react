import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfileOrders, getProfileOrdersSummaryStatus } from '../../api/order';

import OrderStatusSummary from '../../components/order/OrderStatusSummary';
import OrderListItem from '../../components/order/OrderListItem';
import RefundAccount from '../order/RefundAccount';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderList() {
  const [refundAccountVisible, setRefundAccountVisible] = useState(false);

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

  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    getProfileOrdersSummaryStatus().then((res) => {
      // FIXME: 모킹 데이터
      // res.data.depositWaitCnt = 1;
      // res.data.cancelProcessingCnt = 2;
      // res.data.cancelDoneCnt = 3;
      // res.data.deliveryIngCnt = 4;
      // console.log('summary:', res.data);
      setSummary(res.data);
    });
  }, []);

  useEffect(() => {
    getProfileOrders({ params: {} }).then((res) => {
      makeOrderProductsList(res.data);
    });
  }, []);

  const makeOrderProductsList = (profileOrdersResponse) => {
    const newOrderProducts = profileOrdersResponse.items.flatMap((item) => makeOrderProduct(item));

    setOrderProducts(newOrderProducts);
  };

  const makeOrderProduct = (orderItem) => {
    const { payType, orderYmdt } = orderItem;

    return orderItem.orderOptions.map((orderOption) => ({
      payType,
      orderYmdt,
      ...orderOption,
    }));
  };

  return (
    <>
      <SEOHelmet title={'주문/배송내역'} />
      <div className="contents mypage">
        <div className="container">
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
                <div className="date_box">
                  <ul className="date3_tab">
                    <li className="tabs on">
                      <a className="date3_btn">3개월</a>
                    </li>
                    <li className="tabs">
                      <a className="date3_btn">6개월</a>
                    </li>
                    <li className="tabs">
                      <a className="date3_btn">1년</a>
                    </li>
                  </ul>
                  <div className="date_rang">
                    <div className="calendar_box">
                      <input type="text" id="datepicker1" className="inp datepicker" autoComplete="off" />
                    </div>
                    <div className="calendar_box">
                      <input type="text" id="datepicker2" className="inp datepicker" autoComplete="off" />
                    </div>
                    <button className="button button_positive button-s" type="button">
                      조회
                    </button>
                  </div>
                </div>
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
                          payType={orderProduct.payType}
                          orderYmdt={orderProduct.orderYmdt}
                          imageUrl={orderProduct.imageUrl}
                          productName={orderProduct.productName}
                          optionTitle={orderProduct.optionTitle}
                          orderCnt={orderProduct.orderCnt}
                          orderStatusType={orderProduct.orderStatusType}
                          orderStatusTypeLabel={orderProduct.orderStatusTypeLabel}
                          setRefundAccountVisible={setRefundAccountVisible}
                          key={orderProduct.orderNo}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {orderProducts.length > 0 && (
                  <div className="btn_article">
                    <a className="more_btn">더보기</a>
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
                  처리 상태가 <strong>배송 완료 상태</strong>인 경우는 온라인 상으로 주문 취소 접수가 되지 않으며,
                  소니코리아 고객지원센터(
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
      {/* {refundAccountVisible && <RefundAccount setVisible={setRefundAccountVisible} />} */}
    </>
  );
}
