import PropTypes from 'prop-types';

import { toCurrencyString } from 'utils/unit';

const ProductList = ({
    products,
    deleteItem,
    checkedIndexes,
    setCheckedIndexes,
    changeQuantity,
}) => {
    console.log('🚀 ~ file: ProductList.js ~ line 12 ~ products', products);
    const onCheck = (event, index) => {
        const { checked } = event.currentTarget;

        setCheckedIndexes(
            checked
                ? [...checkedIndexes, index]
                : checkedIndexes.filter((v) => v !== index),
        );
    };

    return (
        <div className='col_table'>
            <div className='col_table_head'>
                <div className='col_table_row'>
                    <div className='col_table_cell'>제품</div>
                    <div className='col_table_cell'>가격</div>
                    <div className='col_table_cell'>수량</div>
                    <div className='col_table_cell'>합계</div>
                    <div className='col_table_cell ir'>삭제</div>
                </div>
            </div>

            <div className='col_table_body'>
                {products.map(
                    (
                        {
                            optionNo,
                            imageUrl,
                            productName,
                            salePrice,
                            orderCnt,
                            buyAmt,
                            cartNo,
                        },
                        index,
                    ) => (
                        <div className='col_table_row' key={optionNo}>
                            <div className='col_table_cell prd_wrap tal'>
                                <div className='prd'>
                                    <div className='check check_only'>
                                        <input
                                            type='checkbox'
                                            className='inp_check'
                                            name='check_cart_item'
                                            checked={checkedIndexes.some(
                                                (v) => v === index,
                                            )}
                                            onChange={(event) =>
                                                onCheck(event, index)
                                            }
                                        />
                                    </div>
                                    <div className='prd_thumb'>
                                        <img
                                            className='prd_thumb_pic'
                                            src={imageUrl}
                                            alt={productName}
                                        />
                                    </div>
                                    <div className='prd_info'>
                                        <div className='prd_info_name'>
                                            {productName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col_table_cell prd_price'>
                                {toCurrencyString(salePrice)}
                                <span className='won'>원</span>
                            </div>
                            <div className='col_table_cell prd_count'>
                                <div className='count_ui_box'>
                                    <button
                                        className='minus'
                                        onClick={() =>
                                            changeQuantity(index, -1)
                                        }
                                        disabled={orderCnt <= 1}
                                    >
                                        감소
                                    </button>
                                    <input
                                        type='text'
                                        readOnly='readonly'
                                        value={orderCnt}
                                        className='count'
                                    />
                                    <button
                                        className='plus'
                                        onClick={() => changeQuantity(index, 1)}
                                    >
                                        증가
                                    </button>
                                </div>
                            </div>
                            <div className='col_table_cell prd_total'>
                                {toCurrencyString(buyAmt)}{' '}
                                <span className='won'>원</span>
                            </div>
                            <div className='col_table_cell'>
                                <button
                                    type='button'
                                    className='btn_del_prd'
                                    onClick={() => deleteItem(cartNo || index)}
                                >
                                    <img
                                        src='../../images/common/ic_close.svg'
                                        alt='제품 삭제'
                                    />
                                </button>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    checkedIndexes: PropTypes.array.isRequired,
    setCheckedIndexes: PropTypes.func.isRequired,
    changeQuantity: PropTypes.func.isRequired,
};

export default ProductList;
