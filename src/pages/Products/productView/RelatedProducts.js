import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from "react-router-dom";

export default function RelatedProducts() {

  const history = useHistory();

  return (
    <div className="product_cont first recommend">
      <div className="slide_box together_prd_slider swiper-container">
        <h2 className="title">함께 구매하시면 좋은 추천 제품</h2>
        <Swiper className="swiper-wrapper product_List"
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
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_06.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
              <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_05.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임 G 렌즈원핸드 컴팩트 풀프레임 G 렌즈
                      원핸드 컴팩트 풀프레임
                      원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
              <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_04.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임 G 렌즈
                      원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
              <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_03.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임 G 렌즈
                      원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
              <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_02.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임 G 렌즈
                      원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="product_tabArea">
              {/* 상품 이미지*/}
              <div className="product_img">
                <a >
                  <div className="img-box">
                    <div className="inner">
                      <img src="/images/_tmp/item640x640_01.png" alt="" />
                    </div>
                  </div>
                </a>
              </div>
              {/*// 상품 이미지*/}
              {/* 상품 이름*/}
              <div className="product-name">
                <div className="product-option">
                <a href="#none" onClick={()=>{history.push('/product-view/1')}}>
                    <strong>SEL50F25G</strong>
                    <p>원핸드 컴팩트 풀프레임 G 렌즈
                      원핸드 컴팩트 풀프레임</p>
                  </a>
                  <div className="price">
                    <strong>899,000</strong>원
                  </div>
                </div>
              </div>
              {/*// 상품 이름*/}
            </div>
          </SwiperSlide>
        </Swiper>
      <div className="swiper-button-next">다음</div>
      <div className="swiper-button-prev">이전</div>
    </div>
  </div>
  )
}