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

  const [searchPeriod, setSearchPeriod] = useState({
    startDate: new Date(addMonth(new Date(), -3)),
    endDate: new Date(),
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const nextPage = useRef(1);

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
      const newOrderProducts = makeOrderProductsList(res.data);
      setOrderProducts(newOrderProducts);
    });
  }, []);

  const makeOrderProductsList = (profileOrdersResponse) => {
    // FIXME: 목데이터 지우기
    // profileOrdersResponse.items.push({
    //   orderYmdt: '2021-09-13 17:31:52',
    //   orderNo: '202109131731524695',
    //   payType: 'CREDIT_CARD',
    //   pgType: 'KCP',
    //   pgMallKey: '',
    //   pgOrderNo: '21506963131959',
    //   escrow: false,
    //   member: true,
    //   nextActions: [
    //     {
    //       nextActionType: 'CANCEL_ALL',
    //       uri: '/profile/orders/202109131731524695/claim',
    //     },
    //   ],
    //   firstOrderAmt: {
    //     payAmt: 208700,
    //     subPayAmt: 0,
    //     standardAmt: 9000,
    //     deliveryAmt: 200000,
    //     remoteDeliveryAmt: 0,
    //     immediateDiscountAmt: 300,
    //     additionalDiscountAmt: 0,
    //     cartCouponDiscountAmt: 0,
    //     productCouponDiscountAmt: 0,
    //     deliveryCouponDiscountAmt: 0,
    //     totalProductAmt: 8700,
    //     chargeAmt: 208700,
    //   },
    //   lastOrderAmt: {
    //     payAmt: 208700,
    //     subPayAmt: 0,
    //     standardAmt: 9000,
    //     deliveryAmt: 200000,
    //     remoteDeliveryAmt: 0,
    //     immediateDiscountAmt: 300,
    //     additionalDiscountAmt: 0,
    //     cartCouponDiscountAmt: 0,
    //     productCouponDiscountAmt: 0,
    //     deliveryCouponDiscountAmt: 0,
    //     totalProductAmt: 8700,
    //     chargeAmt: 208700,
    //   },
    //   orderOptions: [
    //     {
    //       orderNo: '202109131731524695',
    //       orderOptionNo: 295708,
    //       productNo: 101978834,
    //       optionNo: 35982957,
    //       additionalProductNo: 0,
    //       imageUrl: '//rlyfaazj0.toastcdn.net/20210712/112405.423641000/09.jpg',
    //       brandName: null,
    //       brandNameEn: null,
    //       productName: '배송비 20만원',
    //       productNameEn: '',
    //       optionName: '1',
    //       optionValue: '11',
    //       optionUsed: true,
    //       optionType: 'NORMAL_OPTION',
    //       orderCnt: 3,
    //       orderStatusType: 'PAY_DONE',
    //       claimStatusType: null,
    //       orderStatusDate: {
    //         registerYmdt: '2021-09-13 17:31:52',
    //         buyConfirmYmdt: null,
    //         reviewableYmdt: null,
    //       },
    //       claimNo: null,
    //       accumulationAmt: 1140,
    //       refundable: true,
    //       deliveryInternationalYn: false,
    //       reservationDeliveryYmdt: null,
    //       exchangeYn: 'N',
    //       member: true,
    //       deliverable: true,
    //       inputs: [],
    //       nextActions: [
    //         {
    //           nextActionType: 'CANCEL',
    //           uri: '/profile/order-options/295708/claim',
    //         },
    //       ],
    //       optionManagementCd: '',
    //       delivery: {
    //         invoiceNo: null,
    //         deliveryCompanyType: null,
    //         retrieveInvoiceUrl: null,
    //         deliveryType: 'PARCEL_DELIVERY',
    //         deliveryCompanyTypeLabel: null,
    //       },
    //       price: {
    //         standardPrice: 2000,
    //         immediateDiscountedPrice: 2000,
    //         buyPrice: 2000,
    //         standardAmt: 6000,
    //         immediateDiscountedAmt: 6000,
    //         buyAmt: 6000,
    //         salePrice: 2000,
    //         addPrice: 0,
    //         immediateDiscountAmt: 0,
    //         additionalDiscountAmt: 0,
    //         accumulationRate: 19,
    //       },
    //       reservation: false,
    //       optionTitle: '1: 11',
    //       orderStatusTypeLabel: '결제완료',
    //       claimStatusTypeLabel: null,
    //     },
    //     {
    //       orderNo: '202109131731524695',
    //       orderOptionNo: 295707,
    //       productNo: 101891968,
    //       optionNo: 4348934,
    //       additionalProductNo: 0,
    //       imageUrl: '//rlyfaazj0.toastcdn.net/product/00002173/101891968/6164a54b-ceb2-402f-b349-07e154c36e6f.png',
    //       brandName: null,
    //       brandNameEn: null,
    //       productName: '조회수순 정렬 확인용, 조회수 낮음B-A보다 최신상품',
    //       productNameEn: '',
    //       optionName: '조회수순 정렬 확인용, 조회수 낮음B-A보다 ',
    //       optionValue: '조회수순 정렬 확인용, 조회수 낮음B-A보다 최신상품',
    //       optionUsed: false,
    //       optionType: 'PRODUCT_ONLY',
    //       orderCnt: 3,
    //       orderStatusType: 'PAY_DONE',
    //       claimStatusType: null,
    //       orderStatusDate: {
    //         registerYmdt: '2021-09-13 17:31:52',
    //         buyConfirmYmdt: null,
    //         reviewableYmdt: null,
    //       },
    //       claimNo: null,
    //       accumulationAmt: 513,
    //       refundable: true,
    //       deliveryInternationalYn: false,
    //       reservationDeliveryYmdt: null,
    //       exchangeYn: 'N',
    //       member: true,
    //       deliverable: true,
    //       inputs: [],
    //       nextActions: [
    //         {
    //           nextActionType: 'CANCEL',
    //           uri: '/profile/order-options/295707/claim',
    //         },
    //       ],
    //       optionManagementCd: '',
    //       delivery: {
    //         invoiceNo: null,
    //         deliveryCompanyType: 'POST',
    //         retrieveInvoiceUrl: null,
    //         deliveryType: 'PARCEL_DELIVERY',
    //         deliveryCompanyTypeLabel: '우체국',
    //       },
    //       price: {
    //         standardPrice: 1000,
    //         immediateDiscountedPrice: 900,
    //         buyPrice: 900,
    //         standardAmt: 3000,
    //         immediateDiscountedAmt: 2700,
    //         buyAmt: 2700,
    //         salePrice: 1000,
    //         addPrice: 0,
    //         immediateDiscountAmt: 100,
    //         additionalDiscountAmt: 0,
    //         accumulationRate: 19,
    //       },
    //       reservation: false,
    //       optionTitle: '조회수순 정렬 확인용, 조회수 낮음B-A보다 ',
    //       orderStatusTypeLabel: '결제완료',
    //       claimStatusTypeLabel: null,
    //     },
    //   ],
    //   payTypeLabel: '신용카드',
    // });

    // 목데이터 end

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

  const search = async ({ startDate, endDate, pageNumber = 1, pageSize = 10, orderRequestTypes = '' }) => {
    const startYmd = changeDateFormat(startDate, 'YYYY-MM-DD');
    const endYmd = changeDateFormat(endDate, 'YYYY-MM-DD');

    const res = await getProfileOrders({ params: { startYmd, endYmd, pageSize, pageNumber, orderRequestTypes } });
    const newOrderProducts = makeOrderProductsList(res.data);

    setOrderProducts(newOrderProducts);
    setSearchPeriod({ startDate, endDate });
    nextPage.current = 2;
  };

  const onClickLoadMore = (e) => {
    e.preventDefault();
    loadMore(nextPage.current, 10);
  };

  const loadMore = async (pageNumber, pageSize) => {
    const { startDate, endDate } = searchPeriod;
    const startYmd = changeDateFormat(startDate, 'YYYY-MM-DD').replaceAll('-', '');
    const endYmd = changeDateFormat(endDate, 'YYYY-MM-DD').replaceAll('-', '');

    const res = await getProfileOrders({
      params: { startYmd, endYmd, pageNumber, pageSize },
    });
    const newOrderProducts = makeOrderProductsList(res.data);

    setOrderProducts([...orderProducts, ...newOrderProducts]);
    nextPage.current += 1;
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
                          orderStatusTypeLabel={orderProduct.orderStatusTypeLabel}
                          delivery={orderProduct.delivery}
                          key={orderProduct.orderNo}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {orderProducts.length > 0 && (
                  <div className="btn_article">
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
      {/* {refundAccountVisible && <RefundAccount setVisible={setRefundAccountVisible} />} */}
    </>
  );
}
