import React from 'react';

const QnA = () => {
  const toggle = event => {
    event.preventDefault();

    const masterNode = event.currentTarget.parentNode.parentNode;
    const contentSelector = event.currentTarget.getAttribute('href');
    const contentNode = masterNode.querySelector(contentSelector);
    const isOn = masterNode.className.includes('on');

    if (isOn) {
      masterNode.classList.remove('on');
      contentNode.style.display = 'none';
    }
    else {
      masterNode.classList.add('on');
      contentNode.style.display = 'block';
    }

  };

  return (
    <div className="acc acc_ui_zone acc_faq acc_cart">
      <div className="acc_item on">
        <div className="acc_head">
          <a href="#content-1" onClick={toggle} className="acc_btn"
             title="상세 내용 토글">
            <span className="acc_tit">장바구니 이용 안내</span>
            <span className="acc_arrow">선택됨/상세 닫기</span>
          </a>
        </div>
        <div id="content-1" className="acc_inner" style={{ display: 'block' }}>
          <div className="acc_box">
            {/* 앞에 불릿이 들어 갈 것 같다. 그땐 tag 교체 */}
            <p>모든 이벤트는 결제완료시간 기준으로 적용됩니다.</p>
            <p>견적서를 클릭하시면 견적서 프린트가 가능합니다.</p>
            <p>소니스토어 멤버십 회원에 한하여 플레이스테이션 및 주변기기, ESP를 제외한 제품의 총 구매액 2%
              / 5% / 7%(회원 등급별 차등)가 마일리지로 적립됩니다.</p>
            <p>동일한 제품군별로만 장바구니에 담으실 수 있습니다. (예, 마일리지 상품과 일반 상품은 함께
              장바구니에담으실 수 없습니다.)</p>
          </div>
        </div>
      </div>
      <div className="acc_item">
        <div className="acc_head">
          <a href="#content-2" onClick={toggle} className="acc_btn"
             title="상세 내용 토글">
            <span className="acc_tit">AS관련 제품 주의사항</span>
            <span className="acc_arrow">상세 보기</span>
          </a>
        </div>
        <div id="content-2" className="acc_inner">
          <div className="acc_box">
            <p>ESP(Extended Service Plan)를 주문하시는 것은 ESP 이용약관에 기재된 내용을
              모두 이해하고 준수하는 데 동의하신 것으로 간주됩니다.</p>
            <p>ESP(Extended Service Plan) 구입 후 7일 이내에 고객지원사이트의 My
              SCS에서 연장된 서비스 기간 조회가 가능합니다. (구입 확인은 내부 사정에 따라 조정될 수
              있습니다.)</p>
          </div>
        </div>
      </div>
      <div className="acc_item">
        <div className="acc_head">
          <a href="#content-3" onClick={toggle} className="acc_btn"
             title="상세 내용 토글">
            <span className="acc_tit">인터넷 주문이 어려우세요?</span>
            <span className="acc_arrow">상세 보기</span>
          </a>
        </div>
        <div id="content-3" className="acc_inner">
          <div className="acc_box">
            <p>제품 주문 시 어려움이 있으시다면 고객지원센터(1588-0911)로 전화주세요. 소니 전문 상담원이
              제품 설명과 함께 고객님의 주문을 도와 드립니다.</p>
          </div>
        </div>
      </div>
      {/* // acc_item */}
    </div>
  );
};

export default QnA;