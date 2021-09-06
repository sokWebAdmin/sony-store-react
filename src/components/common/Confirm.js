import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

// read README.md
const Confirm = ({ children, onClose }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  const close = (status) => {
    onClose?.(status);
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
    <div className='layer alert_layer alert_pop2 complete' style={{ display: 'block' }}>
      <div className='layer_wrap'>
        <div className='layer_container'>
          <div className='layer_content'>
            <p className='alert_text'>{children}</p>
            <div className='btn_box'>
              <button type='button' className='close btn btn_default btn_remove' onClick={() => close('cancel')}>취소</button>
              <button type='button' className='btn btn_dark btn_func1' onClick={() => close('ok')}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>, container
  );
};

export default Confirm;
