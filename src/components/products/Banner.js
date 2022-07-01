import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import { getLinkTarget } from 'utils/html';
import { loadBanner } from 'api/display';

const Banner = ({ category }) => {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        (async () => {
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
        })();
    }, [category]);

    const onClickDetail = (e) => {
        e.preventDefault();

        if (!!banner?.landingUrl) {
            window.openWindow(
                banner.landingUrl,
                getLinkTarget(banner.browerTargetType),
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
                            style={{ color: banner.nameColor }}
                        ></div>
                        <div
                            className='product__banner__desc'
                            dangerouslySetInnerHTML={{
                                __html: banner.descriptionHtml,
                            }}
                            style={{ color: banner.nameColor }}
                        ></div>
                        <a
                            href='#'
                            className='product__banner__link'
                            onClick={onClickDetail}
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
};

Banner.propTypes = {
    category: PropTypes.shape({
        bannerSectionCodes: PropTypes.string.isRequired,
        categoryNo: PropTypes.number.isRequired,
        children: PropTypes.array.isRequired,
        content: PropTypes.string.isRequired,
        depth: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired,
        isAvailableMoveProductCompare: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    changeCurrentCategoryByNo: PropTypes.func.isRequired,
};

export default memo(Banner);

