import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { addMonth } from '../../utils/dateFormat';

// components
import DatePicker from '../common/DatePicker';

export default function DateBox({ search, firstSearch, style }) {
  const [selectMenu, setSelectMenu] = useState('threeM');
  const [period, setPeriod] = useState({ startDate: new Date(addMonth(new Date(), -3)), endDate: new Date() });

  const onClickTab = (e, menu) => {
    e.preventDefault();
    const setPeriodDate = {
      threeM: () => setPeriod({ ...period, startDate: new Date(addMonth(new Date(), -3)) }),
      sixM: () => setPeriod({ ...period, startDate: new Date(addMonth(new Date(), -6)) }),
      oneY: () => setPeriod({ ...period, startDate: new Date(addMonth(new Date(), -12)) }),
    };

    setSelectMenu(menu);
    setPeriodDate[menu]();
  };

  const onChangeStartDate = (startDate) => {
    setPeriod({ ...period, startDate });
  };

  const onChangeEndDate = (endDate) => {
    setPeriod({ ...period, endDate });
  };

  const onClickSearch = () => {
    const { startDate, endDate } = period;
    search({ startDate, endDate, pageNumber: 1, pageSize: 10 });
  };

  useEffect(() => {
    if (firstSearch) {
      const { startDate, endDate } = period;
      search({ startDate, endDate, pageNumber: 1, pageSize: 10 });
    }
  }, [firstSearch]);

  return (
    <div className="date_box" style={style}>
      <ul className="date3_tab">
        <li className={`tabs ${selectMenu === 'threeM' && 'on'}`}>
          <a href="#" className="date3_btn" onClick={(e) => onClickTab(e, 'threeM')}>
            3개월
          </a>
        </li>
        <li className={`tabs ${selectMenu === 'sixM' && 'on'}`}>
          <a href="#" className="date3_btn" onClick={(e) => onClickTab(e, 'sixM')}>
            6개월
          </a>
        </li>
        <li className={`tabs ${selectMenu === 'oneY' && 'on'}`}>
          <a href="#" className="date3_btn" onClick={(e) => onClickTab(e, 'oneY')}>
            1년
          </a>
        </li>
      </ul>
      <div className="date_rang">
        <DatePicker
          dateValue={period.startDate}
          width={'100%'}
          height={'32px'}
          bindDate={onChangeStartDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
          style={{ flexBasis: '100%' }}
        />
        <span style={{ lineHeight: '32px' }}>&nbsp;~&nbsp;</span>
        <DatePicker
          dateValue={period.endDate}
          width={'100%'}
          height={'32px'}
          calendarStyle={isMobile && { position: 'absolute', left: '-130px' }}
          bindDate={onChangeEndDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
          style={{ flexBasis: '100%' }}
        />
        <button className="button button_positive button-s" type="button" onClick={onClickSearch}>
          조회
        </button>
      </div>
    </div>
  );
}
