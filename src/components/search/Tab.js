import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';

import { TAB_MAP } from 'const/search';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

export default function Tab({ tabState, setTabState, count, setReset }) {
    const [swiperTab, setSwiperTab] = useState(null);
    SwiperCore.use([Navigation]);

    const onSwiperClick = (tab, idx) => {
        setTabState(tab);
        swiperTab?.slideTo(idx);
        setReset(true);
    };

    return (
        <div className='swipe_tab swiper-container'>
            <Swiper
                className='swiper-wrapper'
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                tag='ul'
                slidesPerView='auto'
                freeMode={true}
                onSwiper={setSwiperTab}
            >
                {Object.keys(TAB_MAP).map((tab, idx) => (
                    <SwiperSlide
                        key={`${tab}${idx}`}
                        className={`swiper-slide ${
                            tabState === tab && 'active'
                        }`}
                        tag='li'
                    >
                        <a
                            href={`#${tab}`}
                            onClick={() => onSwiperClick(tab, idx)}
                        >
                            {`${TAB_MAP[tab]}(${count[tab]})`}
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
