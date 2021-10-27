
import React, { useRef, useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//util
import { wonComma } from '../utils/utils';
import GlobalContext from '../context/global.context';
import Confirm from './common/Confirm';

const loginAlert = '로그인 후 구매하실 수 있습니다.<br/>로그인 페이지로 이동하시겠습니까?';

export default function EspProduct({product}) {
  const description = useRef();
  const history = useHistory();

  const { isLogin } = useContext(GlobalContext);

  const [showMoreButton, setShowMoreButton] = useState(false);

  const [showComfirm, setShowComfirm] = useState(false);

  const toggleDescription = () => {
    const className = description.current.className;
    description.current.className = className === 'toggleBox__cont' ? 'toggleBox__cont toggleon' : 'toggleBox__cont';
  }

  const buy = () => {
    if (isLogin) {
      history.push(`/esp/list?productNo=${product.productNo}`);
    } else {
      setShowComfirm(true);
    }
  }

  const confirmClose = status => {
    setShowComfirm(false);

    if (status === 'ok') {
      history.push({
        pathname: "/member/login",
        state: {next: `/esp/list?productNo=${product.productNo}`}
      });
    }
  }

  useEffect(() => {
    if (description.current.clientHeight > 55) {
      setShowMoreButton(true);
      toggleDescription();
    }
  }, [description.current]);

  return (
    <>
      <li>
        <div className="tit_box">
          <img src={product.imageUrls[0]} />
        </div>
        <div className="cont_box">
          <em className="info_tit" style={{paddingLeft: 0, background: "url()"}}>{product.productName}</em>
          <p className="info_dsc">{product.productNameEn}</p>
          <div className="buy_box">
            <p className="info_price"><strong>{wonComma(product.salePrice)}</strong>원</p>
            <button className="button button_negative button-s" type="button" onClick={() => {
              buy();
            }}>바로 구매하기
            </button>
          </div>
        </div>
        <div className="toggleBox">
          <strong className="toggleBox__tit">대상 제품</strong>
          <div className="toggleBox__cont toggleon" ref={ description } >
            {product.promotionText}
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
      {showComfirm && <Confirm onClose={confirmClose}>{loginAlert}</Confirm>}
    </>
  );
}


                                    