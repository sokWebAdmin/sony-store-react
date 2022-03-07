import { useState, useMemo } from 'react';
import { toCurrencyString } from '../../../utils/unit.js';
import {
    getProductsOptions,
    postProfileLikeProducts,
} from '../../../api/product';
import Confirm from '../../common/Confirm';
import Alert from '../../common/Alert';
import { postCart } from '../../../api/order';
import Notification from '../../products/Notification';
import { useAlert } from '../../../hooks';
import ViewMore from '../../common/ViewMore';
import { isTablet } from 'react-device-detect';
import { useHistory } from 'react-router-dom';

const WishList = ({ wishList, wishCount, more, rerender }) => {
    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

    const [checkedProductNos, setCheckedProductNos] = useState([]);

    const allChecked = useMemo(
        () => wishList.length === checkedProductNos.length,
        [wishList, checkedProductNos],
    );

    const check = (productNo) => {
        const newList = checkedProductNos.includes(productNo)
            ? checkedProductNos.filter((no) => no !== productNo)
            : [...checkedProductNos, productNo];
        setCheckedProductNos(newList);
    };

    const allCheck = (all) => {
        if (all) {
            const allProductNos = wishList.map(({ productNo }) => productNo);
            setCheckedProductNos(allProductNos);
        } else {
            setCheckedProductNos([]);
        }
    };

    const deleteChecked = (confirm) => {
        if (!checkedProductNos.length) {
            setCheckAlert(true);
            return;
        }

        if (!confirm) {
            wishList.length === checkedProductNos.length
                ? setAllDeleteConfirm(true)
                : setDeleteConfirm(true);
            return;
        }

        const request = {
            productNos: checkedProductNos,
        };

        postProfileLikeProducts(request)
            .then(() => setCheckedProductNos([]))
            .then(rerender)
            .catch(console.error);
    };

    const addToCart = async () => {
        if (checkedProductNos.length === 0) {
            return openAlert('제품을 선택해 주세요');
        }
        const {
            data: { optionInfos },
        } = await getProductsOptions({ productNos: checkedProductNos });
        const request = optionInfos.map((product) => ({
            productNo: product.mallProductNo,
            optionNo: product.options[0].optionNo,
            orderCnt: 1,
        }));
        const { status } = await postCart(request);
        if (status === 200) {
            setCartNotify(true);
        } else {
            alert('장바구니 담기 실패');
        }
    };

    const [allDeleteConfirm, setAllDeleteConfirm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [checkAlert, setCheckAlert] = useState(false);
    const [cartNotify, setCartNotify] = useState(false);

    const handleAllDeleteConfirm = (status) => {
        if (status === 'ok') {
            deleteChecked(true);
            setAllDeleteConfirm(false);
        } else {
            setAllDeleteConfirm(false);
        }
    };

    const handleDeleteConfirm = (status) => {
        if (status === 'ok') {
            deleteChecked(true);
            setDeleteConfirm(false);
        } else {
            setDeleteConfirm(false);
        }
    };

    return (
        <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            <div className='cont history_like'>
                {allDeleteConfirm && (
                    <Confirm onClose={handleAllDeleteConfirm}>
                        찜한 제품 전체를 삭제하시겠습니까?
                    </Confirm>
                )}
                {deleteConfirm && (
                    <Confirm onClose={handleDeleteConfirm}>
                        선택한 제품을 삭제하시겠습니까?
                    </Confirm>
                )}
                {checkAlert && (
                    <Alert onClose={() => setCheckAlert(false)}>
                        제품을 선택해주세요.
                    </Alert>
                )}
                {cartNotify && (
                    <Notification
                        setNotificationVisible={setCartNotify}
                        type='cart'
                    />
                )}

                <div className='cont_head'>
                    <h3 className='cont_tit' id='wish-tit'>
                        찜
                    </h3>
                    {/* s : 찜 목록이 없을 경우 display:none */}
                    <div className='like_select_btn'>
                        <button
                            onClick={() => deleteChecked(false)}
                            className='button button_secondary button-s'
                            type='button'
                        >
                            선택 삭제
                        </button>
                        <button
                            className='button button_positive button-s popup_comm_btn'
                            type='button'
                            data-popup-name='cart_pop'
                            onClick={addToCart}
                        >
                            <span>선택 제품</span> 장바구니 담기
                        </button>
                    </div>
                    {/* e : 찜 목록이 없을 경우 display:none */}
                </div>
                <div className='history_inner'>
                    <div className='history_list'>
                        {wishList?.length > 0 ? (
                            <div className='like_inner on'>
                                <div className='all_checked check'>
                                    <input
                                        type='checkbox'
                                        className='inp_check check_all'
                                        id='allChk'
                                        name='likeChk'
                                        checked={allChecked}
                                        onChange={() => allCheck(!allChecked)}
                                    />
                                    <label htmlFor='allChk'>전체</label>
                                </div>
                                <div className='like_prd_inner'>
                                    <Products
                                        list={wishList}
                                        check={check}
                                        checkedProductNos={checkedProductNos}
                                    />
                                </div>
                                <ViewMore
                                    totalCount={wishCount}
                                    viewMore={more}
                                    pageSize={isTablet ? 9 : 8}
                                />
                            </div>
                        ) : (
                            <div className='no_data on'>
                                <span>내역이 없습니다.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const Products = ({ list, check, checkedProductNos }) => {
    const history = useHistory();

    return (
        <ul className='like_prd_list'>
            {list.map((item) => (
                <li className='like_list' key={item.productNo}>
                    <div className='item'>
                        <div className='check check_only'>
                            <input
                                type='checkbox'
                                className='inp_check'
                                checked={checkedProductNos.includes(
                                    item.productNo,
                                )}
                                name='likeChk'
                                onChange={() => check(item.productNo)}
                            />
                        </div>
                        <div
                            className='img'
                            onClick={() =>
                                history.push(`/product-view/${item.productNo}`)
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={item.listImageUrls[0]}
                                alt={item.productName}
                            />
                        </div>
                        <div
                            className='prd_info'
                            onClick={() =>
                                history.push(`/product-view/${item.productNo}`)
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <p className='tit'>{item.productName}</p>
                            <p className='txt'>{item.productNameEn}</p>
                            <p className='prd_price'>
                                <span className='price'>
                                    {toCurrencyString(item.salePrice)}
                                </span>
                                원
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default WishList;
