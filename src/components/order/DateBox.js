import React, { useState } from 'react';
import { addMonth } from '../../utils/dateFormat';

// components
import DatePicker from '../../components/common/DatePicker';

export default function DateBox({ search }) {
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

  return (
    <div class="date_box">
      <ul class="date3_tab">
        <li class={`tabs ${selectMenu === 'threeM' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={(e) => onClickTab(e, 'threeM')}>
            3개월
          </a>
        </li>
        <li class={`tabs ${selectMenu === 'sixM' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={(e) => onClickTab(e, 'sixM')}>
            6개월
          </a>
        </li>
        <li class={`tabs ${selectMenu === 'oneY' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={(e) => onClickTab(e, 'oneY')}>
            1년
          </a>
        </li>
      </ul>
      <div class="date_rang">
        <DatePicker
          dateValue={period.startDate}
          height={'32px'}
          bindDate={onChangeStartDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
        />
        <span style={{ lineHeight: '32px' }}>&nbsp;~&nbsp;</span>
        <DatePicker
          dateValue={period.endDate}
          height={'32px'}
          bindDate={onChangeEndDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
        />
        <button class="button button_positive button-s" type="button" onClick={onClickSearch}>
          조회
        </button>
      </div>
    </div>
  );
}
