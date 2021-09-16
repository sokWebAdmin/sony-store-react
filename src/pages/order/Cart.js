import React from 'react';
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

const Cart = () => {
  const history = useHistory();

  return (
    <>
      <SEOHelmet title={'장바구니'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page">
            <div className="order_box">
              <Header />

              <Empty />

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;