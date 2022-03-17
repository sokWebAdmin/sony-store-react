import React, { useState, useEffect } from 'react';

//util
import { loadBanner } from '../../api/display';

export default function Banner({ category }) {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        _initBanner();
    }, [category]);

    const _initBanner = async () => {
        try {
            const { data } = await loadBanner(category.bannerSectionCodes);

            if (data?.[0]?.accounts?.[0]?.banners?.length > 0) {
                const bannerData = {
                    accountName: data[0].accounts[0].accountName,
                    ...data?.[0]?.accounts?.[0]?.banners[0],
                };

                bannerData.nameHtml = bannerData.name
                    .split('/')
                    .map((s) => `<span>${s}</span>`)
                    .join('');
                bannerData.descriptionHtml = bannerData.description
                    .split('/')
                    .map((s) => `<span>${s}</span>`)
                    .join('');

                if (!!bannerData.imageUrl) {
                    setBanner(bannerData);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const moveLink = () => {
        if (!!banner?.landingUrl) {
            window.openWindow(
                banner.landingUrl,
                banner.browerTargetType === 'CURRENT' ? '_self' : '_blank',
            );
        }
    };

    return (
        <>
            {banner && (
                <>
                    <div
                        className='product product__banner product__banner--shadow'
                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                    >
                        <div className='product__banner__name'>
                            {banner.accountName}
                        </div>
                        <div
                            className='product__banner__title'
                            dangerouslySetInnerHTML={{
                                __html: banner.nameHtml,
                            }}
                        ></div>
                        <div
                            className='product__banner__desc'
                            dangerouslySetInnerHTML={{
                                __html: banner.descriptionHtml,
                            }}
                        ></div>
                        <a
                            href='#'
                            className='product__banner__link'
                            onClick={(e) => {
                                moveLink();
                                e.preventDefault();
                            }}
                        >
                            자세히 보기
                        </a>
                    </div>
                    {/* <!--  아이템 갯수 css 를 위해 빈 아이템 ".blank" 추가 --> */}
                    <div className='product blank'></div>
                </>
            )}
        </>
    );
}
