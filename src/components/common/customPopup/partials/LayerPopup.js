import React, { useEffect, useMemo, useRef } from 'react';

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
      <div id="popup-test" className="layer_mask" tabIndex="0"
           style={{ display: 'block' }} />
      <div className='popup_wrap' style={{ display: 'block', width: 'auto' }}>
        <div className="pop_inner">
          <div className='pop_cont' ref={contentArea} style={sizeStyle} />
          <button type="button" className="ico_x closed delete" title="팝업창 닫기">
            <span className="delete">팝업창 닫기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LayerPopup;