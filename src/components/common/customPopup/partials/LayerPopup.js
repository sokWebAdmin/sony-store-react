import React, { useState, useEffect, useMemo, useRef } from 'react';

import '../../../../assets/scss/partials/customPopup.scss';

const Z_INDEX_START_AT = 990;

const LayerPopup = ({ popup, todayNotShow, index }) => {
    const [show, setShow] = useState(true);

    const contentArea = useRef();

    const changed = () => {
        setContent(popup.content);
    };

    useEffect(() => changed(), [popup]);

    const sizeStyle = useMemo(
        () => ({
            width: popup.width + 'px',
            height: popup.height + 'px',
        }),
        [popup],
    );

    function setContent(stringifyHTML) {
        if (show) {
            contentArea.current.innerHTML = stringifyHTML;
        }
    }

    return (
        show && (
            <>
                <div
                    className='layer_mask'
                    tabIndex='0'
                    style={{
                        display: 'block',
                        zIndex: Z_INDEX_START_AT + index,
                    }}
                />
                <div
                    className='popup_wrap custom_popup_layer'
                    style={{ display: 'block' }}
                >
                    <div className='pop_inner'>
                        <div
                            className='pop_cont custom_popup_layer--container'
                            ref={contentArea}
                            style={sizeStyle}
                        />
                        <button
                            type='button'
                            className='ico_x closed delete custom_popup_layer--delete'
                            title='팝업창 닫기'
                            onClick={() => setShow(false)}
                        >
                            <span className='delete'>팝업창 닫기</span>
                        </button>
                        <div className='today_not_opened check'>
                            <input
                                type='checkbox'
                                className='inp_check'
                                id={popup.popupNo + '_close'}
                            />
                            <label
                                onClick={() => {
                                    todayNotShow.set(popup.popupNo);
                                    setShow(false);
                                }}
                                htmlFor={popup.popupNo + '_close'}
                            >
                                오늘하루 그만보기
                            </label>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default LayerPopup;
