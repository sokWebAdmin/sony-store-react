import { Swiper, SwiperSlide } from 'swiper/react';

export default function Event({ events }) {

  return (
    <div className="product_cont full">
      <div className="exhibitions_slider swiper-container">
        <Swiper className="swiper-wrapper"
          navigation={{
            nextEl : '.banner-next',
            prevEl : '.banner-prev',
          }}>
            {
              events?.map(({
                pcImageUrl,
                mobileimageUrl,
                tag,
                eventNo,
                label,
                promotionText,
                url
              }) => (
                <SwiperSlide key={ eventNo } className="swiper-slide">
                  <a href={url} target="_blank" rel="noreferrer" alt="event" >
                    <div className="exhibitions_box" style={{background: `url(${pcImageUrl}) no-repeat center top`}}>
                      <img className="bg_img" src={ `${pcImageUrl}` } alt="" />{/* 슬라이드 배경 */}
                      <div className="txt_box">
                        <span className="tag" style={{color: '#5865f5'}}>{ tag }</span>
                        <p className="tit">{ label }<br />{ promotionText }</p>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))
            }
        </Swiper>
        <div className="arrow_btn">
          <a href="#none" className="arrow swiper-button-prev banner-prev"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
          <a href="#none" className="arrow swiper-button-next banner-next"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  )
}