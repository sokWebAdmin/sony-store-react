import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Autoplay,
    Controller,
    Navigation,
    Pagination,
    Scrollbar,
} from 'swiper/core';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { loadBanner } from 'api/display';
import { useMediaQuery } from 'hooks/useMedeaQuery';
import { bannerCode } from 'bannerCode';

const EventTop = () => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
    const underPc = useMediaQuery('(max-width: 1280px)');
    const onlyMo = useMediaQuery('(max-width: 640px)');
    const [banners, setBanners] = useState([]);
    const [bannersMo, setBannersMo] = useState([]);

    // '/'이 들어간 description을 개행처리한다.
    const breakLineDescription = (banners) =>
        banners.map((banner) => ({
            ...banner,
            description: banner.description.replaceAll('/', '<br />'),
        }));

    useEffect(() => {
        (async () => {
            const { pc, mo } = bannerCode.event;
            const { data: pcData } = await loadBanner(pc);
            const { data: moData } = await loadBanner(mo);
            setBanners(breakLineDescription(pcData[0].accounts[0].banners));
            setBannersMo(breakLineDescription(moData[0].accounts[0].banners));
        })();
    }, []);

    const BannerMap = (banner) => {
        const title = banner?.name?.split('/').join('<br/>');

        return (
            <SwiperSlide className='swiper-slide' key={banner.landingUrl}>
                <div
                    className='slider_box'
                    style={{
                        background: `url('${banner.imageUrl}') center 80% / cover no-repeat`,
                    }}
                >
                    <img
                        className='bg_img'
                        src={banner.imageUrl}
                        alt={banner.name}
                    />
                    <div className='desc_box'>
                        <p
                            className='tit'
                            style={{ color: banner.nameColor }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <p
                            className='txt'
                            style={{ color: banner.nameColor }}
                            dangerouslySetInnerHTML={{
                                __html: banner.description,
                            }}
                        ></p>
                        <p
                            className='event_duration'
                            style={{ color: banner.nameColor }}
                        >
                            {`${dayjs(banner.displayStartYmdt).format(
                                'YYYY-MM-DD',
                            )} ~ ${dayjs(banner.displayEndYmdt).format(
                                'YYYY-MM-DD',
                            )}`}
                        </p>
                        <div className='btn_article'>
                            <DetailLink
                                to={banner.landingUrl}
                                className='event_link'
                                color={banner.nameColor}
                                onlyMo={onlyMo}
                            >
                                자세히 보기
                            </DetailLink>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        );
    };

    const swiperParams = {
        slidesPerView: 1,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 6000,
            disableOnInteraction: true,
        },
        initialSlide: 0,
        navigation: {
            nextEl: '.arrow.swiper-button-next',
            prevEl: '.arrow.swiper-button-prev',
        },
        pagination: {
            el: '.event-banner-pagination',
            type: 'custom',
            clickable: true,
            renderCustom: (swiper, current, total) => {
                const currentPage = current < 10 ? '0' + current : current;
                const totalPage = total < 10 ? '0' + total : total;

                return `<span class='swiper-pagination-current'>${currentPage}</span> / <span class='swiper-pagination-total'>${totalPage}</span>`;
            },
        },
    };

    return (
        <>
            <div className='event_slider swiper-container'>
                {banners.length > 0 && !underPc && (
                    <Swiper className='swiper-wrapper' {...swiperParams}>
                        {banners.map(BannerMap)}
                        <div className='arrow_btn'>
                            <button className='arrow swiper-button-prev'>
                                <span className='ico_btn'>이전</span>
                            </button>
                            <button className='arrow swiper-button-next'>
                                <span className='ico_btn'>다음</span>
                            </button>
                        </div>
                    </Swiper>
                )}
                {bannersMo.length > 0 && underPc && (
                    <Swiper className='swiper-wrapper' {...swiperParams}>
                        {bannersMo.map(BannerMap)}
                        <div className='arrow_btn'>
                            <button className='arrow swiper-button-prev'>
                                <span className='ico_btn'>이전</span>
                            </button>
                            <button className='arrow swiper-button-next'>
                                <span className='ico_btn'>다음</span>
                            </button>
                        </div>
                    </Swiper>
                )}
                <div className='swiper-pagination event-banner-pagination' />
            </div>
        </>
    );
};

const DetailLink = styled(Link)`
    color: ${({ color }) => color};
    &:after {
        border-top: ${({ onlyMo }) => (onlyMo ? 1 : 2)}px solid
            ${({ color }) => color};
        border-right: ${({ onlyMo }) => (onlyMo ? 1 : 2)}px solid
            ${({ color }) => color};
    }
`;

export default EventTop;
