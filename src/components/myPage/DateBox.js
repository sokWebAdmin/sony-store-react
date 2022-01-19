import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import DatePicker from 'components/common/DatePicker';

const DateBox = ({
    selectMenu,
    startDate,
    endDate,
    onClickTab,
    style,
    onClickSearch,
    onChangeStartDate,
    onChangeEndDate,
}) => {
    return (
        <div className='date_box' style={style}>
            <ul className='date3_tab'>
                <li className={`tabs ${selectMenu === 'threeM' && 'on'}`}>
                    <span
                        className='date3_btn'
                        onClick={() => onClickTab('threeM')}
                    >
                        3개월
                    </span>
                </li>
                <li className={`tabs ${selectMenu === 'sixM' && 'on'}`}>
                    <span
                        className='date3_btn'
                        onClick={() => onClickTab('sixM')}
                    >
                        6개월
                    </span>
                </li>
                <li className={`tabs ${selectMenu === 'oneY' && 'on'}`}>
                    <span
                        className='date3_btn'
                        onClick={() => onClickTab('oneY')}
                    >
                        1년
                    </span>
                </li>
            </ul>
            <div className='date_rang'>
                <DatePicker
                    selectMenu={selectMenu}
                    dateValue={startDate}
                    bindDate={onChangeStartDate}
                    // option={{
                    //     selectableRanges: [[null, endDate]],
                    // }}
                    style={{ flexBasis: '100%' }}
                    width='100%'
                    height='32px'
                />
                <span style={{ lineHeight: '32px' }}>&nbsp;~&nbsp;</span>
                <DatePicker
                    selectMenu={selectMenu}
                    dateValue={endDate}
                    calendarStyle={
                        isMobile && { position: 'absolute', left: '-130px' }
                    }
                    bindDate={onChangeEndDate}
                    // option={{
                    //     selectableRanges: [[startDate, new Date()]],
                    // }}
                    style={{ flexBasis: '100%' }}
                    width='100%'
                    height='32px'
                />
                <button
                    className='button button_positive button-s'
                    type='button'
                    onClick={onClickSearch}
                >
                    조회
                </button>
            </div>
        </div>
    );
};

DateBox.propTypes = {
    selectMenu: PropTypes.string,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    onClickTab: PropTypes.func,
    style: PropTypes.object,
    onClickSearch: PropTypes.func,
    onChangeStartDate: PropTypes.func,
    onChangeEndDate: PropTypes.func,
};

export default DateBox;
