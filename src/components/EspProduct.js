
import { React, useRef } from "react";

//util
import { wonComma } from '../utils/utils';

// TODO 상품 정보의 어떤걸 화면에 표시해야 할지 여쭤봐야 함
// TODO 바로 구매하기 동작
// TODO 더보기 버튼의 show / hide 여부


export default function EspProduct({product}) {
  const description = useRef();

  const toggleDescription = () => {
    const className = description.current.className;
    description.current.className = className === 'toggleBox__cont' ? 'toggleBox__cont toggleon' : 'toggleBox__cont';
  }
  
  return (
    <li>
      <div className="tit_box">
        <span className="ico"></span>
        <strong className="tit">{product.productName}</strong>
        <p className="dsc">Extended Service Plan</p>
      </div>
      <div className="cont_box">
        <em className="info_tit">3년 연장 서비스 플랜</em>
        <p className="info_dsc">3YEAR_ESP_A9</p>
        <div className="buy_box">
          <p className="info_price"><strong>{wonComma(product.salePrice)}</strong>원</p>
          <button className="button button_positive button-s" type="button" onClick={() => {
            alert('바로 구매하기 로직 추가해야함');
          }}>바로 구매하기
          </button>
        </div>
      </div>
      <div className="toggleBox">
        <strong className="toggleBox__tit">대상 제품</strong>
        <div className="toggleBox__cont" ref={ description }>
          ILCE-9, ILCE-9M2
        </div>
        <a href="#" className="togglebtn" onClick={e => {
          toggleDescription();
          e.preventDefault();
        }}>
          더보기 - 대상제품이 한줄 이하일때는 버튼 삭제
        </a>
      </div>
    </li>
  );
}


                                    