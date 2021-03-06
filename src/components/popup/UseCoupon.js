import { useState, useEffect, useRef, useCallback } from 'react';

// components
import LayerPopup from '../common/LayerPopup';
import SelectBox from '../common/SelectBox';

// api
import { getOrderSheetCoupon } from '../../api/order.js';
import { toCurrencyString } from '../../utils/unit.js';
import { syncCoupon } from '../../api/sony/coupon.js';
import { wonComma } from '../../utils/utils';

// style
import '../../assets/scss/partials/useCoupon.scss';

const UseCoupon = ({ setVisible, orderSheetNo, orderProducts, discount, setDiscount, show, setReject }) => {
  const $scroll = useRef();

  const close = () => setVisible(false);

  const [productCoupons, setProductCoupons] = useState({ productNo: null, items: [] });
  const [products, setProducts] = useState([]);
  const [useProductCouponProductNo, setUseProductCouponProductNo] = useState(0);
  const [useProductCouponNo, setUseProductCouponNo] = useState(0);

  const init = async () => {
    const originProducts = await fetchCoupons();
    if (originProducts.length !== 0) {
      validation(originProducts);
      firstChoice(originProducts);
    }
  };

  const validation = (products) => products.every(({ productCoupons }) => !!productCoupons.length) || reject();

  const reject = () => {
    setReject(true);
  };

  const fetchCoupons = async () => {
    await syncCoupon();
    const { data } = await getOrderSheetCoupon({ orderSheetNo });
    data.products.length === 0 ? setProducts([]) : setProducts(mapProducts([...data.products]));
    return [...data.products];
  };

  const firstChoice = (originProducts) => {
    const FIRST_PRODUCT = { ...originProducts[0] };
    setProductCoupons({
      productNo: FIRST_PRODUCT.productNo,
      items: FIRST_PRODUCT.productCoupons,
    });
  };

  const submit = () => {
    setDiscount({
      ...discount,
      coupons: {
        productCoupons: [
          {
            couponIssueNo: useProductCouponNo,
            productNo: useProductCouponProductNo,
          },
        ],
      },
    });
    close();
  };

  const getCouponDisplayName = (couponName, couponDiscountAmt) => {
    if (!couponName || !couponDiscountAmt) return '';
    return `${wonComma(couponDiscountAmt)}??? ?????? (${couponName})`;
  };

  function mapProducts(products) {
    return products.map(({ productNo, productName, mainOption, buyAmt, totalOrderCnt, productCoupons }) => ({
      productNo,
      productName,
      imageUrl: orderProducts?.find((products) => products.id === productNo)?.imageUrl ?? '',
      mainOption,
      amount: toCurrencyString(buyAmt),
      totalOrderCnt,
      hasProductCoupon: !!productCoupons?.length,
    }));
  }

  useEffect(init, [show]);

  return (
    <LayerPopup className="find_address" size={'m'} onClose={close} show={show}>
      <p className="pop_tit">?????? ?????? ??? ??????</p>
      <div className="pop_cont_scroll scroll_fix" ref={$scroll}>
        <div className="chk_select_zone">
          <ul className="chk_select_inner">
            {products
              .filter(({ hasProductCoupon }) => hasProductCoupon)
              .map((product, i) => (
                <li className="chk_select_list" key={product.productNo}>
                  <div className="chk_select_item table label_click">
                    <div className="radio_box radio_only chk_select">
                      <input
                        type="radio"
                        className="inp_radio"
                        id="prd_coupon1"
                        name="prd_coupon"
                        defaultChecked={i === 0}
                      />
                      <label htmlFor="prd_coupon1" className="contentType" style={{ display: 'none' }}>
                        radio1
                      </label>
                    </div>
                    <div className="chk_select_info">
                      <div className="info_cell prd_thumb">
                        <span className="img">
                          <img src={product.imageUrl} alt={product.productName} />
                        </span>
                      </div>
                      <div className="info_cell prd_info">
                        <p className="prd_tit">{product.productName}</p>
                      </div>
                      <div className="info_cell prd_price">
                        <p className="prd_tit">
                          <span className="price">{product.amount}</span>???
                        </p>
                        <p className="prd_desc">
                          <span className="count">{product.totalOrderCnt}</span>???
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="coupon_info">
          {productCoupons?.items?.length > 0 && products.some(({ hasProductCoupon }) => hasProductCoupon) ? (
            <SelectBox
              defaultInfo={{
                type: 'dropdownHighlight',
                placeholder: '????????? ??????????????????.',
              }}
              selectOptions={[{ couponIssueNo: 0, displayCouponName: '?????? ?????? ??????' }, ...productCoupons.items].map(
                (item, index) => ({
                  optionNo: item.couponIssueNo,
                  label:
                    index === 0
                      ? item.displayCouponName
                      : getCouponDisplayName(item?.couponName, item?.couponDiscountAmt),
                }),
              )}
              selectOption={({ optionNo }) => {
                setUseProductCouponProductNo(productCoupons.productNo);
                setUseProductCouponNo(optionNo);
              }}
            />
          ) : (
            <h1>?????? ????????? ????????? ????????????.</h1>
          )}
          <div className="btn_article">
            <button className="button button_positive button-m button-full" onClick={submit} type="button">
              ????????????
            </button>
          </div>
          <p className="pop_txt txt_l">
            ?????? ????????? ????????? ???????????? ??? ?????????, ???????????? ?????? ????????? ?????? ??????????????? ???????????????!
          </p>
          <div className="guide_list">
            <p className="tit">[?????? ????????????]</p>
            <ul className="list_dot">
              <li>????????? ?????? ??? 1?????? ?????? ????????????, ?????? 1????????? ???????????????.</li>
              <li>????????? ??????, ?????? ??????(????????? ?????? ?????? ???)??? ?????? ????????? ?????? ??? ??? ????????????.</li>
              <li>
                ??????????????? ???????????? ???????????? ????????? ?????????????????? ????????? ?????? ??????, ?????? ????????? App ??? ?????????????????????
                ?????? ????????? ???????????? ????????? ?????????.
              </li>
              <li>?????? ??? ???????????? ????????? ?????? ????????? ????????????????????? ???????????? ????????????.</li>
            </ul>
          </div>
        </div>
      </div>
    </LayerPopup>
  );
};

export default UseCoupon;
