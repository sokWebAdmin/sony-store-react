import React, { useEffect, useMemo, useRef } from 'react';

import '../../../../assets/scss/partials/customPopup.scss';

const LayerPopup = ({ popup }) => {

  const contentArea = useRef();

  const changed = () => {
    setContent(popup.content);
  };

  useEffect(() => changed(), [popup]);

  const sizeStyle = useMemo(() => ({
    width: popup.width + 'px',
    height: popup.height + 'px',
  }), [popup]);

  function setContent (stringifyHTML) {
    contentArea.current.innerHTML = stringifyHTML;
  }

  return (
    <>
      <div className="layer_mask" tabIndex="0"
           style={{ display: 'block' }} />
      <div className='popup_wrap custom_popup_layer'
           style={{ display: 'block', width: 'auto' }}>
        <div className="pop_inner">
          <div className='pop_cont custom_popup_layer--container'
               ref={contentArea} style={sizeStyle} />
          <button type="button"
                  className="ico_x closed delete custom_popup_layer--delete"
                  title="팝업창 닫기">
            <span className="delete">팝업창 닫기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LayerPopup;