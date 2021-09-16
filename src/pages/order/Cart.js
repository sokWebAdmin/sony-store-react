import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

// components
import SEOHelmet from '../../components/SEOHelmet';
import Header from '../../components/cart/Header';
import QnA from '../../components/cart/QnA';
import Empty from '../../components/cart/Empty';

import ProductList from '../../components/cart/ProductList';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';
import GlobalContext from '../../context/global.context';
import { getCart } from '../../api/order';

// module
import gc from '../../storage/guestCart.js';

const Cart = () => {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);

  const [cartEmpty, setCartEmpty] = useState(false);

  const init = () => {
    if (isLogin) {
      fetchCart().catch(console.error);
    }
    else {
      gc.fetch();
    }
  };

  useEffect(init, []);

  async function fetchCart () {
    try {
      const { data } = await getCart();
      if (data.deliveryGroups.length < 1) {
        setCartEmpty(true);
        return;
      }
    }
    catch (err) {
      console.error(err);
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
              {cartEmpty
                ? <Empty />
                :
                <>
                  <ProductList />
                  <div className="button_wrap">
                    <a className="button button_negative">쇼핑 계속 하기</a>
                    <button type="submit"
                            className="button button_positive popup_comm_btn"
                            data-popup-name="login_chk_order" onClick={() => {
                      history.push('/order/sheet');
                    }}>구매하기
                    </button>
                  </div>
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