import { memo } from 'react';
import { Link } from 'react-router-dom';

import Alert from 'components/common/Alert';
import { useAlert } from 'hooks';

const CustomerService = () => {
    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

    const onClickCustomer = (e) => {
        e.preventDefault();

        openAlert(
            '고객님께서 원하시는 제품을<br />빠르고 정확하게 구매하실 수 있도록<br />도와드리겠습니다.<br/>고객지원센터: 1588-0911',
        );
    };

    const onServiceClick = (e) => {
        e.preventDefault();

        window.open(
            `${window.anchorProtocol}www.sony.co.kr/electronics/support`,
        );
    };

    return (
        <>
            <div className='main__help'>
                <h2 className='main__help__title'>
                    무엇을
                    <br />
                    도와드릴까요?
                </h2>
                <ul className='main__help__lists'>
                    <li className='main__help__list notice'>
                        <Link to='/faq'>FAQ & 공지사항</Link>
                    </li>
                    <li className='main__help__list location'>
                        <Link to='/store-info'>매장안내</Link>
                    </li>
                    <li className='main__help__list customer'>
                        <Link to='' onClick={onClickCustomer}>
                            고객센터
                        </Link>
                    </li>
                    <li className='main__help__list service'>
                        <Link to='' onClick={onServiceClick}>
                            제품지원
                        </Link>
                    </li>
                </ul>
            </div>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
        </>
    );
};

export default memo(CustomerService);
