import { useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller  } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBoardDispatch, useBoardState } from "../../../../context/board.context";
import { useWindowSize } from "../../../../utils/utils";

export default function FaqCategories() {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  const size = useWindowSize();
  const [swiperTab, setSwiperTab] = useState(null);

  const dispatch = useBoardDispatch();
  const { config, currentCategoryNo } = useBoardState();

  const onClickCategory = (event, categoryNo, idx) => {
    event.preventDefault();
    if (categoryNo === currentCategoryNo) return;

    dispatch({
      type: 'SELECT_CATEGORY',
      data: { categoryNo }
    });

    swiperTab?.slideTo(idx);
  };

  return (
    <div className="category_center">
      <div className="category_slide_tab swiper-container">
      {
        size.width < 1199 ?
          <Swiper
            className="swiper-wrapper"
            slidesPerView="auto"
            freeMode={true}
            spaceBetween={0}
            observer={true}
            observeParents={true}
            breakpoints={{
              1281: {
                touchRatio: 0,
                centeredSlides: false,
              }
            }}
            onSwiper={setSwiperTab}
          >
          {
            config.faq.categories.map(({
                                         categoryNo,
                                         label
                                       }, idx) => {
              return (
                <SwiperSlide
                  key={categoryNo}
                  className={`swiper-slide ${categoryNo === currentCategoryNo ? 'on' : ''}`}
                  data-view-category={categoryNo}
                  onClick={ event => onClickCategory(event, categoryNo, idx) }
                >
                  <a href={ `#${label}` } className="btn"><span>{ label }</span></a>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
        :
        <ul className="swiper-wrapper">
          {
            config.faq.categories.map(({
                                         categoryNo,
                                         label
                                       }) => {
              return (
                <li
                  key={categoryNo}
                  className={`swiper-slide ${categoryNo === currentCategoryNo ? 'on' : ''}`}
                  data-view-category={categoryNo}
                  onClick={ event => onClickCategory(event, categoryNo) }
                >
                  <a href={ `#${label}` } className="btn"><span>{ label }</span></a>
                </li>
              )
            })
          }
        </ul>
      }
      </div>
    </div>
  )
}  
