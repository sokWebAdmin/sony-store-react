import { useState, useEffect } from 'react';
import { Controller } from 'react-scrollmagic';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
} from 'swiper/core';

import { getEventByEventNo } from 'api/display';
import SEOHelmet from 'components/SEOHelmet';
import { bannerCode } from 'bannerCode';
import 'assets/scss/contents.scss';
import 'assets/scss/recommend.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

export default function Curation() {
    const [url, setUrl] = useState('');
    const { curation } = bannerCode;

    useEffect(() => {
        (async () => {
            const response = await getEventByEventNo(curation);

            if (response.status === 400) return;
            setUrl(response.data.url);
        })();
    }, []);

    const iframePart = () => {
        return {
            __html: `<iframe src="${url}" width="100%" height="5467px"></iframe>`,
        };
    };

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

    return (
        <>
            <SEOHelmet title={'스토어 추천제품 : 선물제안'} />
            <Controller>
                <div className='contents recommend'>
                    <div className='container'>
                        <div className='content'>
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'center',
                                }}
                                dangerouslySetInnerHTML={iframePart()}
                            />
                        </div>
                    </div>
                </div>
            </Controller>
        </>
    );
}
