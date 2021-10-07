import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import Alert from '../common/Alert';
import GlobalContext from '../../context/global.context';
import { getCart } from '../../api/order';
import gc from '../../storage/guestCart';
import { useProfileState } from '../../context/profile.context';

const HsValidator = forwardRef((prop, ref) => {
  const { isLogin } = useContext(GlobalContext);
  const { hasMemberGroup } = useProfileState();
  const [rejectReason, setRejectReason] = useState(null); // null |
  // 'BASIC_PRODUCT_INSERTED'
  // |
  // 'HS_PRODUCT_INSERTED'

  useImperativeHandle(ref, () => ({
    async validation (isHsCodeProduct) {
      // if (!isLogin && gc.items.length < 1) {
      //   return true;
      // }
      if (!isLogin || !hasMemberGroup) return true;

      const { deliveryGroups } = await fetchCart();
      if (deliveryGroups.length === 0) return true;

      // const hasHsCode = isLogin ? await fetchHasHsCode() : guestCartHasHsCode();
      // const succeed = isHsCodeProduct === hasHsCode;
      const _hasHsCode = hasHsCode(deliveryGroups);
      const succeed = isHsCodeProduct === _hasHsCode;
      
      if (!succeed) {
        setRejectReason(
          _hasHsCode ? 'HS_PRODUCT_INSERTED' : 'BASIC_PRODUCT_INSERTED');
      }
      return succeed;
    },
  }));

  function fetchHasHsCode () {
    return fetchCart().then(hasHsCode);
  }

  function guestCartHasHsCode () {
    return gc.items.some(({ hsCode }) => hsCode);
  }

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

  function hasHsCode (deliveryGroups) {
    return deliveryGroups.some(delivery =>
      delivery.orderProducts.some(({ hsCode }) => hsCode),
    );
  }

  return (
    <>
      {
        rejectReason &&
        <Alert onClose={() => setRejectReason(null)}>
          {
            rejectReason === 'BASIC_PRODUCT_INSERTED'
              ? '등급 상품은 일반 상품과 함께 구매하실 수 없습니다.'
              : '일반 상품은 등급 상품과 함께 구매하실 수 없습니다.'
          }
        </Alert>
      }
    </>
  );
});

export default HsValidator;