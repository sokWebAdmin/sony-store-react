import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

const LayerPopup = ({ children, onClose, className, size = 'ms', customButton }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  const close = (e) => {
    document.body.style.overflow = "auto";
    onClose?.(e);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    container.classList.add('modal');
    document.body.appendChild(container);
    return () => {
      document.body.style.overflow = "auto";
      document.body.removeChild(container);
    }
  }, [container]);

  return createPortal(
    <>
      <div className="layer_mask" tabIndex="0" style={{ display: 'block' }}/>
      <div className={`popup_wrap size_${size} ${className}`} style={{ display: 'block' }}>
        <div className="pop_inner">
          <div className="pop_cont scrollH">
            {children}
          </div>
          <button type="button" style={{ cursor: 'pointer' }} className="ico_x closed" title="팝업창 닫기" onClick={close}>
            <span>팝업창 닫기</span>
          </button>
        </div>
      </div>
      </>, container
  );
};

export default LayerPopup;
