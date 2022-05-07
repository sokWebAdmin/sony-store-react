import React, { useContext } from 'react';
import { toCurrencyString } from '../../../utils/unit';
import GlobalContext from '../../../context/global.context';

const ProductList = ({ products, setProducts, setBeforeCountProducts, checkedIndexes, setCheckedIndexes, deleteItem }) => {
  const onCheck = (event, index) => {
    const { checked } = event.currentTarget;

   

    if (checked) {
      const newCheckedIndexes = [...checkedIndexes, index];

      setCheckedIndexes(newCheckedIndexes);
    }
    else {
      const newCheckedIndexes = checkedIndexes.filter((v) => v !== index);

      setCheckedIndexes(newCheckedIndexes);
    }
  };

  const changeQuantity = (productIndex, value) => {
    const newProducts = [...products];
    setBeforeCountProducts(JSON.parse(JSON.stringify(newProducts))); // 비회원
    // 장바구니에서
    // 재고 소진등
    // 문제로 해당
    // 상품이
    // 장바구니에서
    // 사라지는 문제
    // 보정하기
    // 위함..

    newProducts[productIndex].orderCnt += value;
    newProducts[productIndex].update = true;
    setProducts(newProducts);
  };

  let reversedItems = products;
  const { isLogin } = useContext(GlobalContext);

  // 로그인, 비로그인 순서가 뒤죽박죽으로 옴
  if (!isLogin) {
    reversedItems = products.concat().reverse();
  } else {
    reversedItems = products.sort((a, b) => a.cartNo > b.cartNo ? -1 : 1)
  }
  return (
    <>
      <div className="col_table">
        <Header />
        <div className="col_table_body">
          {reversedItems.map((product, i) => (
            
            <div className="col_table_row" key={product.productNo + '_' + reversedItems.length-i-1}>
              <div className="col_table_cell prd_wrap tal">
                <div className="prd">
                  <div className="check check_only">
                    <input
                      type="checkbox"
                      className="inp_check"
                      name="check_cart_item"
                      checked={checkedIndexes.some((v) => v === reversedItems.length-i-1)}
                      onChange={(event) => onCheck(event, reversedItems.length-i-1)}
                    />
                  </div>
                  <div className="prd_thumb">
                    <img className="prd_thumb_pic" src={product.imageUrl} alt={product.productName} />
                  </div>
                  <div className="prd_info">
                    <div className="prd_info_name">{product.productName}</div>
                  </div>
                </div>
              </div>
              <div className="col_table_cell prd_price">
                {toCurrencyString(product.salePrice)}
                <span className="won">원</span>
              </div>
              <div className="col_table_cell prd_count">
                <div className="count_ui_box">
                  <button className="minus" onClick={() => changeQuantity(reversedItems.length-i-1, -1)} disabled={product.orderCnt <= 1}>
                    감소
                  </button>
                  <input type="text" readOnly="readonly" value={product.orderCnt} className="count" />
                  <button className="plus" onClick={() => changeQuantity(reversedItems.length-i-1, 1)}>
                    증가
                  </button>
                </div>
              </div>
              <div className="col_table_cell prd_total">
                {toCurrencyString(product.buyAmt)} <span className="won">원</span>
              </div>
              <div className="col_table_cell">
                <button type="button" className="btn_del_prd" onClick={() => deleteItem(product.cartNo || reversedItems.length-i-1)}>
                  <img src="../../images/common/ic_close.svg" alt="제품 삭제" />
                </button>
              </div>
            </div>
          ))}
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
