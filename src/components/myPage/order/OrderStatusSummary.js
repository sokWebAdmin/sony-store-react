import 'assets/scss/contents.scss';
import 'assets/scss/mypage.scss';

export default function OrderStatusSummary({
    summary: {
        depositWaitCnt,
        payDoneCnt,
        productPrepareCnt,
        deliveryPrepareCnt,
        deliveryIngCnt,
        deliveryDoneCnt,
        buyConfirmCnt,
        cancelDoneCnt,
        returnDoneCnt,
        exchangeDoneCnt,
        cancelProcessingCnt,
        returnProcessingCnt,
        exchangeProcessingCnt,
    },
    search,
    startDate,
    endDate,
}) {
    const totalCancelCnt = cancelProcessingCnt + cancelDoneCnt;
    const totalExchangeAndReturnCnt =
        exchangeDoneCnt +
        returnDoneCnt +
        returnProcessingCnt +
        exchangeProcessingCnt;

    const hasOrder = (statusCount) => (statusCount > 0 ? 'on' : '');

    const onClickOrderStatus = (orderRequestType) =>
        search({
            startDate,
            endDate,
            pageNumber: 1,
            pageSize: 10,
            orderRequestTypes: orderRequestType,
        });

    return (
        <>
            <div className='cont history_order'>
                <div className='history_inner'>
                    <div className='my_order'>
                        <ul className='order_list'>
                            <li
                                className={`step_1 ${hasOrder(depositWaitCnt)}`}
                            >
                                {/* 1건 이상 부터 class: on 추가 */}
                                <div className='ship_box'>
                                    <span className='ico_txt'>입금대기</span>
                                    <button
                                        className='val_txt'
                                        onClick={() =>
                                            onClickOrderStatus('DEPOSIT_WAIT')
                                        }
                                    >
                                        <span className='val'>
                                            {depositWaitCnt}
                                        </span>
                                        <span>건</span>
                                    </button>
                                </div>
                            </li>
                            <li className={`step_2 ${hasOrder(payDoneCnt)}`}>
                                <div className='ship_box'>
                                    <span className='ico_txt'>결제완료</span>
                                    <button
                                        className='val_txt'
                                        onClick={() =>
                                            onClickOrderStatus('PAY_DONE')
                                        }
                                    >
                                        <span className='val'>
                                            {payDoneCnt}
                                        </span>
                                        <span>건</span>
                                    </button>
                                </div>
                            </li>
                            <li
                                className={`step_3 ${hasOrder(
                                    productPrepareCnt + deliveryPrepareCnt,
                                )}`}
                            >
                                <div className='ship_box'>
                                    <span className='ico_txt'>배송준비</span>
                                    <button
                                        className='val_txt'
                                        onClick={() =>
                                            onClickOrderStatus(
                                                'PRODUCT_PREPARE,DELIVERY_PREPARE',
                                            )
                                        }
                                    >
                                        <span className='val'>
                                            {deliveryPrepareCnt +
                                                productPrepareCnt}
                                        </span>
                                        <span>건</span>
                                    </button>
                                </div>
                            </li>
                            <li
                                className={`step_4 ${hasOrder(deliveryIngCnt)}`}
                            >
                                <div className='ship_box'>
                                    <span className='ico_txt'>배송중</span>
                                    <button
                                        className='val_txt'
                                        onClick={() =>
                                            onClickOrderStatus('DELIVERY_ING')
                                        }
                                    >
                                        <span className='val'>
                                            {deliveryIngCnt}
                                        </span>
                                        <span>건</span>
                                    </button>
                                </div>
                            </li>
                            <li
                                className={`step_5 ${hasOrder(
                                    deliveryDoneCnt,
                                )}`}
                            >
                                <div className='ship_box'>
                                    <span className='ico_txt'>배송완료</span>
                                    <button
                                        className='val_txt'
                                        onClick={() =>
                                            onClickOrderStatus('DELIVERY_DONE')
                                        }
                                    >
                                        <span className='val'>
                                            {deliveryDoneCnt}
                                        </span>
                                        <span>건</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='my_claim'>
                        <p className={`txt cancel ${hasOrder(totalCancelCnt)}`}>
                            주문 취소{' '}
                            <button
                                title='주문 취소 건'
                                onClick={() =>
                                    onClickOrderStatus(
                                        'CANCEL_PROCESSING,CANCEL_DONE',
                                    )
                                }
                            >
                                <strong className='val_txt'>
                                    <span className='val'>
                                        {totalCancelCnt}
                                    </span>{' '}
                                    건
                                </strong>
                            </button>
                        </p>
                        <p
                            className={`txt return ${hasOrder(
                                totalExchangeAndReturnCnt,
                            )}`}
                        >
                            교환 반품{' '}
                            <button
                                title='교환 반품 건'
                                onClick={() =>
                                    onClickOrderStatus(
                                        'EXCHANGE_PROCESSING,EXCHANGE_DONE,RETURN_PROCESSING,RETURN_DONE',
                                    )
                                }
                            >
                                <strong className='val_txt'>
                                    <span className='val'>
                                        {totalExchangeAndReturnCnt}
                                    </span>{' '}
                                    건
                                </strong>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className='cont information'>
                <p>
                    자사 택배가 아닌 기타 운송수단(퀵, 화물배송)의 경우는 임의
                    송장번호가 적용되어 있습니다.
                </p>
                <p>
                    기타 운송수단의 경우는 고객센터(1588-0911)를 통해 배송 정보
                    문의 바랍니다.
                </p>
            </div>
        </>
    );
}
