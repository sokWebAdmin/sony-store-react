import { useEffect, useContext, useState } from 'react';
import gc from '../../storage/guestCart.js';
import GlobalContext from '../../context/global.context';
import { getCartCount } from '../../api/order';

const CartCount = ({ isOpened }) => {
  const { isLogin } = useContext(GlobalContext);
  const items = gc.items;

  const init = () => {
    if (isLogin) {
      fetchCount().catch(console.error);
    }
    else {
      gc.fetch();
      setCount(items.length);
    }
  };

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isOpened && isLogin) {
      init();
    }
  }, [items, isLogin, isOpened]);

  function fetchCount () {
    return getCartCount().then(({ data: { count } }) => setCount(count));
  }

  return (
    <span>
      {count}
    </span>
  );
};

export default CartCount;