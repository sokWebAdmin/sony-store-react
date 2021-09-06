
import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

//util
import { wonComma } from '../utils/utils';
import GlobalContext from '../context/global.context';

// TODO 상품 정보의 어떤걸 화면에 표시해야 할지 여쭤봐야 함
// TODO 바로 구매하기 동작
// TODO 더보기 버튼의 show / hide 여부

export default function EspProduct({product}) {
  const description = useRef();
  const history = useHistory();

  // TODO 일단 코드상 로그인 여부를 토큰 존재 여부로 판단하는 것 같아서 이렇게 함
  // TODO isLogin() 같은 글로벌 함수가 있음 좋지 않을까?
  const { isLogin } = useContext(GlobalContext);

  const toggleDescription = () => {
    const className = description.current.className;
    description.current.className = className === 'toggleBox__cont' ? 'toggleBox__cont toggleon' : 'toggleBox__cont';
  }

  const buy = () => {
    if (isLogin) {
      // TODO location 이동
      history.push("/esp/list");
    } else {
      // TODO 컨펌 팝업에 대한 개발이 필요
      // TODO next url 에 대한 로직 개발 필요
      if (window.confirm('로그인 후 구매하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?')) {
        history.push("/member/login");
      }
    }
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
            buy();
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


                                    