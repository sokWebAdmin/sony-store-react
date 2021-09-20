import React, { useState, useEffect } from 'react';

// stylesheet
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/product.scss';
import { createPortal } from 'react-dom';

export default function EspAddCartComplete ({onClose}) {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  const close = (e) => {
    document.body.style.overflow = 'auto';
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    container.className = "popup_cart layer";
    container.style.display = 'block';
    document.body.appendChild(container);

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeChild(container);
    }
  }, [container]);

  return createPortal(
    <div className="layer_wrap">
      <div className="layer_container">
        <p className="layer_title ico cart">장바구니 담기 완료</p>
        <p className="text">해당 상품이 장바구니에 담겼습니다.<br/> 장바구니로 이동하시겠습니까?</p>
        <div className="btn_article size2">
          <a href="#" className="btn close white" onClick={close}>쇼핑 계속하기</a>
          <a href="#" className="btn cart">장바구니 이동</a>
        </div>
      </div>
    </div>,
    container
  );
};
