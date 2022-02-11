import { Link, useHistory } from 'react-router-dom';

const OrderSummary = ({
    depositWaitCnt = 0,
    payDoneCnt = 0,
    productPrepareCnt = 0,
    deliveryPrepareCnt = 0,
    deliveryIngCnt = 0,
    deliveryDoneCnt = 0,
    buyConfirmCnt = 0,
    cancelDoneCnt = 0,
    returnDoneCnt = 0,
    exchangeDoneCnt = 0,
    cancelProcessingCnt = 0,
    returnProcessingCnt = 0,
    exchangeProcessingCnt = 0,
}) => {
    const history = useHistory();

    const hasOrder = (statusCount) => (statusCount > 0 ? 'on' : '');

    const onClickOrderStatus = (orderRequestTypes) =>
        history.push(
            `my-page/order-list?orderRequestTypes=${orderRequestTypes}`,
        );

    return (
        <div className='cont history_order'>
            <div className='tit_head'>
                <h3 className='cont_tit'>주문/배송 내역</h3>
                <div className='btn_article right'>
                    <Link
                        to='my-page/order-list'
                        className='button button_secondary button-s'
                    >
                        자세히 보기
                    </Link>
                </div>
            </div>
            <div className='history_inner'>
                <div className='my_order'>
                    <ul className='order_list'>
                        <li className={`step_1 ${hasOrder(depositWaitCnt)}`}>
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
                                    <span className='val'>{payDoneCnt}</span>
                                    <span>건</span>
                                </button>
                            </div>
                        </li>
                        <li
                            className={`step_3 ${hasOrder(
                                deliveryPrepareCnt + productPrepareCnt,
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
                                        {deliveryPrepareCnt + productPrepareCnt}
                                    </span>
                                    <span>건</span>
                                </button>
                            </div>
                        </li>
                        <li className={`step_4 ${hasOrder(deliveryIngCnt)}`}>
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
                        <li className={`step_5 ${hasOrder(deliveryDoneCnt)}`}>
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
                    <p
                        className={`txt cancel ${hasOrder(
                            cancelProcessingCnt + cancelDoneCnt,
                        )}`}
                    >
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
                                    {cancelProcessingCnt + cancelDoneCnt}
                                </span>{' '}
                                건
                            </strong>
                        </button>
                    </p>
                    <p
                        className={`txt return ${hasOrder(
                            exchangeDoneCnt +
                                returnDoneCnt +
                                returnProcessingCnt +
                                returnProcessingCnt,
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
                                    {exchangeDoneCnt +
                                        returnDoneCnt +
                                        returnProcessingCnt +
                                        exchangeProcessingCnt}
                                </span>{' '}
                                건
                            </strong>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
