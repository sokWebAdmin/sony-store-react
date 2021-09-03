import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

const LayerPopup = ({ children, onClose, className, size = 'ms' }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  const close = (e) => {
    onClose?.(e);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    container.classList.add('modal');
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    }
  }, [container]);

  return createPortal(
    <>
      <div className="layer_mask" tabIndex="0" style={{ display: 'block' }}/>
      <div className={`popup_wrap size_${size} ${className}`} style={{ display: 'block' }}>
        <div className="pop_inner">
          <div className="pop_cont">
            {children}
          </div>
          <button type="button" className="ico_x closed" title="팝업창 닫기" onClick={close}>
            <span>팝업창 닫기</span>
          </button>
        </div>
      </div>
      </>, container
  );
};

export default LayerPopup;
