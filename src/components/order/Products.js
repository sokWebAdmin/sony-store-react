import { useState, useEffect } from 'react'

const Products = props => {
  const { data } = props
  const [products, setProducts] = useState([]);

  const dataMapping = deliveryGroups =>
    deliveryGroups
      .flatMap(deliveryGroup => deliveryGroup.orderProducts)

  useEffect(() => {
    setProducts(dataMapping(data))
  }, [data])

  return (
    <div className="col_table_body">
      {
        products?.length >= 1 ?
          products.map(({ productName }) =>
            <div className="col_table_row">
              <div className="col_table_cell prd_wrap">
                <div className="prd">
                  <div className="prd_thumb">
                    <img className="prd_thumb_pic"
                         src="../../images/_tmp/item640x640_01.png"
                         alt={productName} />
                  </div>
                  <div className="prd_info">
                    <div className="prd_info_name">{productName}
                    </div>
                    <p className="prd_info_option">128Bit/피아노블랙</p>
                  </div>
                </div>
              </div>
              <div className="col_table_cell prd_price">
                4,299,000 <span className="won">원</span>
              </div>
              <div className="col_table_cell prd_count">
                2 <span className="won">개</span>
              </div>
              <div className="col_table_cell prd_total">
                8,598,000 <span className="won">원</span>
              </div>
            </div>
          ) :
          <h1>상품없음 UI</h1>
      }
    </div>
  )
}

export default Products