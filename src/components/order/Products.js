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
    <ul>
      {
        products?.length >= 1 ?
          products.map(product =>
            <li>{product.productName}</li>
          ) :
          <h1>상품없음 UI</h1>
      }
    </ul>
  )
}

export default Products