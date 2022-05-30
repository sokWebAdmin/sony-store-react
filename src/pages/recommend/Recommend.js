import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import SEO from 'components/SEO';
import RecommendEventBanners from 'components/recommend/RecommendEventBanners';
import { getLinkTarget, splitStr } from 'utils/html';
import { useWindowSize } from 'hooks/useWindowSize';
import { loadBanner } from 'api/display';
import { bannerCode } from 'bannerCode';
import { recommend } from 'const/seo';
import 'assets/scss/contents.scss';
import 'assets/scss/recommend.scss';

export default function Recommend() {
    const { height } = useWindowSize();
    const [slideBanners, setSlideBanners] = useState([]);
    const [recommendTopBanners, setRecommendTopBanners] = useState([]);
    const [recommendBottomBanners, setRecommendBottomBanners] = useState([]);
    const [middleBanners, setMiddleBanners] = useState([]);
    const [eventBanners, setEventBanners] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                //배너 코드 객체로 관리하기
                //응답이 순서를 보징하지 않음
                const { kvPc, kvMo, recommend, bg, event } =
                    bannerCode.recommend;
                const { data } = await loadBanner(
                    `${kvPc},${kvMo},${recommend},${bg},${event}`,
                );

                data.forEach(({ code, accounts }) => {
                    switch (code) {
                        case kvPc:
                            setSlideBanners(accounts || []);
                            break;
                        case recommend:
                            if (accounts.length > 4) {
                                setRecommendTopBanners(accounts.splice(0, 4));
                                setRecommendBottomBanners(accounts);
                            } else {
                                setRecommendTopBanners(accounts);
                            }
                            break;
                        case bg:
                            setMiddleBanners(accounts || []);
                            break;
                        case event:
                            setEventBanners(accounts || []);
                            break;
                        default:
                            break;
                    }
                });
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <>
            <SEO data={recommend} />

            <div className='contents recommend'>
                <div className='container'>
                    <div className='content'>
                        <div className='reco'>
                            {/* kv */}
                            {slideBanners.length > 0 && (
                                <div
                                    className='reco_kv'
                                    style={{ height: '70vh' }}
                                >
                                    <div className='reco_kv_inner end'>
                                        <Controller>
                                            <Scene
                                                triggerElement='.trigger-3'
                                                duration={height * 1.2}
                                                delay={3}
                                            >
                                                {(progress) => (
                                                    <Tween
                                                        duration='2'
                                                        delay='2'
                                                        totalProgress={progress}
                                                        paused
                                                    >
                                                        <div
                                                            id='reco_kv_img-3'
                                                            className='reco_kv_img reco_kv_img-3 end'
                                                        >
                                                            <img
                                                                src={
                                                                    slideBanners[0]
                                                                        ?.banners[0]
                                                                        ?.imageUrl
                                                                }
                                                                alt={
                                                                    slideBanners[0]
                                                                        ?.banners[0]
                                                                        ?.name
                                                                }
                                                            />
                                                        </div>
                                                    </Tween>
                                                )}
                                            </Scene>
                                        </Controller>
                                        <Controller>
                                            <Scene
                                                triggerElement='.trigger-4'
                                                duration={height * 1.2}
                                            >
                                                {(progress) => (
                                                    <Tween
                                                        totalProgress={progress}
                                                        paused
                                                    >
                                                        <div
                                                            className={`reco_kv_copy ${
                                                                progress > 0
                                                                    ? 'end'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <h1
                                                                className='reco_kv_title'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: splitStr(
                                                                        slideBanners[0]
                                                                            ?.banners[0]
                                                                            ?.name,
                                                                    ),
                                                                }}
                                                            />
                                                            <p
                                                                className='reco_kv_desc'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: splitStr(
                                                                        slideBanners[0]
                                                                            ?.banners[0]
                                                                            ?.description,
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    </Tween>
                                                )}
                                            </Scene>
                                        </Controller>
                                        <Controller>
                                            <Scene triggerElement='.trigger-end'>
                                                {(progress) => <></>}
                                            </Scene>
                                        </Controller>
                                    </div>

                                    <div
                                        className='trigger trigger-3'
                                        style={{ top: '0vh' }}
                                    />
                                    <div
                                        className='trigger trigger-4'
                                        style={{ top: '30vh' }}
                                    />
                                    <div
                                        className='trigger trigger-end'
                                        style={{ top: '70vh' }}
                                    />
                                </div>
                            )}
                            {/* //kv */}
                            {/* flex */}
                            <Controller>
                                <div className='reco_items'>
                                    {recommendTopBanners.length > 0 &&
                                        recommendTopBanners.map(
                                            (bannerInfo, index) => (
                                                <div
                                                    className='reco_item'
                                                    key={index}
                                                >
                                                    <div className='reco_item_inner'>
                                                        <Scene
                                                            triggerElement='.reco_item_inner'
                                                            duration={
                                                                height * 0.5
                                                            }
                                                            triggerHook={0.75}
                                                        >
                                                            {(progress) => (
                                                                <Tween
                                                                    duration={1}
                                                                    totalProgress={
                                                                        progress
                                                                    }
                                                                    paused
                                                                >
                                                                    <Link
                                                                        to={
                                                                            bannerInfo
                                                                                .banners[0]
                                                                                .landingUrl
                                                                        }
                                                                        target={getLinkTarget(
                                                                            bannerInfo
                                                                                ?.banners[0]
                                                                                .browerTargetType,
                                                                        )}
                                                                        className={`reco_prod ${
                                                                            progress ===
                                                                                1 &&
                                                                            'end'
                                                                        }`}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                bannerInfo
                                                                                    .banners[0]
                                                                                    .imageUrl
                                                                            }
                                                                            alt={
                                                                                bannerInfo
                                                                                    .banners[0]
                                                                                    .name
                                                                            }
                                                                            className='reco_prod_img'
                                                                        />
                                                                    </Link>
                                                                </Tween>
                                                            )}
                                                        </Scene>

                                                        <Scene
                                                            triggerElement='.reco_item_inner'
                                                            duration={
                                                                height * 0.5
                                                            }
                                                            triggerHook={0.75}
                                                        >
                                                            {(progress) => (
                                                                <Tween
                                                                    duration={1}
                                                                    totalProgress={
                                                                        progress
                                                                    }
                                                                    paused
                                                                >
                                                                    <h2
                                                                        className={`reco_title ${
                                                                            progress ===
                                                                                1 &&
                                                                            'end'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            bannerInfo
                                                                                .banners[0]
                                                                                .name
                                                                        }
                                                                    </h2>
                                                                </Tween>
                                                            )}
                                                        </Scene>

                                                        <Scene
                                                            triggerElement='.reco_item_inner'
                                                            duration={
                                                                height * 0.5
                                                            }
                                                            triggerHook={0.75}
                                                        >
                                                            {(progress) => (
                                                                <Tween
                                                                    duration={1}
                                                                    totalProgress={
                                                                        progress
                                                                    }
                                                                    paused
                                                                >
                                                                    <p
                                                                        className={`reco_desc ${
                                                                            progress ===
                                                                                1 &&
                                                                            'end'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            bannerInfo
                                                                                .banners[0]
                                                                                .description
                                                                        }
                                                                    </p>
                                                                </Tween>
                                                            )}
                                                        </Scene>
                                                    </div>
                                                </div>
                                            ),
                                        )}

                                    <div
                                        className='reco_banner'
                                        style={{
                                            backgroundImage: `url(${middleBanners[0]?.banners[0]?.imageUrl})`,
                                            backgroundSize: '100%',
                                        }}
                                    >
                                        <Scene
                                            triggerElement='.reco_banner'
                                            duration={height * 0.5}
                                            triggerHook={0.75}
                                        >
                                            {(progress) => (
                                                <Tween duration={1}>
                                                    <div
                                                        className={`reco_banner_img ${
                                                            progress > 0
                                                                ? 'end'
                                                                : ''
                                                        }`}
                                                    >
                                                        <img
                                                            src={
                                                                middleBanners[0]
                                                                    ?.banners[1]
                                                                    ?.imageUrl
                                                            }
                                                            alt={
                                                                middleBanners[0]
                                                                    ?.banners[1]
                                                                    ?.name
                                                            }
                                                        />
                                                    </div>
                                                </Tween>
                                            )}
                                        </Scene>
                                    </div>

                                    {recommendBottomBanners.map(
                                        (bannerInfo, index) => (
                                            <div
                                                className='reco_item'
                                                key={index}
                                            >
                                                <div className='reco_item_inner'>
                                                    <Scene
                                                        triggerElement='.reco_item_inner'
                                                        duration={height * 0.5}
                                                        triggerHook={0.75}
                                                    >
                                                        {(progress) => (
                                                            <Tween
                                                                duration={1}
                                                                totalProgress={
                                                                    progress
                                                                }
                                                                paused
                                                            >
                                                                <Link
                                                                    to={
                                                                        bannerInfo
                                                                            .banners[0]
                                                                            .landingUrl
                                                                    }
                                                                    target={getLinkTarget(
                                                                        bannerInfo
                                                                            ?.banners[0]
                                                                            .browerTargetType,
                                                                    )}
                                                                    className={`reco_prod ${
                                                                        progress ===
                                                                            1 &&
                                                                        'end'
                                                                    }`}
                                                                >
                                                                    <img
                                                                        src={
                                                                            bannerInfo
                                                                                .banners[0]
                                                                                .imageUrl
                                                                        }
                                                                        alt={
                                                                            bannerInfo
                                                                                .banners[0]
                                                                                .name
                                                                        }
                                                                        className='reco_prod_img'
                                                                    />
                                                                </Link>
                                                            </Tween>
                                                        )}
                                                    </Scene>

                                                    <Scene
                                                        triggerElement='.reco_item_inner'
                                                        duration={height * 0.5}
                                                        triggerHook={0.75}
                                                    >
                                                        {(progress) => (
                                                            <Tween
                                                                duration={1}
                                                                totalProgress={
                                                                    progress
                                                                }
                                                                paused
                                                            >
                                                                <h2
                                                                    className={`reco_title ${
                                                                        progress ===
                                                                            1 &&
                                                                        'end'
                                                                    }`}
                                                                >
                                                                    {
                                                                        bannerInfo
                                                                            .banners[0]
                                                                            .name
                                                                    }
                                                                </h2>
                                                            </Tween>
                                                        )}
                                                    </Scene>

                                                    <Scene
                                                        triggerElement='.reco_item_inner'
                                                        duration={height * 0.5}
                                                        triggerHook={0.75}
                                                    >
                                                        {(progress) => (
                                                            <Tween
                                                                duration={1}
                                                                totalProgress={
                                                                    progress
                                                                }
                                                                paused
                                                            >
                                                                <p
                                                                    className={`reco_desc ${
                                                                        progress ===
                                                                            1 &&
                                                                        'end'
                                                                    }`}
                                                                >
                                                                    {
                                                                        bannerInfo
                                                                            .banners[0]
                                                                            .description
                                                                    }
                                                                </p>
                                                            </Tween>
                                                        )}
                                                    </Scene>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Controller>
                            {/* //flex */}
                            {/* 기획전 슬라이드 */}
                            {eventBanners.length > 0 && (
                                <RecommendEventBanners
                                    eventBanners={eventBanners}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
