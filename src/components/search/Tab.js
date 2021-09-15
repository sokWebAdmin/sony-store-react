import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss";

import { useWindowSize } from "../../utils/utils";
import { TAB_MAP } from '../../const/search';

const tabs = Object.keys(TAB_MAP);

export default function Tab({ tabState, setTabState, count }) {
  const size = useWindowSize();

  return (
    <>
    { 
      size.width < 1281 ?
        <div className="swipe_tab swiper-container">
          <Swiper className="swiper-wrapper"
          navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          }}
          slidesPerView="auto"
          freeMode={true}
        >
          {
            tabs.map(tab => {
              return (
                <SwiperSlide
                  key={ tab }
                  className={`swiper-slide ${tabState === tab ? "active" : ""}`}
                >
                  <a 
                    href={`#${tab}`}
                    onClick={ event => {
                      event.preventDefault();
                      setTabState(tab);
                    } }  
                  >{ TAB_MAP[tab] }{ `(${count[tab]})` }</a>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
          <div className="swiper-button-prev">
            <a href="#none" title="메뉴 더보기">메뉴 더보기</a>
          </div>

          <div className="swiper-button-next">
            <a href="#none" title="메뉴 더보기">메뉴 더보기</a>
          </div>
        </div>
      :
        <div class="swipe_tab swiper-container">
          <ul class="swiper-wrapper">
            {
              tabs.map(tab => {
                
                return (
                  <li
                    key={ tab }
                    className={`swiper-slide ${tabState === tab ? "active" : ""}`}
                  >
                    <a 
                      href={`#${tab}`}
                      onClick={ event => {
                        event.preventDefault();
                        setTabState(tab);
                      } }  
                    >{ TAB_MAP[tab] }{ `(${count[tab]})` }</a>
                  </li>
                )
              })
            }
          </ul>
          <div class="swiper-button-prev">
            <a href="#none" title="메뉴 더보기">메뉴 더보기</a>
          </div>
          <div class="swiper-button-next">
            <a href="#none" title="메뉴 더보기">메뉴 더보기</a>
          </div>
        </div>
    }
    </>
  )
}