import React, { useEffect, useContext, useState } from 'react';
import gc from '../../storage/guestCart.js';
import GlobalContext from '../../context/global.context';
import { getCartCount } from '../../api/order';
import { setCartCount, useHeaderDispatch, useHeaderState } from '../../context/header.context';
import { useLocation } from 'react-router-dom';

const CartCount = ({ isOpened, className = '' }) => {
  const location = useLocation();
  const { isLogin } = useContext(GlobalContext);
  const { cartCount } = useHeaderState();
  const headerDispatch = useHeaderDispatch();

  const init = () => {
    if (isLogin) {
      fetchCount().catch(console.error);
    }
    else {
      gc.fetch();
      setCartCount(headerDispatch, gc.items.length);
    }
  };

  useEffect(() => {
    if (!isOpened) {
      init();
    }
  }, [isOpened, location]);

  function fetchCount () {
    return getCartCount().then(({ data: { count } }) => setCartCount(headerDispatch, count));
  }

  return (
    <span className={className}>
      {cartCount}
    </span>
  );
};

export default CartCount;