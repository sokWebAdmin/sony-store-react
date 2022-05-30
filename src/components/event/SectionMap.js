import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { unescape } from 'lodash';

import HsValidator from 'components/cart/HsValidator';
import { toCurrencyString } from 'utils/unit';
import { getSaleStatus } from 'utils/product';

const SectionMap = ({ product, gift, giftProduct, addToCart, hsValidator }) => {
    const history = useHistory();
    const isSoldOut = ['SOLDOUT', 'READY'].includes(
        getSaleStatus(
            { saleStatusType: product.saleStatusType },
            product.reservationData,
            product.stockCnt,
            product.reservationData?.reservationStockCnt,
        ),
    );

    const getStickerLabel = (product) =>
        product.stickerLabels.find((label) => label.includes('급'));

    const discountPrice =
        product.immediateDiscountAmt + product.additionDiscountAmt;

    return (
        <div className='product'>
            {discountPrice > 0 && (
                <span className='badge_txt'>
                    {toCurrencyString(discountPrice)}
                    <span className='unit'>원</span> OFF
                </span>
            )}
            {getStickerLabel(product) && (
                <span
                    className={`badge_state state_${getStickerLabel(product)
                        .substring(0, 1)
                        .toLowerCase()}`}
                >
                    {getStickerLabel(product).substring(0, 1)}
                    <span className='txt'>급</span>
                </span>
            )}
            <div className='product_pic'>
                <Link
                    className='product_link'
                    to={`/product-view/${product.productNo}`}
                >
                    <img src={product.imageUrls[0]} alt={product.productName} />
                </Link>
                {isSoldOut && (
                    <div className='sold_out'>
                        <span>SOLD OUT</span>
                    </div>
                )}
            </div>

            <div className='product_name'>
                <Link
                    to={`/product-view/${product.productNo}`}
                    className='product_name_title'
                >
                    {unescape(product.productName)}
                </Link>
                <p className='product_name_desc'>{product.productNameEn}</p>
                <div className='product_name_price'>
                    <div className='original'>
                        {product.salePrice !==
                            product.salePrice - discountPrice && (
                            <>
                                {toCurrencyString(product.salePrice)}{' '}
                                <span className='unit'>원</span>
                            </>
                        )}
                    </div>
                    <div className='sale'>
                        {toCurrencyString(product.salePrice - discountPrice)}{' '}
                        <span className='unit'>원</span>
                    </div>
                </div>
                <div className='product_btn_wrap'>
                    <button
                        type='button'
                        className='button button_secondary button-s view'
                        onClick={() =>
                            history.push(`/product-view/${product.productNo}`)
                        }
                    >
                        <i className='ico search' />
                        제품 보기
                    </button>
                    {!isSoldOut && gift && (
                        <button
                            type='button'
                            className='button button_secondary button-s'
                            onClick={() => giftProduct(product.productNo)}
                        >
                            <i className='ico gift'></i>선물하기
                        </button>
                    )}
                    <button
                        type='button'
                        className='button button_positive button-s'
                        onClick={() => addToCart(product.productNo)}
                        disabled={isSoldOut}
                    >
                        {isSoldOut ? '일시품절' : '장바구니 담기'}
                    </button>
                    <HsValidator ref={hsValidator} />
                </div>
            </div>
        </div>
    );
};

SectionMap.propTypes = {
    product: PropTypes.shape({
        productNo: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productNameEn: PropTypes.string.isRequired,
        imageUrls: PropTypes.array.isRequired,
        salePrice: PropTypes.number.isRequired,
        immediateDiscountAmt: PropTypes.number.isRequired,
        additionDiscountAmt: PropTypes.number.isRequired,
    }),
    gift: PropTypes.bool.isRequired,
    giftProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default memo(SectionMap);
