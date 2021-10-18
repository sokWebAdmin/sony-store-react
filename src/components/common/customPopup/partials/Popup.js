import React from 'react';

//
import LayerPopup from '../../LayerPopup';

const Popup = ({ popup }) => {
  return (
    <>
      <div id="popup-test" className="layer_mask" tabIndex="0"
           style={{ display: 'block' }} />
      <div className='popup_wrap' style={{ display: 'block' }}>
        <div className="pop_inner">
          <div className='pop_cont'>
            {JSON.stringify(popup)}
          </div>
          <button type="button" className="ico_x closed delete" title="팝업창 닫기">
            <span className="delete">팝업창 닫기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;