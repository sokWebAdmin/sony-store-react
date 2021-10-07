import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

const LayerPopup = ({ children, onClose, className, popContClassName = '', popContStyle = null, size = 'ms', show = true }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  const close = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.style.overflow = 'auto';
    onClose?.(e);
  };

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
      <div className="layer_mask" tabIndex="0" style={{ display: show ? 'block' : 'none' }} />
      <div className={`popup_wrap size_${size} ${className}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="pop_inner">
          <div className={`pop_cont ${popContClassName}`} style={popContStyle}>
            {children}
          </div>
          <button type="button" className="ico_x closed" title="팝업창 닫기" onClick={close}>
            <span>팝업창 닫기</span>
          </button>
        </div>
      </div>
    </>,
    container
  );
};

export default LayerPopup;
