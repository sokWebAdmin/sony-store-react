import React, { useState } from 'react';

// components
import DatePicker from '../../components/common/DatePicker';

export default function DateBox({ search }) {
  const [selectMenu, setSelectMenu] = useState('threeM');
  const [period, setPeriod] = useState({ startDate: new Date().toString(), endDate: new Date().toString() });

  const onClickTab = (menu) => {
    console.log('클릭:', menu);
    setSelectMenu(menu);
    search();
  };

  const onChangeStartDate = (startDate) => {
    setPeriod({ ...period, startDate });
  };

  const onChangeEndDate = (endDate) => {
    setPeriod({ ...period, endDate });
  };

  return (
    <div class="date_box">
      <ul class="date3_tab">
        <li class={`tabs ${selectMenu === 'threeM' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={() => onClickTab('threeM')}>
            3개월
          </a>
        </li>
        <li class={`tabs ${selectMenu === 'sixM' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={() => onClickTab('sixM')}>
            6개월
          </a>
        </li>
        <li class={`tabs ${selectMenu === 'oneY' && 'on'}`}>
          <a href="#" class="date3_btn" onClick={() => onClickTab('oneY')}>
            1년
          </a>
        </li>
      </ul>
      <div class="date_rang">
        <DatePicker
          height={'32px'}
          bindDate={onChangeStartDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
        />
        <span style={{ lineHeight: '32px' }}>&nbsp;~&nbsp;</span>
        <DatePicker
          height={'32px'}
          bindDate={onChangeEndDate}
          option={{
            selectableRanges: [[null, new Date()]],
          }}
        />
        {/* <div class="calendar_box">
          <input type="text" id="datepicker1" class="inp datepicker" autocomplete="off" />
        </div>
        <div class="calendar_box">
          <input type="text" id="datepicker2" class="inp datepicker" autocomplete="off" />
        </div> */}
        <button class="button button_positive button-s" type="button">
          조회
        </button>
      </div>
    </div>
  );
}
