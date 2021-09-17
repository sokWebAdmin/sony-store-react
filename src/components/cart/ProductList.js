import React from 'react';
import { toCurrencyString } from '../../utils/unit';

const ProductList = ({ products, setProducts }) => {
  return (
    <>
      <div className="cart_func">
        <Controller />
      </div>
      <div className="col_table_wrap order_list">
        <div className="col_table">
          <div className="col_table_head">
            <div className="col_table_row">
              <div className="col_table_cell">제품</div>
              <div className="col_table_cell">가격</div>
              <div className="col_table_cell">수량</div>
              <div className="col_table_cell">합계</div>
              <div className="col_table_cell ir">삭제</div>
            </div>
          </div>
          <div className="col_table_body">
            {products.map(
              ({ product, orderCnt, optionText, standardAmt, buyAmt }) =>
                <div className="col_table_row">
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
        <div className="col_table_foot">
          <div className="prd_summary">
            <span className="prd_summary_length">결제 예정 금액 (총 1개)</span>
            <span className="prd_summary_price">200,000,000,000 <span
              className="won">원</span></span>
            <p className="prd_summary_warning">* 최종 결제금액은 고객님의 <span
              className="mo_block">쿠폰 / 마일리지 적용에 따라 달라질 수 있습니다.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

function Controller () {
  return (
    <>
      <div className="cart_func_check">
        <div className="check">
          <input type="checkbox" className="inp_check check_all"
                 id="check_cart_items" name="check_cart_item" />
          <label htmlFor="check_cart_items">전체</label>
        </div>
      </div>
      <div className="cart_func_buttons">
        <button type="button"
                className="button button_negative button-s button_del_checked_items">선택
          삭제
        </button>
        <button type="button"
                className="button button_positive button-s button_print_esimate popup_comm_btn"
                data-popup-name="estimate">견적서 출력
        </button>
      </div>
    </>
  );
}

export default ProductList;


