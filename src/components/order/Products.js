import { useEffect } from 'react';
import { toCurrencyString } from '../../utils/unit';

const Products = (props) => {
  const { products, setProducts, data } = props;

  const dataMapping = (deliveryGroups) =>
    deliveryGroups?.flatMap((deliveryGroup) => makeOrderProductInfo(deliveryGroup));

  function makeOrderProductInfo(deliveryGroup) {
    return deliveryGroup.orderProducts
      .flatMap(({ orderProductOptions }) => orderProductOptions)
      .map((orderProductOption, index) => ({
        id: orderProductOption.productNo,
        imageUrl: orderProductOption.imageUrl,
        productName: deliveryGroup.orderProducts[index].productName,
        optionText: getOptionText(orderProductOption.optionTitle, orderProductOption.optionInputs),
        orderCnt: orderProductOption.orderCnt,
        amount: toCurrencyString(orderProductOption.price.standardAmt),
        totalAmount: toCurrencyString(orderProductOption.price.standardAmt * orderProductOption.orderCnt),
      }));
  }

  function getOptionText(optionTitle, optionInputs) {
    if (!optionTitle) {
      return '';
    }

    return `${optionTitle} ${
      optionInputs ? optionInputs?.map(({ inputLabel, inputValue }) => inputLabel + ':' + inputValue).join('\n') : ''
    }`;
  }

  useEffect(() => {
    setProducts(dataMapping(data));
  }, [data]);

  return (
    <div className="col_table_body">
      {products?.length >= 1 ? (
        products.map(({ id, imageUrl, productName, optionText, orderCnt, amount, totalAmount }) => (
          <div className="col_table_row" key={id}>
            <div className="col_table_cell prd_wrap">
              <div className="prd">
                <div className="prd_thumb">
                  <img className="prd_thumb_pic" src={imageUrl} alt={productName} />
                </div>
                <div className="prd_info">
                  <div className="prd_info_name">{productName}</div>
                  <p className="prd_info_option">{optionText}</p>
                </div>
              </div>
            </div>
            <div className="col_table_cell prd_price">
              {amount} <span className="won">원</span>
            </div>
            <div className="col_table_cell prd_count">
              {orderCnt} <span className="won">개</span>
            </div>
            <div className="col_table_cell prd_total">
              {totalAmount} <span className="won">원</span>
            </div>
          </div>
        ))
      ) : (
        <h1>주문할 상품이 없습니다.</h1>
      )}
    </div>
  );
};

export default Products;
