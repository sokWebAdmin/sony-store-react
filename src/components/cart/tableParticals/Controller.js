import React, { useMemo, useState, useEffect } from 'react';
import EstimateSheet from '../../popup/EstimateSheet';
import { breakPoint } from '../../../utils/constants';
import { useWindowSize } from '../../../utils/utils';

const Controller = ({ products, checkedIndexes, checkedProducts, setCheckedIndexes, deleteItems }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [viewES, setViewES] = useState(false);
  const size = useWindowSize();
  const allProductIndexes = useMemo(() => products.map((_, i) => i), [products]);

  useEffect(() => {
    setAllChecked(checkedIndexes.length === allProductIndexes.length);
  }, [checkedIndexes]);

  const onCheck = (event) => {
    const { checked } = event.currentTarget;

    checked ? setCheckedIndexes(allProductIndexes) : setCheckedIndexes([]);
  };

  const onClickShowES = () => (checkedProducts.length ? setViewES(true) : alert('상품을 선택해주세요.'));

  const onClickDelete = () => {
    if (checkedProducts.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }
    const nos = checkedProducts[0].cartNo === 0 ? checkedIndexes : checkedProducts.map(({ cartNo }) => cartNo);
    deleteItems(nos);
    setCheckedIndexes([]);
  };

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
          className="button button_negative button-s button_del_checked_items"
          onClick={onClickDelete}
        >
          선택 삭제
        </button>
        {size.width > breakPoint && (
          <button
            type="button"
            className="button button_positive button-s button_print_esimate popup_comm_btn"
            onClick={onClickShowES}
            data-popup-name="estimate"
          >
            견적서 출력하기
          </button>
        )}
      </div>
      {viewES && <EstimateSheet products={checkedProducts} close={() => setViewES(false)} />}
    </div>
  );
};

export default Controller;
