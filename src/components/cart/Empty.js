const Empty = () => {
  return (
    <div className="empty_cart_box">
      <i className="empty_ico"></i>
      <p className="emptyinfo_tit">장바구니에 담긴 상품이 없습니다.</p>
      <div className="btn_box">
        <button type="button" className="button button_negative">쇼핑 계속 하기
        </button>
      </div>
    </div>
  );
};

export default Empty;