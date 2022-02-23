import { Link } from 'react-router-dom';
import qs from 'qs';

import SEOHelmet from 'components/SEOHelmet';
import 'assets/scss/contents.scss';
import 'assets/scss/order.scss';

const OrderFail = ({ location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (
        <>
            <SEOHelmet title={'주문 실패'} />
            <div className='contents order'>
                <div className='container' id='container'>
                    <div
                        className='content order_page'
                        style={{ padding: '0' }}
                    >
                        <div className='order_confirm_box'>
                            <i className='icon receipe' />
                            <h2 className='order_confirm_box__tit'>
                                주문 실패
                            </h2>
                            <p className='order_confirm_box__dsc'>
                                소니스토어를 이용해 주셔서 감사합니다!
                            </p>
                            {query?.status === 'PAY_FAIL' && (
                                <p
                                    className='order_confirm_box__dsc'
                                    style={{ fontWeight: 700 }}
                                >
                                    결제가 정상적으로 이루어지지 않았습니다.
                                    <br />
                                    다시 결제 진행을 해주시기 바랍니다.
                                    <br />
                                    지속적으로 문제가 발생될 경우 고객센터에
                                    문의 하시기 바랍니다.
                                </p>
                            )}
                            {query?.status === 'UNDEFINED' && (
                                <p
                                    className='order_confirm_box__dsc'
                                    style={{ fontWeight: 700 }}
                                >
                                    주문 정보가 없습니다.
                                    <br />
                                    다시 확인 바랍니다.
                                    <br />
                                    지속적으로 문제가 발생될 경우 고객센터에
                                    문의 하시기 바랍니다.
                                </p>
                            )}
                            <div className='btn_box'>
                                <Link
                                    to='/'
                                    className='button button_negative fail'
                                    type='button'
                                >
                                    계속 쇼핑하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderFail;
