import { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import GlobalContext from 'context/global.context';
import { setCartCount, useHeaderDispatch } from 'context/header.context';
import SEO from 'components/SEO';
import Dimmed from 'components/common/Dimmed';
import Header from 'components/cart/Header';
import QnA from 'components/cart/QnA';
import Empty from 'components/cart/Empty';
import CartTable from 'components/cart/CartTable';
import Controller from 'components/cart/tableParticals/Controller';
import ProductList from 'components/cart/tableParticals/ProductList_dev';
import TotalAmount from 'components/cart/tableParticals/TotalAmount';
import Solicitation from 'components/popup/Solicitation';
import {
    getCart,
    postCart,
    putCart,
    postGuestCart,
    deleteCart,
    postOrderSheets,
    getCartCount,
} from 'api/order';
import gc from 'storage/guestCart.js';
import 'assets/scss/contents.scss';
import 'assets/scss/order.scss';

const Cart = ({ location }) => {
    const { isLogin } = useContext(GlobalContext);
    const headerDispatch = useHeaderDispatch();
    const history = useHistory();

    const [showSolicitation, setShowSolicitation] = useState(false);
    const [wait, setWait] = useState(false);
    const [products, setProducts] = useState([]);
    // 비회원 장바구니에서 재고 소진 등 문제로 해당 상품이 장바구니에서 사라지는 문제를 보정하기 위한 데이터
    const [beforeCountProducts, setBeforeCountProducts] = useState([]);
    const [amount, setAmount] = useState(null);
    const [checkedIndexes, setCheckedIndexes] = useState([]);

    const savingGuestCart = useMemo(() => {
        const { search } = location;
        return search?.includes('savingGuestCart=true');
    }, [location]);
    // put 요청 미리 맵핑해놓음.
    const putProducts = useMemo(
        () =>
            products.map(({ cartNo, orderCnt, optionInputs }) => ({
                cartNo,
                orderCnt,
                optionInputs,
            })),
        [products],
    );
    const productCount = useMemo(
        () => products.reduce((sum, product) => (sum += product.orderCnt), 0),
        [products],
    );
    const allProductIndexes = useMemo(
        () => products.map((_, i) => i),
        [products],
    );
    const checkedProducts = useMemo(
        () => products.filter((_, index) => checkedIndexes.includes(index)),
        [products, checkedIndexes],
    );
    const isUpdate = useMemo(
        () => products.some(({ update }) => update),
        [products],
    );

    const gcUpdate = useCallback((products) => {
        const data = getGuestCartRequest(products);
        gc.cover(data);
    }, []);

    const init = async () => {
        setWait(true);

        if (isLogin && savingGuestCart) {
            gc.fetch();
            if (gc.items.length) {
                await postGuestCartToMemberCart(gc.items);
            }
            history.replace({ query: '' });
        }

        if (isLogin) {
            fetchCart()
                .then((data) => {
                    mapData(data);
                    if (data?.invalidProducts?.length) {
                        removeMemberCartMissingProduct(data.invalidProducts)
                            .then(() => {
                                alert(
                                    '구매 불가한 상품이 포함되어있어 제거 되었습니다.',
                                );
                            })
                            .then(() => window.location.reload());
                        return;
                    }
                    getCartCount().then(({ data: { count } }) =>
                        setCartCount(headerDispatch, count),
                    );
                })
                .catch(console.error)
                .finally(() => setWait(false));
        } else {
            // gc.fetch();
            const body = getGuestCartRequest(gc.items);
            fetchGuestCart(body)
                .then((data) => {
                    mapData(data);
                    checkGuestCartMissingProduct(
                        getMappedData(data.deliveryGroups),
                        gc.items,
                    );
                    gc.fetch();
                    setCartCount(headerDispatch, gc.items.length);
                })
                .catch(console.error)
                .finally(() => setWait(false));
        }
    };

    const mapData = useCallback((responseData) => {
        if (!responseData?.deliveryGroups?.length) {
            reset();
            return;
        }
        const result = getMappedData(responseData.deliveryGroups);
        const { price } = responseData;
        setProducts(result);
        setAmount(price);
    }, []);

    const getMappedData = (deliveryGroups) => {
        if (!deliveryGroups?.length) {
            return [];
        }

        return deliveryGroups.flatMap((delivery) =>
            delivery.orderProducts.flatMap((productGroup) =>
                productGroup.orderProductOptions.flatMap(
                    ({
                        cartNo,
                        imageUrl,
                        orderCnt,
                        price: { standardAmt, salePrice, buyAmt },
                        optionNo,
                        optionTitle,
                        optionInputs,
                    }) => {
                        // debug pores
                        return {
                            productNo: productGroup.productNo,
                            productName: productGroup.productName,
                            cartNo,
                            imageUrl,
                            orderCnt,
                            standardAmt,
                            salePrice,
                            buyAmt,
                            optionNo,
                            optionText: optionTitle,
                            optionInputs,
                            update: false,
                        };
                    },
                ),
            ),
        );
    };

    function removeMemberCartMissingProduct(invalidProducts) {
        const invalidCartNos = invalidProducts
            .flatMap((p) => p.orderProductOptions)
            .map(({ cartNo }) => cartNo);
        return deleteCart({
            cartNo: invalidCartNos.join(','),
        });
    }

    function checkGuestCartMissingProduct(
        availableProducts,
        guestCartStorageItems,
    ) {
        if (guestCartStorageItems.length > availableProducts.length) {
            alert('구매 불가한 상품이 포함되어있어 제거 되었습니다.');
            gcUpdate(availableProducts);
            window.location.reload();
        }
    }

    const goOrder = async () => {
        try {
            const orderSheetNo = await getOrderSheetNo(checkedProducts); // string
            history.push(`/order/sheet?orderSheetNo=${orderSheetNo}`);
        } catch (err) {
            console.error(err);
        }
    };

    async function getOrderSheetNo(products) {
        const request = {
            cartNos: isLogin ? products.map(({ cartNo }) => cartNo) : null,
            products: products.map(
                ({ orderCnt, optionInputs, optionNo, productNo }) => ({
                    orderCnt,
                    optionInputs,
                    optionNo,
                    productNo,
                }),
            ),
        };

        try {
            const {
                data: { orderSheetNo },
            } = await postOrderSheets(request);
            return orderSheetNo;
        } catch (e) {
            console.error(e);
        }
    }

    const submit = () => {
        if (!checkedIndexes.length) {
            alert('구매하실 상품을 선택하여 주세요.');
            return;
        }

        if (!isLogin) {
            openSolicitationPopup();
            return;
        }

        goOrder();
    };

    const openSolicitationPopup = () => setShowSolicitation(true);

    async function fetchCart() {
        try {
            const { data } = await getCart();
            return data;
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    function postGuestCartToMemberCart(items) {
        const result = items.map(
            ({ productNo, optionNo, orderCnt, optionInputs }) => ({
                productNo,
                optionNo,
                orderCnt,
                optionInputs,
            }),
        );
        return postMemberCart(result);
    }

    async function postMemberCart(req) {
        const { status } = await postCart(req);
        return status === 200;
    }

    async function fetchGuestCart(gcItems) {
        try {
            const { data } = await postGuestCart(gcItems); // post & get cart data
            return data;
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    const updateMemberCart = useCallback(async () => {
        try {
            const res = await putCart(putProducts);
            if (res.status === 400) {
                return Promise.reject(res.data);
            }
            const data = await fetchCart();
            mapData(data);
        } catch (err) {
            console.error(err);
        }
        return null;
    }, [mapData, putProducts]);

    const updateGuestCart = useCallback(async () => {
        gcUpdate(products);

        try {
            const data = await fetchGuestCart(gc.items);
            const newProducts = getMappedData(data.deliveryGroups);
            if (beforeCountProducts.length !== newProducts.length) {
                alert('상품의 재고가 충분치 않습니다.');
                gcUpdate(beforeCountProducts);
                window.location.reload();
                return;
            }
            mapData(data);
        } catch (err) {
            console.error(err);
        }
        return null;
    }, [beforeCountProducts, gcUpdate, mapData, products]);

    const updateCart = useCallback(() => {
        setWait(true);
        if (isLogin) {
            updateMemberCart()
                .then(() => setWait(false))
                .catch(handlePutCartError);
        } else {
            updateGuestCart()
                .then(() => setWait(false))
                .catch(() => window.location.reload());
        }
    }, [isLogin, updateGuestCart, updateMemberCart]);

    function handlePutCartError({ code }) {
        if (!code) {
            window.location.reload();
        }
        if (code === 'PPVE0011') {
            alert('상품의 재고가 충분치 않습니다.');
        }
        if (code === 'O8002' || code === 'O8003' || code === 'O8004') {
            alert('최대 구매 가능갯수를 초과하였습니다.');
        }

        window.location.reload();
    }

    const deleteMemberCart = useCallback(
        (cartNos) => {
            deleteCart({
                cartNo: cartNos.join(','),
            }).then(() => init());
        },
        [init],
    );

    const deleteGuestCart = useCallback(
        (indexes) => {
            const newItems = gc.items.filter((_, i) => !indexes.includes(i));
            gc.cover(newItems);
            init();
        },
        [init],
    );

    const deleteItem = useCallback(
        (itemNo) => {
            // productNo 보다 유니크함
            if (isLogin) {
                deleteMemberCart([itemNo]);
            } else {
                deleteGuestCart([itemNo]);
            }
        },
        [isLogin, deleteMemberCart, deleteGuestCart],
    );

    const deleteItems = (nos) => {
        // productNo 보다 유니크함
        if (isLogin) {
            const cartNos = nos;
            deleteMemberCart(cartNos);
        } else {
            const indexs = nos;
            deleteGuestCart(indexs);
        }
    };

    function getGuestCartRequest(gcItems) {
        return gcItems.map(
            ({
                cartNo,
                productNo,
                optionNo,
                orderCnt,
                optionInputs,
                channelType,
            }) => ({
                cartNo,
                productNo,
                optionNo,
                orderCnt,
                optionInputs,
                channelType,
            }),
        );
    }

    const reset = () => {
        setProducts([]);
        setAmount(null);
    };

    const changeQuantity = useCallback(
        (productIndex, value) => {
            setBeforeCountProducts(JSON.parse(JSON.stringify(products))); // 비회원

            const newProducts = isLogin
                ? products.concat().reverse()
                : products.sort((a, b) => (a.cartNo > b.cartNo ? -1 : 1));

            newProducts[productIndex].orderCnt += value;
            newProducts[productIndex].update = true;
            // FIX: 함수형으로 업데이트할 경우 count가 2씩 증가함
            setProducts([...newProducts]);

            // setProducts((prev) => {
            //     // 이미 이전값에 2가 증가해있음!
            //     console.log('beforePrev');
            //     console.log(prev);
            //     console.log(prev[productIndex]);
            //     prev[productIndex].orderCnt += value;
            //     prev[productIndex].update = true;

            //     console.log('afterPrev');
            //     console.log(prev);
            //     console.log(prev[productIndex]);

            //     return [...prev];
            // });
        },
        [isLogin, products, setBeforeCountProducts, setProducts],
    );

    useEffect(init, []);

    useEffect(() => {
        isUpdate && updateCart();
        setCheckedIndexes(allProductIndexes);
    }, [isUpdate, updateCart, allProductIndexes]);

    return (
        <>
            <SEO data={{ title: '장바구니' }} />
            {wait && <Dimmed />}
            <div className='contents order'>
                <div className='container' id='container'>
                    <div className='content order_page'>
                        <div className='order_box'>
                            <Header />
                            {products.length < 1 ? (
                                <Empty />
                            ) : (
                                <>
                                    <Controller
                                        products={products}
                                        checkedIndexes={checkedIndexes}
                                        setCheckedIndexes={setCheckedIndexes}
                                        checkedProducts={checkedProducts}
                                        deleteItems={deleteItems}
                                    />
                                    <CartTable>
                                        <ProductList
                                            products={products}
                                            deleteItem={deleteItem}
                                            checkedIndexes={checkedIndexes}
                                            setCheckedIndexes={
                                                setCheckedIndexes
                                            }
                                            changeQuantity={changeQuantity}
                                        />
                                        {amount && (
                                            <TotalAmount
                                                productCount={productCount}
                                                amount={amount}
                                            />
                                        )}
                                        <div className='button_wrap'>
                                            <Link
                                                to='/'
                                                className='button button_negative'
                                            >
                                                쇼핑 계속 하기
                                            </Link>
                                            <button
                                                type='button'
                                                className='button button_positive popup_comm_btn'
                                                onClick={submit}
                                            >
                                                구매하기
                                            </button>
                                            {showSolicitation && (
                                                <Solicitation
                                                    goOrder={goOrder}
                                                    close={() =>
                                                        setShowSolicitation(
                                                            false,
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </CartTable>
                                    <QnA />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
