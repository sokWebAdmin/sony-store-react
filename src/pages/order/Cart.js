import React, { useState, useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/global.context';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Dimmed from '../../components/common/Dimmed';
import Header from '../../components/cart/Header';
import QnA from '../../components/cart/QnA';
import Empty from '../../components/cart/Empty';
import CartTable from '../../components/cart/CartTable';

import Controller from '../../components/cart/tableParticals/Controller';
import ProductList from '../../components/cart/tableParticals/ProductList';
import TotalAmount from '../../components/cart/tableParticals/TotalAmount';
import Solicitation from '../../components/popup/Solicitation';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// api
import {
  getCart,
  postCart,
  putCart,
  postGuestCart,
  deleteCart,
  postOrderSheets, getCartCount,
} from '../../api/order';

// module
import gc from '../../storage/guestCart.js';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { setCartCount, useHeaderDispatch } from '../../context/header.context';

const Cart = ({ location }) => {
  const { isLogin } = useContext(GlobalContext);
  const headerDispatch = useHeaderDispatch();
  const history = useHistory();

  const savingGuestCart = useMemo(() => {
    const { search } = location;
    return search?.includes('savingGuestCart=true');

  }, [location]);

  // popup
  const [showSolicitation, setShowSolicitation] = useState(false);

  // state
  const [wait, setWait] = useState(false);
  const [products, setProducts] = useState([]);
  const [beforeCountProducts, setBeforeCountProducts] = useState([]); // 비회원
                                                                      // 장바구니에서
                                                                      // 재고 소진등
                                                                      // 문제로 해당
                                                                      // 상품이
                                                                      // 장바구니에서
                                                                      // 사라지는
                                                                      // 문제
                                                                      // 보정하기
                                                                      // 위한 데이터
  const putProducts = useMemo(
    () =>
      products.map((product) => ({
        // put 요청 미리 맵핑해놓음.
        cartNo: product.cartNo,
        orderCnt: product.orderCnt,
        optionInputs: product.optionInputs,
      })),
    [products],
  );
  useEffect(() => {
    const isUpdate = products.some(({ update }) => update);
    isUpdate && updateCart();
    setCheckedIndexes(allProductIndexes);
  }, [products]);

  const productCount = useMemo(() => products.reduce((sum, product) => (sum += product.orderCnt), 0), [products]);
  const allProductIndexes = useMemo(() => products.map((_, i) => i), [products]);

  const [amount, setAmount] = useState(null);
  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const checkedProducts = useMemo(
    () => products.filter((_, index) => checkedIndexes.includes(index)),
    [products, checkedIndexes],
  );

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
            removeMemberCartMissingProduct(data.invalidProducts).then(() => {
              alert('구매 불가한 상품이 포함되어있어 제거 되었습니다.')
            }).then(() => window.location.reload())
            return;
          }
          getCartCount().then(({ data: { count } }) => setCartCount(headerDispatch, count));
        })
        .catch(console.error)
        .finally(() => setWait(false));
    } else {
      gc.fetch();
      const body = getGuestCartRequest(gc.items);
      fetchGuestCart(body)
        .then((data) => {
        mapData(data);
        checkGuestCartMissingProduct(getMappedData(data.deliveryGroups),
          gc.items);
        gc.fetch();
        setCartCount(headerDispatch, gc.items.length);
      }).catch(console.error).finally(() => setWait(false));
    }
  };

  function removeMemberCartMissingProduct(invalidProducts) {
    const invalidCartNos = invalidProducts.flatMap(p => p.orderProductOptions).map(({ cartNo }) => cartNo)
    return deleteCart({
      cartNo: invalidCartNos.join(',')
    })
  }

  function checkGuestCartMissingProduct (
    availableProducts, guestCartStorageItems) {
    if (guestCartStorageItems.length > availableProducts.length) {
      alert('구매 불가한 상품이 포함되어있어 제거 되었습니다.');
      gcUpdate(availableProducts);
      location.reload();
    }
  }

  const goOrder = async () => {
    try {
      const orderSheetNo = await getOrderSheetNo(checkedProducts); // string
      history.push(`/order/sheet?orderSheetNo=${orderSheetNo}`);
    }
    catch (err) {
      console.error(err);
    }
  };

  async function getOrderSheetNo(products) {
    const request = {
      cartNos: isLogin ? products.map(({ cartNo }) => cartNo) : null,
      products: products.map(({ orderCnt, optionInputs, optionNo, productNo }) => ({
        orderCnt,
        optionInputs,
        optionNo,
        productNo,
      })),
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

  useEffect(init, []);

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
      }));
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

  function updateCart() {
    setWait(true);
    if (isLogin) {
      updateMemberCart().then(() => setWait(false)).catch(handlePutCartError);
    } else {
      updateGuestCart().then(() => setWait(false)).catch(() => window.location.reload());
    }
  }

  function handlePutCartError({ code }) {
    if (!code) {
      window.location.reload();
    }
    if (code === 'PPVE0011') {
      alert('상품의 재고가 충분치 않습니다.');
    }
    if (code === 'O8002' || code === 'O8003' || code === 'O8004') {
      alert(
        '최대 구매 가능갯수를 초과하였습니다.');
    }

    window.location.reload();
  }

  async function updateMemberCart() {
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
  }

  async function updateGuestCart() {
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
  }

  function deleteItem(no) {
    // productNo 보다 유니크함
    if (isLogin) {
      const cartNo = no;
      deleteMemberCart([cartNo]);
    } else {
      const index = no;
      deleteGuestCart([index]);
    }
  }

  function deleteItems(nos) {
    // productNo 보다 유니크함
    if (isLogin) {
      const cartNos = nos;
      deleteMemberCart(cartNos);
    } else {
      const indexs = nos;
      deleteGuestCart(indexs);
    }
  }

  function deleteMemberCart(cartNos) {
    deleteCart({
      cartNo: cartNos.join(','),
    }).then(() => init());
  }

  function deleteGuestCart(indexes) {
    const newItems = gc.items.filter((_, i) => !indexes.includes(i));
    gc.cover(newItems);
    init();
  }

  function gcUpdate (products) {
    const data = getGuestCartRequest(products);
    gc.cover(data);
  }

  function getGuestCartRequest(gcItems) {
    return gcItems.map(({ cartNo, productNo, optionNo, orderCnt, optionInputs, channelType }) => ({
      cartNo,
      productNo,
      optionNo,
      orderCnt,
      optionInputs,
      channelType,
    }));
  }

  function mapData (responseData) {
    if (!responseData?.deliveryGroups?.length) {
      reset();
      return;
    }
    const result = getMappedData(responseData.deliveryGroups);
    const { price } = responseData;
    setProducts(result);
    setAmount(price);
  }

  function getMappedData (deliveryGroups) {
    if (!deliveryGroups?.length) {
      return [];
    }

    return deliveryGroups.flatMap((delivery) =>
      delivery.orderProducts.flatMap((productGroup) =>
        productGroup.orderProductOptions.flatMap((product) => {
          // debug pores
          return {
            productNo: productGroup.productNo,
            productName: productGroup.productName,
            cartNo: product.cartNo,
            imageUrl: product.imageUrl,
            orderCnt: product.orderCnt,
            standardAmt: product.price.standardAmt,
            salePrice: product.price.salePrice,
            buyAmt: product.price.buyAmt,
            optionNo: product.optionNo,
            optionText: product.optionTitle,
            optionInputs: product.optionInputs,
            update: false,
          };
        }),
      ),
    );
  }

  function reset () {
    setProducts([]);
    setAmount(null);
  }

  return (
    <>
      <SEOHelmet title={'장바구니'} />
      {wait && <Dimmed />}
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
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
                      setProducts={setProducts}
                      setBeforeCountProducts={setBeforeCountProducts}
                      deleteItem={deleteItem}
                      checkedIndexes={checkedIndexes}
                      setCheckedIndexes={setCheckedIndexes}
                    />
                    {amount && <TotalAmount productCount={productCount} amount={amount} />}
                    <div className="button_wrap">
                      <Link to="/" className="button button_negative">
                        쇼핑 계속 하기
                      </Link>
                      <button type="button" className="button button_positive popup_comm_btn" onClick={submit}>
                        구매하기
                      </button>
                      {showSolicitation && <Solicitation goOrder={goOrder} close={() => setShowSolicitation(false)} />}
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
