
import React, { useRef, useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//util
import { wonComma } from '../utils/utils';
import GlobalContext from '../context/global.context';

// TODO 바로 구매하기 동작 테스트 필요
// TODO 컨펌 팝업 개발 요망
// TODO desc 데이터 확인 요망

export default function EspProduct({product}) {
  const description = useRef();
  const descForWidthCalculate = useRef();
  const history = useHistory();

  const { isLogin } = useContext(GlobalContext);

  const [showMoreButton, setShowMoreButton] = useState(false);

  const toggleDescription = () => {
    const className = description.current.className;
    description.current.className = className === 'toggleBox__cont' ? 'toggleBox__cont toggleon' : 'toggleBox__cont';
  }

  const buy = () => {
    if (isLogin) {
      history.push("/esp/list");
    } else {
      // TODO 컨펌 팝업에 대한 개발이 필요
      if (window.confirm('로그인 후 구매하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?')) {
        history.push("/member/login");
        history.push({
          pathname: "/member/login",
          state: {next: '/esp/list'}
        })
      }
    }
  }

  useEffect(() => {
    if (descForWidthCalculate.current.clientHeight > 40) {
      setShowMoreButton(true);
    }
  });

  return (
    <li>
      <div className="tit_box" style={{ backgroundImage: `url(${product.imageUrls[0]})` }}>
        <span className="ico" style={{visibility: 'hidden'}}></span>
        <strong className="tit" style={{visibility: 'hidden'}}>마크업 조정</strong>
        <p className="dsc" style={{visibility: 'hidden'}}>마크업 조정</p>
      </div>
      <div className="cont_box">
        <em className="info_tit">{product.productName}</em>
        <p className="info_dsc">{product.productNameEn}</p>
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
        <div className="toggleBox__cont toggleon" ref={ descForWidthCalculate } style={{visibility: 'hidden'}} >
          ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2
        </div>
        <div className="toggleBox__cont " ref={ description } >
          ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2, ILCE-9, ILCE-9M2
        </div>
        {
          showMoreButton &&
          <a href="#" className="togglebtn" onClick={e => {
            toggleDescription();
            e.preventDefault();
          }}></a>
        }
      </div>
    </li>
  );
}


                                    