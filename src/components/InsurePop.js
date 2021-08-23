import React from "react";
import { Link } from "react-router-dom";

export default function InsurePop({setPop}) {
  return (
    <>
    {/* 소비자피해보상 보험 팝업 */}
<div className="layer modal__customer__insurance" style={{display:"block"}}>
  <div className="layer_wrap">
    <div className="layer_container">
      <div className="layer_title">
        <h1>소비자피해보상보험</h1>
      </div>
      <div className="layer_content">
        <div className="consumer_logo">
          <img src="/images/img_consumerlogo.png" />
        </div>
        <p>고객님은 안전거래를 위해 현금 결제 시 저희 쇼핑몰이 가입한 구매안전서비스 소비자피해보상보험서비스를 이용하실 수 있습니다.</p>
        <p>보상대상 : 미배송/반품, 환불거부/쇼핑몰부도</p>
        <div className="btn_box">
          <a href="https://mall.sgic.co.kr/csh/iutf/sh/shop/CSHINFO004VM0.mvc?tm=3&q_sk=2&q_sv=1068123810" target="_blank" title="새창열림">서비스 가입 사실 확인하기</a>
        </div>
      </div>
      <button href="#" className="layer_close close" title="팝업창 닫기" onClick={()=>{
          setPop(false)
      }}>
        <span>팝업창 닫기</span>
      </button>        
    </div>    
  </div>
</div>
{/*// 소비자피해보상 보험 팝업 */}

    </>
  );
}