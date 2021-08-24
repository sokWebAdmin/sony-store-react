import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/order.scss"

export default function cartEmpty() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container" id="container">
  <div className="content order_page">
    <div className="order_box">
      <h2 className="order_box__tit">장바구니</h2>
      <ol className="order_box__list">
        <li className="on">
          <i className="step_ico cart" />
          <p>장바구니</p>
        </li>
        <li>
          <i className="step_ico order" />
          <p>주문·결제</p>
        </li>
        <li>
          <i className="step_ico confirm" />
          <p>주문 완료</p>
        </li>
      </ol>
      <div className="empty_cart_box">
        <i className="empty_ico" />
        <p className="emptyinfo_tit">장바구니에 담긴 상품이 없습니다.</p>
        <div className="btn_box">
          <button type="button" className="button button_negative">쇼핑 계속 하기</button>
        </div>
      </div>
    </div>
  </div>
</div>


        </>
    );
}