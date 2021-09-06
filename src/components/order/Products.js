const Products = props => {
  const { data } = props

  return (
    <ul>
      {data}
      {
        data?.length >= 1 ?
          data.map(() =>
            <li>item</li>
          ) :
          <h1>상품없음 UI</h1>
      }
    </ul>
  )
}

export default Products