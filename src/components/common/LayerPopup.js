import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useWindowSize } from '../../utils/utils';

const LayerPopup = ({ children, onClose, className, popContClassName = '', popContStyle = null, size = 'ms', show = true }) => {
  const windowSize = useWindowSize();
  const $wrap = useRef();

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

  // ux-common.js 내 popScrollChk 함수 참조
  // - scrollChild 의 경우, LayerPopup 바로 하위에 pop_cont_scroll 가 있는 경우로 체크
  const _getPopupConstStyle = () => {
    const style = !!popContStyle ? {...popContStyle} : {};

    let tempChildren = [];
    if (children) {
      if (Array.isArray(children)) {
        tempChildren = [...children];
      } else {
        tempChildren = [children];
      }
    }

    const scrollChild = tempChildren?.filter(child => child?.props?.className?.includes('pop_cont_scroll'))[0];
    let $scroll = scrollChild?.ref || {};

    if (popContClassName?.includes('scrollH') && $wrap.current && $scroll.current) {
      const _windowH = windowSize.height - 160;
      const _fixH = Math.abs($wrap.current.offsetHeight - $scroll.current.offsetHeight);
      let _changH = Math.abs(_windowH-_fixH);

      if (_changH < 250) {
        _changH = 250;
      }

      $scroll.current.style.height = `${_changH}px`;
    }

    return style;
  }

  return createPortal(
    <>
      <div className="layer_mask" tabIndex="0" style={{ display: show ? 'block' : 'none', zIndex: 1000 }} />
      <div className={`popup_wrap size_${size} ${className}`} style={{ display: show ? 'block' : 'none', zIndex: 1000 }} ref={$wrap}>
        <div className="pop_inner">
          <div className={`pop_cont ${popContClassName}`} style={_getPopupConstStyle()}>
            {children}
          </div>
          <button type="button" className="ico_x closed delete" title="팝업창 닫기" onClick={close}>
            <span className="delete">팝업창 닫기</span>
          </button>
        </div>
      </div>
    </>,
    container
  );
};

export default LayerPopup;
