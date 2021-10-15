import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Controller, Navigation, Pagination, Scrollbar } from 'swiper/core';
import { loadBanner } from '../../api/display';
import { getStrDate } from '../../utils/dateFormat';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../hooks';
import styled from 'styled-components';

const EventTop = () => {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  const underPc = useMediaQuery('(max-width: 1280px)');
  const [banners, setBanners] = useState([]);
  const [bannersMo, setBannersMo] = useState([]);

  const fetchBanners = async () => {
    const { data } = await loadBanner('006');
    const response = await loadBanner('007');
    setBanners(data[0].accounts[0].banners);
    setBannersMo(response.data[0].accounts[0].banners);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const bannerMap = (banner) => {
    const splitName = banner?.name?.split('/');
    const title = splitName.join('<br/>');
    return (
      <SwiperSlide className="swiper-slide" key={banner.name + underPc ? 'Y' : 'N'}>
        <div className="slider_box"
             style={{ background: `url('${banner.imageUrl}') center 80% / cover no-repeat` }}>
          <img className="bg_img" src={banner.imageUrl} alt={banner.name} />
          <div className="desc_box">
            <p className="tit" style={{ color: banner.nameColor }} dangerouslySetInnerHTML={{ __html: title }} />
            <p className="txt">{banner.description}</p>
            <p
              className="event_duration">{getStrDate(banner.displayStartYmdt)} ~ {getStrDate(banner.displayEndYmdt)}</p>
            <div className="btn_article">
              {/*<Link to={banner.landingUrl} className="event_link" >자세히 보기</Link>*/}
              <DetailLink to={banner.landingUrl} className="event_link" color={banner.nameColor}>자세히 보기</DetailLink>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <>
      <div className="event_slider swiper-container">
        {(banners.length > 0 && !underPc) &&
        <Swiper
          className="swiper-wrapper"
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          initialSlide={0}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.event-banner-pagination',
            type: 'custom',
            renderCustom: (swiper, current, total) => {
              let _current = current;
              let _total = total;
              if (current < 10) _current = '0' + current;
              if (total < 10) _total = '0' + total;
              return '<span class=\'swiper-pagination-current\'>' + _current + '</span> / ' +
                '<span class=\'swiper-pagination-total\'>' + _total + '</span>';
            },
          }}
        >
          {banners.map(bannerMap)}
          <div className="arrow_btn">
            <a href="javascript:void(0)" className="arrow swiper-button-prev"><span className="ico_btn">이전</span></a>
            <a href="javascript:void(0)" className="arrow swiper-button-next"><span className="ico_btn">다음</span></a>
          </div>
        </Swiper>}
        {(bannersMo.length && underPc) &&
        <Swiper
          className="swiper-wrapper"
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          initialSlide={0}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.event-banner-pagination',
            type: 'custom',
            renderCustom: (swiper, current, total) => {
              let _current = current;
              let _total = total;
              if (current < 10) _current = '0' + current;
              if (total < 10) _total = '0' + total;
              return '<span class=\'swiper-pagination-current\'>' + _current + '</span> / ' +
                '<span class=\'swiper-pagination-total\'>' + _total + '</span>';
            },
          }}
        >
          {bannersMo.map(bannerMap)}
          <div className="arrow_btn">
            <a href="javascript:void(0)" className="arrow swiper-button-prev"><span className="ico_btn">이전</span></a>
            <a href="javascript:void(0)" className="arrow swiper-button-next"><span className="ico_btn">다음</span></a>
          </div>
        </Swiper>}
        <div className="swiper-pagination event-banner-pagination" />
      </div>
    </>
  );
};

const DetailLink = styled(Link)`
  color: ${({color}) => color};
  &:after {
    border-top: 2px solid ${({color}) => color};
    border-right: 2px solid ${({color}) => color};
  }
`;

export default EventTop;
