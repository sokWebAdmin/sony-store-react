import { React, useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
import { useReactToPrint } from 'react-to-print';
import OrderProcess from '../../components/myPage/orderDetail/OrderProcess';
import OrderSummary from '../../components/myPage/orderDetail/OrderSummary';
import OrderProductList from '../../components/myPage/orderDetail/OrderProductList';
import OrderDetailProductItem from '../../components/myPage/orderDetail/OrderDetailProductItem';
import OrderInfo from '../../components/myPage/orderDetail/OrderInfo';
import PurchaseInfo from '../../components/myPage/orderDetail/PurchaseInfo';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';
import Confirm from '../../components/common/Confirm';

import GlobalContext from '../../context/global.context';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProfileOrderByOrderNo, getGuestOrderByOrderNo } from '../../api/order';
import { postProfileClaimOrderCancelByOrderNo, postGuestClaimOrderCancelByOrderNo } from '../../api/claim';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderDetail() {
  const query = useQuery();
  const printArea = useRef();
  const { isLogin } = useContext(GlobalContext);
  const [orderInfo, setOrderInfo] = useState({
    orderNo: '',
    orderYmdt: '',
    defaultOrderStatusType: '', // order의 가장 첫번째 옵션주문의 주문상태(api 동일)
    defaultClaimStatusType: '', // order의 가장 첫번째 옵션주문의 클레임상태(api에 없는 데이터, front에서 가공)
  });
  const [orderProducts, setOrderProducts] = useState([]); // 주문 상품
  const [ordererInfo, setOrdererInfo] = useState({ ordererName: '', ordererContact1: '' }); // 주문 정보
  const [shippingAddress, setShippingAddress] = useState({
    // 주문 정보
    receiverName: '',
    receiverContact1: '',
    receiverAddress: '',
    receiverDetailAddress: '',
    deliveryMemo: '',
    requestShippingDate: null,
  });
  const [receiptInfos, setReceiptInfos] = useState(null);

  // 결제금액정보
  const [amountInfo, setAmountInfo] = useState({
    totalProductAmt: 0, // 총 주문 금액
    promotionDiscountAmt: 0,
    couponDiscountAmt: 0,
    mileageAmt: 0,
    totalDiscountAmount: 0, // 총 할인 금액
    payAmt: 0, // 결제 금액
  });

  const [payInfo, setPayInfo] = useState({
    // 결제 정보
    payType: '', // 가상계좌 VIRTUAL_ACCOUNT, 신용카드 CREDIT_CARD
    cardInfo: null, // 가상계좌일 때 NUll
    bankInfo: null, // 신용카드일 때 Null
  });
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  useEffect(() => {
    const request = { path: { orderNo: query.get('orderNo') } };
    const fetchOrderDetailMap = {
      guest: () => getGuestOrderByOrderNo(request),
      profile: () => getProfileOrderByOrderNo(request),
    };

    fetchOrderDetailMap[isLogin ? 'profile' : 'guest']().then((res) => setStates(res));
  }, []);

  const setStates = (res) => {
    const {
      orderNo,
      orderYmdt,
      defaultOrderStatusType,
      orderer: { ordererName, ordererContact1 },
      shippingAddress: { receiverName, receiverAddress, receiverContact1, receiverDetailAddress },
      deliveryMemo,
      lastOrderAmount: {
        totalProductAmt,
        immediateDiscountAmt,
        additionalDiscountAmt,
        cartCouponDiscountAmt,
        productCouponDiscountAmt,
        subPayAmt,
        payAmt,
      },
      payType,
      payInfo: { cardInfo, bankInfo },
      receiptInfos,
      orderOptionsGroupByPartner,
    } = res.data;

    setOrderInfo({
      orderNo,
      orderYmdt: orderYmdt.split(' ')[0],
      defaultOrderStatusType,
      defaultClaimStatusType:
        orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].orderOptions[0].claimStatusType,
    });
    setOrderProducts(makeOrderProducts(res.data));
    setOrdererInfo({ ordererName, ordererContact1 });
    setShippingAddress({
      receiverName,
      receiverAddress,
      receiverDetailAddress,
      receiverContact1,
      deliveryMemo,
      requestShippingDate: orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].requestShippingDate,
      usesShippingInfoLaterInput:
        orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].usesShippingInfoLaterInput,
    });

    const promotionDiscountAmt = immediateDiscountAmt + additionalDiscountAmt;
    const couponDiscountAmt = cartCouponDiscountAmt + productCouponDiscountAmt;
    setAmountInfo({
      totalProductAmt,
      promotionDiscountAmt,
      couponDiscountAmt,
      mileageAmt: subPayAmt,
      totalDiscountAmount: promotionDiscountAmt + couponDiscountAmt + subPayAmt,
      payAmt,
    });

    setPayInfo({
      payType,
      cardInfo,
      bankInfo,
    });

    setReceiptInfos(receiptInfos);
  };

  const makeOrderProducts = (orderDetailResponse) => {
    const { orderOptionsGroupByPartner } = orderDetailResponse;
    return orderOptionsGroupByPartner
      .flatMap(({ orderOptionsGroupByDelivery }) => orderOptionsGroupByDelivery)
      .flatMap(({ orderOptions }) => orderOptions)
      .map((orderOption) => ({
        orderNo: orderOption.orderNo,
        imageUrl: orderOption.imageUrl,
        orderOptionNo: orderOption.orderOptionNo,
        optionTitle: orderOption.optionTitle,
        productNo: orderOption.productNo,
        productName: orderOption.productName,
        orderCnt: orderOption.orderCnt,
        buyPrice: orderOption.price.buyPrice,
        buyAmt: orderOption.price.buyAmt,
      }));
  };

  const showOrderCancel = (orderStatusType, claimStatusType) => {
    // 주문아이템에 orderStatusType과 claimStatusType 둘 다 있음.
    // claimStatusType이 존재하면 클레임 중이니 주문 취소 버튼 hidden 처리
    if (claimStatusType) {
      return false;
    }

    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderStatusType);
  };

  const onPrint = useReactToPrint({
    pageStyle: '.my{margin: 0 20px;}',
    content: () => printArea.current,
  });

  const openConfirm = (message) => {
    setConfirmVisible(true);
    setConfirmMessage(message);
  };

  const onCloseConfirm = (status) => {
    setConfirmVisible(false);
    if (status === 'ok') {
      const request = {
        path: { orderNo: query.get('orderNo') },
        requestBody: {
          claimType: 'CANCEL',
          claimReasonType: 'CHANGE_MIND',
          claimReasonDetail: '',
          bankAccountInfo: null,
          saveBankAccountInfo: false,
          responsibleObjectType: null,
        },
      };

      const orderCancelMap = {
        profile: () => postProfileClaimOrderCancelByOrderNo(request),
        guest: () => postGuestClaimOrderCancelByOrderNo(request),
      };

      return orderCancelMap[isLogin ? 'profile' : 'guest']().then((res) => {
        if (res.data.status === 404 || res.data.status === 400) {
          openAlert(res.data.message);
          return;
        }

        openAlert('주문취소 신청이 완료되었습니다.', () => () => window.location.reload());
      });
    } else if (status === 'cancel') {
      console.log('취소');
    }
  };

  const onOrderCancel = () => {
    openConfirm('현재의 주문에 대해서 환불계좌를 확정하시겠습니까?');
  };

  // 클레임 중인 상품인지 확인 => 기획누락같은데, 클레임 상태일 땐 주문상태 UI disable 처리
  const isClaimStart = (defaultOrderStatusType) => {
    const claimStatuses = ['CANCEL', 'EXCHANGE', 'RETURN'];
    return claimStatuses.some((claimStatus) => defaultOrderStatusType.includes(claimStatus));
  };

  return (
    <>
      <SEOHelmet title={'주문 상세 조회'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {confirmVisible && <Confirm onClose={onCloseConfirm}>{confirmMessage}</Confirm>}
      <div ref={printArea} className="contents mypage">
        <div className="container my">
          <div className="content">
            <div className="common_head">
              <Link to="/my-page/order-list" className="common_head_back">
                주문/배송내역
              </Link>
              <h1 className="common_head_name">주문 상세 조회</h1>
            </div>
            {!isClaimStart(orderInfo.defaultOrderStatusType) && (
              <OrderProcess defaultOrderStatusType={orderInfo.defaultOrderStatusType} />
            )}
            <OrderSummary orderInfo={orderInfo} />
            {/* 제품 정보 */}
            <div className="order_detail_cont">
              <OrderProductList>
                {orderProducts.length > 0 &&
                  orderProducts.map((orderProduct, index) => (
                    <OrderDetailProductItem
                      key={index}
                      productName={orderProduct.productName}
                      imageUrl={orderProduct.imageUrl}
                      optionTitle={orderProduct.optionTitle}
                      buyPrice={orderProduct.buyPrice}
                      buyAmt={orderProduct.buyAmt}
                      orderCnt={orderProduct.orderCnt}
                    />
                  ))}
              </OrderProductList>
            </div>
            <OrderInfo ordererInfo={ordererInfo} shippingAddress={shippingAddress} />
            <PurchaseInfo amountInfo={amountInfo} payInfo={payInfo} receiptInfos={receiptInfos} />
            <div className="cont button_wrap">
              {showOrderCancel(orderInfo.defaultOrderStatusType, orderInfo.defaultClaimStatusType) && (
                <button type="button" className="button button_negative" onClick={onOrderCancel}>
                  주문 취소
                </button>
              )}

              <button type="button" className="button button_negative only-pc" onClick={() => onPrint()}>
                주문 정보 프린트
              </button>
              {isLogin && (
                <Link to="/my-page/order-list" className="button button_positive">
                  목록
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
