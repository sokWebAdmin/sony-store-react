const Products = props => {
  const { data } = props

  const dataMapping = deliveryGroups => {
    console.log(deliveryGroups)
    return [1]
  }

  return (
    <ul>
      {
        data?.length >= 1 ?
          dataMapping(data).map((item) =>
            <li>{item}</li>
          ) :
          <h1>상품없음 UI</h1>
      }
    </ul>
  )
}

export default Products