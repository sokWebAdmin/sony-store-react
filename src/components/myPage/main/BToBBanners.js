import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBanner } from '../../../api/display';

import '../../../assets/scss/partials/myPageBanner.scss';
import { bannerCode } from '../../../bannerCode';

const BToBBanners = () => {
    const [banners, setBanners] = useState([]);

    const init = useCallback(async () => {
        const { asc, employee, refined } = bannerCode.myPage;
        mapData(await fetchBanner(employee));
        mapData(await fetchBanner(refined));
        mapData(await fetchBanner(asc));
    }, []);

    useEffect(init, []);

    async function fetchBanner(bannerNumber) {
        const { data } = await loadBanner(bannerNumber);
        return data;
    }

    function mapData(data) {
        const result = data
            .flatMap((section) => section.accounts)
            .flatMap((account) => account.banners);
        setBanners((prev) => [...prev, ...result]);
    }

    return (
        <div className='cont_inner'>
            <div className='b2b_banner'>
                {banners.length === 1 && (
                    <span className='banner_text'>
                        회원님께만 제공되는 특별한 혜택!
                    </span>
                )}
                {banners.map((banner, index) => (
                    <Banner banner={banner} key={index} />
                ))}
            </div>
        </div>
    );
};

const Banner = ({ banner }) => (
    <>
        <Link
            to={banner.landingUrl}
            target={banner?.browerTargetType === 'CURRENT' ? '_self' : '_blank'}
            className={`b2b_link`}
            style={{
                background: `linear-gradient(to right, ${banner.leftSpaceColor}, ${banner.rightSpaceColor})`,
            }}
        >
            <img
                className='banner_icon'
                src={banner.imageUrl}
                alt={banner.name + ' 아이콘'}
            />
            <div className='txt_box'>
                <p className='tit'>{banner.name}</p>
                <p className='txt'>{banner.description}</p>
            </div>
        </Link>
    </>
);

export default BToBBanners;
