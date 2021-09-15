import React from 'react';
import { toCurrencyString } from '../../utils/unit';

const EventProducts = ({event}) => {
  return (
    <>
      <div className="event_prd_list">
        {event?.section.flatMap(({ products }) => products)?.map((product) => {
          return (
            <div className="product" key={product.productNo}>
              {product.immediateDiscountAmt + product.additionDiscountAmt > 0 && <span className="badge_txt">
                          {toCurrencyString(product.immediateDiscountAmt + product.additionDiscountAmt)}
                <span className="unit">원</span> OFF
                        </span>}
              <div className="product_pic">
                <a href="javascript:void(0)" className="product_link">
                  <img
                    src={product.imageUrls[0]}
                    alt=""
                  />
                </a>
                {!product.stockCnt && <div className="sold_out">
                  <span>SOLD OUT</span>
                </div>}
              </div>
              <div className="product_name">
                <a href="javascript:void(0)" className="product_name_title">
                  {product.productName}
                </a>
                <p className="product_name_desc">
                  {product.promotionText}
                </p>
                <div className="product_name_price">
                  {product.salePrice !== product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt ?
                    <>
                      <div className="original">
                        {toCurrencyString(product.salePrice)} <span className="unit">원</span>
                      </div>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </> :
                    <>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </>}
                </div>
                <div className="product_btn_wrap">
                  <button
                    type="button"
                    className="button button_positive button-s"
                  >
                    바로 구매
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventProducts;
