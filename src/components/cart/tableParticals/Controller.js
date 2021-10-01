import React, { useMemo, useState, useEffect } from 'react';
import EstimateSheet from '../../popup/EstimateSheet';

const Controller = ({ products, checkedIndexes, checkedProducts, setCheckedIndexes }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [viewES, setViewES] = useState(false);

  const allProductIndexes = useMemo(() => products.map((_, i) => i), [products]);

  useEffect(() => {
    setAllChecked(checkedIndexes.length === allProductIndexes.length);
  }, [checkedIndexes]);

  const onCheck = (event) => {
    const { checked } = event.currentTarget;

    checked ? setCheckedIndexes(allProductIndexes) : setCheckedIndexes([]);
  };

  const onClickShowES = () => (checkedProducts.length ? setViewES(true) : alert('상품을 선택해주세요.'));

  return (
    <div className="cart_func">
      <div className="cart_func_check">
        <div className="check">
          <input
            type="checkbox"
            className="inp_check check_all"
            checked={allChecked}
            onChange={onCheck}
            id="check_cart_items"
            name="check_cart_item"
          />
          <label htmlFor="check_cart_items">전체</label>
        </div>
      </div>
      <div className="cart_func_buttons">
        <button
          type="button"
          className="button button_positive button-s button_print_esimate popup_comm_btn"
          onClick={onClickShowES}
          data-popup-name="estimate"
        >
          견적서 출력하기
        </button>
      </div>
      {viewES && <EstimateSheet products={checkedProducts} close={() => setViewES(false)} />}
    </div>
  );
};

export default Controller;
