import React from 'react';
import { toCurrencyString } from '../../../utils/unit';

const ProductList = ({ products, setProducts }) => {
  return (
    <>
      <div className="col_table">
        <Header />
        <div className="col_table_body">
          {products.map(
            ({ product, orderCnt, optionText, standardAmt, buyAmt }, i) =>
              <div className="col_table_row" key={product.productNo + '_' + i}>
                <div className="col_table_cell prd_wrap tal">
                  <div className="prd">
                    <div className="check check_only">
                      <input type="checkbox" className="inp_check"
                             name="check_cart_item" />
                    </div>
                    <div className="prd_thumb">
                      <img className="prd_thumb_pic"
                           src={product.imageUrl}
                           alt={product.productName} />
                    </div>
                    <div className="prd_info">
                      <div className="prd_info_name">{product.productName}
                      </div>
                      <p className="prd_info_option">{optionText}</p>
                    </div>
                  </div>
                </div>
                <div className="col_table_cell prd_price">
                  {toCurrencyString(standardAmt)} <span
                  className="won">원</span>
                </div>
                <div className="col_table_cell prd_count">
                  <div className="count_ui_box">
                    <button className="minus">감소</button>
                    <input type="text" readOnly="readonly"
                           value={orderCnt} className="count" />
                    <button className="plus">증가</button>
                  </div>
                </div>
                <div className="col_table_cell prd_total">
                  {toCurrencyString(buyAmt)} <span className="won">원</span>
                </div>
                <div className="col_table_cell">
                  <button type="button" className="btn_del_prd"><img
                    src="../../images/common/ic_close.svg" alt="제품 삭제" />
                  </button>
                </div>
              </div>,
          )}
        </div>
      </div>
    </>
  );
};

const Header = () => (
  <div className="col_table_head">
    <div className="col_table_row">
      <div className="col_table_cell">제품</div>
      <div className="col_table_cell">가격</div>
      <div className="col_table_cell">수량</div>
      <div className="col_table_cell">합계</div>
      <div className="col_table_cell ir">삭제</div>
    </div>
  </div>
);

export default ProductList;