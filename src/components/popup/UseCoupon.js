import { useState, useEffect } from 'react';

// components
import LayerPopup from '../common/LayerPopup';
import SelectBox from '../common/SelectBox';

// api
import { getOrderSheetCoupon } from '../../api/order.js';
import { toCurrencyString } from '../../utils/unit.js';

const UseCoupon = ({ setVisible, orderSheetNo, orderProducts, discount, setDiscount }) => {
  const close = () => setVisible(false);

  const [productCoupons, setProductCoupons] = useState(
    { productNo: null, items: [] });
  const [products, setProducts] = useState([]);
  const [useProductCouponProductNo, setUseProductCouponProductNo] = useState(0); // 0 ===
  const [useProductCouponNo, setUseProductCouponNo] = useState(0); // 0 ===
  // 사용안함으로 취급

  const created = async () => {
    const originProducts = await fetchCoupons();
    if (products) {
      firstChoice(originProducts);
    }
  };

  const fetchCoupons = async () => {
    const { data } = await getOrderSheetCoupon({ orderSheetNo });
    await setProducts(mapProducts([...data.products]));
    return [...data.products];
  };

  const firstChoice = originProducts => {
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

  function mapProducts (products) {
    return products.map(
      ({ productNo, productName, mainOption, buyAmt, totalOrderCnt }) => ({
        productNo,
        productName,
        imageUrl: orderProducts.find(
          products => products.id === productNo)?.imageUrl ?? '',
        mainOption,
        amount: toCurrencyString(buyAmt),
        totalOrderCnt,
      }));
  }

  useEffect(created, []);

  return (
    <LayerPopup className="find_address"
                size={'m'}
                popContClassName={'scrollH'}
                onClose={close}>
      <p className="pop_tit">쿠폰 조회 및 적용</p>
      <div className="pop_cont_scroll" style={{ height: '651px' }}>
        <div className="chk_select_zone">
          <ul className="chk_select_inner">
            {products.map((product, i) => (
              <li className="chk_select_list" key={product.productNo}>
                <div className="chk_select_item table label_click">
                  <div className="radio_box radio_only chk_select">
                    <input type="radio" className="inp_radio" id="prd_coupon1"
                           name="prd_coupon" defaultChecked={i === 0}
                    />
                    <label htmlFor="prd_coupon1"
                           className="contentType">radio1</label>
                  </div>
                  <div className="chk_select_info">
                    <div className="info_cell prd_thumb">
                  <span className="img"><img
                    src={product.imageUrl}
                    alt={product.productName} /></span>
                    </div>
                    <div className="info_cell prd_info">
                      <p className="prd_tit">{product.productName}</p>
                      <p className="prd_desc">{product.mainOption}</p>
                    </div>
                    <div className="info_cell prd_price">
                      <p className="prd_tit"><span
                        className="price">{product.amount}</span>원</p>
                      <p className="prd_desc"><span
                        className="count">{product.totalOrderCnt}</span>개
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="coupon_info">
          {productCoupons.items.length > 0 ?
            <SelectBox
              defaultInfo={{
                type: 'dropdownHighlight',
                placeholder: '쿠폰을 선택해주세요.',
              }}
              selectOptions={
                [
                  { couponIssueNo: 0, displayCouponName: '쿠폰 적용 안함' },
                  ...productCoupons.items].map(item => ({
                  optionNo: item.couponIssueNo,
                  label: item.displayCouponName,
                }))
              }
              selectOption={({ optionNo }) => {
                setUseProductCouponProductNo(productCoupons.productNo);
                setUseProductCouponNo(optionNo);
              }}
            />
            : <h1>적용 가능한 쿠폰이 없습니다.</h1>}
          <div className="btn_article">
            <button className="button button_positive button-m button-full"
                    onClick={submit}
                    type="button">쿠폰적용
            </button>
          </div>
          <p className="pop_txt txt_l">사용 가능한 쿠폰만 확인하실 수 있으며, 보유하신 전체 쿠폰은 마이
            페이지에서 확인하세요!</p>
          <div className="guide_list">
            <p className="tit">[쿠폰 이용안내]</p>
            <ul className="list_dot">
              <li>쿠폰은 주문 당 1매씩 사용 가능하며, 상품 1개에만 적용됩니다.</li>
              <li>쿠폰의 경우, 일부 상품(이벤트 할인 상품 등)에 대해 사용이 제한 될 수 있습니다.</li>
              <li>소니스토어 오프라인 매장에서 쿠폰을 사용하시려면 출력된 쿠폰 지참, 혹은 모바일 App 내 마이페이지에서 쿠폰
                내역을 직원에게 제시해 주세요.
              </li>
              <li>주문 시 사용하신 쿠폰은 해당 주문을 취소하시더라도 복원되지 않습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </LayerPopup>
  );
};

export default UseCoupon;