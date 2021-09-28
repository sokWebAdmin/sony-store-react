import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// read README.md
const Alert = ({ children, onClose, type = 'default', customButton }) => {
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
      document.body.removeChild(container);
    }
  }, [container]);

  return createPortal(
    <div className='layer alert_layer alert_pop complete' style={{ display: 'block' }}>
      <div className='layer_wrap'>
        <div className='layer_container'>
          <div className='layer_content'>
            {/* 이 부분은 아이콘이 필요하신분이 알맞게 수정 부탁드립니다. */}
            {type === 'custom' && <p>Custom Icon</p>}
            <p className='alert_text' dangerouslySetInnerHTML={{__html: children}}></p>
            <div className='btn_box'>
              {type === 'default' ?
                <button type='button' className='btn btn_dark btn_remove' onClick={close}>확인</button> :
                customButton
              }
            </div>
          </div>
        </div>
      </div>
    </div>, container);
};

export default Alert;
