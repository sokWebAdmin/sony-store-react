import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toCurrencyString } from 'utils/unit';

const CouponListItem = ({
    couponName,
    minSalePrice,
    issueYmdt,
    useEndYmdt,
}) => {
    return (
        <div className='coupon_box'>
            <span className='coupon_type'>COUPON</span>
            <div className='coupon'>
                <div className='coupon_head'>
                    <div className='tit'>
                        <div dangerouslySetInnerHTML={{ __html: couponName }} />
                    </div>
                    <p className='cut_txt'>
                        {toCurrencyString(minSalePrice)}원 이상 구매 시
                    </p>
                </div>
                <p className='expiration_txt'>
                    <strong>유효 기간 </strong>
                    {`${dayjs(issueYmdt).format('YYYY-MM-DD')} ~ ${dayjs(
                        useEndYmdt,
                    ).format('YYYY-MM-DD')}`}
                </p>
            </div>
        </div>
    );
};

CouponListItem.propTypes = {
    couponName: PropTypes.string.isRequired,
    minSalePrice: PropTypes.number,
    issueYmdt: PropTypes.string,
    useEndYmdt: PropTypes.string,
};

export default CouponListItem;
