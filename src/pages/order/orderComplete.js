import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/order.css"

export default function orderComplete() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container" id="container">
        <div className="content order_page">
            <div className="order_confirm_box">
            <i className="icon receipe" />
            <h2 className="order_confirm_box__tit">주문 완료</h2>
            {/*<h2 class="order_confirm_box__tit">선물하기 주문 완료</h2> 선물하기 일때*/}
            <p className="order_confirm_box__dsc">소니스토어를 이용해 주셔서 감사합니다!</p>
            <div className="order_confirm_box__oder_num_box">
                <dl>
                <dt>주문번호</dt>
                <dd>202110430 - X62558</dd>
                </dl>
            </div>
            <p className="order_confirm_box__txt">주문하신 상품에 대한 배송 상태 등의 조회는 마이페이지에서 확인하실 수 있습니다.</p>
            {/*비회원 주문완료 일때 <p class="order_confirm_box__txt">비회원 구매 후 배송 조회는 위의 주문번호와 결제 시 입력하신 비밀번호(12자리)로 확인 가능합니다.</p>*/}
            <div className="btn_box">
                <button className="button button_negative" type="button">계속 쇼핑하기</button>
                <button className="button button_negative" type="button">설문조사 참여하기</button>
                <button className="button button_positive" type="button">주문/배송 조회</button>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}