import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { loadBanner } from 'api/display';
import { getLinkTarget } from 'utils/html';
import { bannerCode } from 'bannerCode';
import 'assets/scss/partials/myPageBanner.scss';

const BToBBanners = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        (async () => {
            const { asc, employee, refined } = bannerCode.myPage;

            const result = await Promise.all([
                loadBanner(employee),
                loadBanner(refined),
                loadBanner(asc),
            ]);

            result.forEach((data) => {
                const banners = data.data
                    .flatMap((section) => section.accounts)
                    .flatMap((account) => account.banners);
                setBanners((prev) => [...prev, ...banners]);
            });
        })();
    }, []);

    return (
        <div className='cont_inner'>
            <div className='b2b_banner'>
                {banners.length === 1 && (
                    <span className='banner_text'>
                        회원님께만 제공되는 특별한 혜택!
                    </span>
                )}
                {banners.length > 0 &&
                    banners.map(
                        (
                            {
                                landingUrl,
                                browerTargetType,
                                leftSpaceColor,
                                rightSpaceColor,
                                imageUrl,
                                nameColor,
                                name,
                                description,
                            },
                            index,
                        ) => {
                            return (
                                <Link
                                    key={index}
                                    to={landingUrl}
                                    target={getLinkTarget(browerTargetType)}
                                    className='b2b_link'
                                    style={{
                                        background: `linear-gradient(to right, ${leftSpaceColor}, ${rightSpaceColor})`,
                                    }}
                                >
                                    <img
                                        className='banner_icon'
                                        src={imageUrl}
                                        alt={`${name} 아이콘`}
                                    />
                                    <div className='txt_box'>
                                        <p
                                            className='tit'
                                            style={{ color: nameColor }}
                                        >
                                            {name}
                                        </p>
                                        <p
                                            className='txt'
                                            style={{ color: nameColor }}
                                        >
                                            {description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        },
                    )}
            </div>
        </div>
    );
};

export default memo(BToBBanners);
