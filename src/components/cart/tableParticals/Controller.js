import React from 'react';

const Controller = () => {
  return (

    <div className="cart_func">
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
    </div>
  );
};

export default Controller;