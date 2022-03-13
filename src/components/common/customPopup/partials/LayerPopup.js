import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { POPUP_Z_INDEX_START_AT } from 'utils/constants';
import 'assets/scss/partials/customPopup.scss';

const LayerPopup = ({ popup, todayNotShow, index }) => {
    const [show, setShow] = useState(true);
    const [popupContents, setPopupContents] = useState('');

    useEffect(() => {
        if (show) {
            setPopupContents(popup.content);
        }

        return () => {
            setPopupContents('');
        };
    }, [popup.content, show]);

    return (
        show && (
            <>
                <div
                    className='layer_mask'
                    tabIndex='0'
                    style={{
                        display: 'block',
                        zIndex: `${POPUP_Z_INDEX_START_AT + index}`,
                    }}
                />
                <div
                    className='popup_wrap custom_popup_layer'
                    style={{ display: 'block' }}
                >
                    <div className='pop_inner'>
                        <div
                            className='pop_cont custom_popup_layer--container'
                            style={{
                                width: `${popup.width}px`,
                                height: `${popup.height}px`,
                            }}
                            dangerouslySetInnerHTML={{ __html: popupContents }}
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

LayerPopup.propTypes = {
    popup: PropTypes.shape({
        content: PropTypes.string.isRequired,
        displayTypes: PropTypes.array.isRequired,
        endYmdt: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        pageInfos: PropTypes.object.isRequired,
        popupNo: PropTypes.number.isRequired,
        popupPosition: PropTypes.string.isRequired,
        startYmdt: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    }),
    todayNotShow: PropTypes.shape({
        get: PropTypes.func.isRequired,
        getPeriod: PropTypes.func.isRequired,
        set: PropTypes.func.isRequired,
    }),
    index: PropTypes.number.isRequired,
};

export default LayerPopup;
