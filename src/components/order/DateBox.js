import React, { useState, useEffect } from 'react';

export default function DateBox({ search }) {
  const [selectMenu, setSelectMenu] = useState('threeM');
  const [period, setPeriod] = useState({ startDate: new Date().toString(), endDate: new Date().toString() });

  const onClickTab = (menu) => {
    console.log('클릭:', menu);
    setSelectMenu(menu);
    search();
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
        {/* <DatePicker
                style={{ display: specifyDelivery ? 'block' : 'none' }}
                disabled={!specifyDelivery}
                bindDate={setSpecifyDeliveryDate}
                option={{
                  selectableRanges: [
                    [
                      new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
                      new Date(2999, 12, 31)]],
                }}
              /> */}
        <div class="calendar_box">
          <input type="text" id="datepicker1" class="inp datepicker" autocomplete="off" />
        </div>
        <div class="calendar_box">
          <input type="text" id="datepicker2" class="inp datepicker" autocomplete="off" />
        </div>
        <button class="button button_positive button-s" type="button">
          조회
        </button>
      </div>
    </div>
  );
}
