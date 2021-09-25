import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { wonComma } from '../../utils/utils';
import Product from './Product';
import { useCategoryState } from '../../context/category.context';

export default function RelatedProducts({ products, reset }) {

  const { categories } = useCategoryState();

  return (
    <div className="product_cont first recommend">
      <div className="slide_box together_prd_slider swiper-container">
        <h2 className="title">함께 구매하시면 좋은 추천 제품</h2>
        <Swiper 
          className="swiper-wrapper product_List"
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl : '.swiper-button-next',
            prevEl : '.swiper-button-prev',
          }}
          breakpointsinverse={"true"}
          breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 24,
              }
          }}
        >
          <>
            {
              products.map((product) => (
                <SwiperSlide key={ product.productNo } className="swiper-slide">
                  <Product 
                    product={product}
                    categories={categories}
                    reset={reset}
                  />
                </SwiperSlide>
              ))
            }
          </>
        </Swiper>
      <div className="swiper-button-next">다음</div>
      <div className="swiper-button-prev">이전</div>
    </div>
  </div>
  )
}