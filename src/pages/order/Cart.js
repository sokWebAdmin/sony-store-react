import React, { useState, useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/global.context';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Header from '../../components/cart/Header';
import QnA from '../../components/cart/QnA';
import Empty from '../../components/cart/Empty';
import CartTable from '../../components/cart/CartTable';

import Controller from '../../components/cart/tableParticals/Controller';
import ProductList from '../../components/cart/tableParticals/ProductList';
import TotalAmount from '../../components/cart/tableParticals/TotalAmount';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';

// api
import { getCart, putCart, postGuestCart } from '../../api/order';

// module
import gc from '../../storage/guestCart.js';
import { usePrevious } from '../../hooks';

const Cart = () => {
  const { isLogin } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const putProducts = useMemo(() => products.map(product => ({
    cartNo: product.cartNo,
    orderCnt: product.orderCnt,
    optionInputs: product.optionInputs,
  })), [products]);
  useEffect(() => {
    const isUpdate = products.some(({ update }) => update);
    isUpdate && putGet();
  }, [products]);

  const productCount = useMemo(() => products.length, [products]);

  const [amount, setAmount] = useState(null);
  const [checkedIndexes, setCheckedIndexes] = useState([]);

  const init = () => {
    if (isLogin) {
      fetchCart().then(mapData).catch(console.error);

    }
    else {
      gc.fetch();
      const body = getGuestCartRequest(gc.items);
      fetchGuestCart(body).then(mapData);
    }
  };

  useEffect(init, []);

  async function fetchCart () {
    try {
      const { data } = await getCart();
      return data;
    }
    catch (err) {
      console.error(err);
    }
    return null;
  }

  async function fetchGuestCart (products) {
    try {
      const { data } = await postGuestCart(products); // post & get cart data
      return data;
    }
    catch (err) {
      console.error(err);
    }
    return null;
  }

  async function putGet () {
    if (isLogin) {
      try {
        await putCart(putProducts);
        const data = await fetchCart();
        mapData(data);
      }
      catch (err) {
        console.error(err);
      }
      return null;
    }
  }

  function getGuestCartRequest (gcItems) {
    return gcItems.map(
      ({ cartNo, productNo, optionNo, orderCnt, optionInputs, channelType }) => ({
        cartNo, productNo, optionNo, orderCnt, optionInputs, channelType,
      }));
  }

  function mapData (responseData) {
    const { deliveryGroups, price } = responseData;

    if (!deliveryGroups?.length) {
      return;
    }

    const result = deliveryGroups.flatMap(delivery =>
      delivery.orderProducts.flatMap(productGroup =>
        productGroup.orderProductOptions.flatMap(product => {
            // debug pores
            return {
              productNo: productGroup.productNo,
              productName: productGroup.productName,
              cartNo: product.cartNo,
              imageUrl: product.imageUrl,
              orderCnt: product.orderCnt,
              standardAmt: product.price.standardAmt,
              buyAmt: product.price.buyAmt,
              optionNo: product.optionNo,
              optionText: product.optionTitle,
              optionInputs: product.optionInputs,
              update: false,
            };
          },
        )));

    setProducts(result);
    if (price) {
      setAmount(price);
    }
  }

  return (
    <>
      <SEOHelmet title={'장바구니'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <Header />
              {products.length < 1
                ? <Empty />
                :
                <>
                  <Controller
                    products={products}
                    checkedIndexes={checkedIndexes}
                    setCheckedIndexes={setCheckedIndexes}
                  />
                  <CartTable>
                    <ProductList
                      cartUpdate={putGet}
                      products={products}
                      setProducts={setProducts}
                      checkedIndexes={checkedIndexes}
                      setCheckedIndexes={setCheckedIndexes}
                    />
                    {amount &&
                    <TotalAmount
                      productCount={productCount}
                      amount={amount}
                    />
                    }
                  </CartTable>
                  <QnA />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;