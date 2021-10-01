import { useContext, useState, forwardRef, useImperativeHandle } from 'react';

import Alert from '../common/Alert';
import GlobalContext from '../../context/global.context';
import { getCart } from '../../api/order';

const HsValidationMiddleware = forwardRef((prop, ref) => {
  const { isLogin } = useContext(GlobalContext);
  const [rejectReason, setRejectReason] = useState(null); // null |
                                                         // 'BASIC_PRODUCT_INSERTED'
                                                         // |
                                                         // 'HS_PRODUCT_INSERTED'

  useImperativeHandle(ref, () => ({
    async validation (isHsCodeProduct) {
      if (isLogin) {
        const hasHsCode = await fetchHasHsCode();
        const succeed = isHsCodeProduct === hasHsCode;
        if (!succeed) {
          setRejectReason(
            hasHsCode ? 'HS_PRODUCT_INSERTED' : 'BASIC_PRODUCT_INSERTED');
        }

        return succeed;
      }
    },
  }));

  function fetchHasHsCode () {
    return fetchCart().then(hasHsCode);
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

  function hasHsCode (responseData) {
    return responseData.deliveryGroups.some(delivery =>
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

export default HsValidationMiddleware;