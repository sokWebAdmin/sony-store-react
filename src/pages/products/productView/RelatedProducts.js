import { Swiper, SwiperSlide } from 'swiper/react';
import { wonComma } from '../../../utils/utils';
import { Link } from 'react-router-dom';

export default function RelatedProducts({ products }) {

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
              products.map(({
                productNo,
                imageUrls,
                productName,
                productNameEn,
                salePrice
              }) => (
                <SwiperSlide key={ productNo } className="swiper-slide">
                  <div className="product_tabArea">
                    <div className="product_img">
                      <Link to={`/product-view/${productNo}`}>
                        <div className="img-box">
                          <div className="inner">
                            <img src={ imageUrls[0] } alt={ productName } />
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="product-name">
                      <div className="product-option">
                      <Link to={`/product-view/${productNo}`}>
                          <strong>{ productNameEn }</strong>
                          <p>{ productName }</p>
                      </Link>
                        <div className="price">
                          <strong>{ wonComma(salePrice) }</strong>원
                        </div>
                      </div>
                    </div>
                  </div>
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