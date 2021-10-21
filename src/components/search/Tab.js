import React from 'react';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

import { TAB_MAP } from '../../const/search';

const tabs = Object.keys(TAB_MAP);

export default function Tab({ tabState, setTabState, count }) {
  return (
    <>
      <div className="swipe_tab swiper-container">
        <ul className="swiper-wrapper">
          {tabs.map((tab, idx) => (
            <li key={`${tab}${idx}`} className={`swiper-slide ${tabState === tab && 'active'}`}>
              <a
                href={`#${tab}`}
                onClick={(event) => {
                  event.preventDefault();
                  setTabState(tab);
                }}
              >
                {TAB_MAP[tab]}
                {`(${count[tab]})`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
