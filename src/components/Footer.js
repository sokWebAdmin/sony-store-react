import { useRef, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SocialLink from 'components/SocialLink';
import InsurePop from 'components/InsurePop';
import Floating from 'components/common/Floating';

import { useWindowSize } from 'hooks/useWindowSize';
import { useClickOutside } from 'hooks/useClickOutside';
import { MOBILE_WIDTH } from 'utils/constants';
import { SONY_COMPANY, SONY_FAMILY } from 'const/footer';
import facebook from 'assets/images/common/ic_facebook.svg';
import instagram from 'assets/images/common/ic_instagram.svg';
import youtube from 'assets/images/common/ic_youtube.svg';
import blog from 'assets/images/common/ic_blog.svg';

const Footer = ({ location, isAppBarEnabled, scrollAction }) => {
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width <= MOBILE_WIDTH, [width]);
    const footerStyle = useMemo(
        () => ({
            zIndex:
                location.pathname.includes('/order/sheet') ||
                location.pathname.includes('/product-view')
                    ? 100
                    : 900,
            paddingBottom: '64px',
        }),
        [location],
    );

    const SocialNetworks = useMemo(
        () => [
            {
                url: 'https://www.facebook.com/sonykorea',
                name: 'facebook',
                img: facebook,
            },
            {
                url: 'https://www.instagram.com/sonykorea',
                name: 'instagram',
                img: instagram,
            },
            {
                url: 'https://www.youtube.com/user/sonystyleblog',
                name: 'youtube',
                img: youtube,
            },
            {
                url: 'https://stylezineblog.com/?intcmp=Main_Blog',
                name: 'blog',
                img: blog,
            },
        ],
        [],
    );

    const [isPop, setPop] = useState(false);
    const [active, setActive] = useState(false);

    const footerRef = useRef(null);
    useClickOutside(footerRef, () => setActive(false));

    const onToggleListClick = () => {
        setActive(false);
        window.openBrowser();
    };

    const onToggleButtonClick = () => setActive((prev) => !prev);

    return (
        <>
            <footer className='footer' style={footerStyle}>
                <Floating
                    isAppBarEnabled={isAppBarEnabled}
                    scrollAction={scrollAction}
                    location={location}
                />
                <div className='footer__inner'>
                    <div className='footer__social__wrap'>
                        <div className='footer__social'>
                            <h3 className='footer__social__title'>FOLLOW US</h3>
                            <div className='footer__social__links'>
                                {SocialNetworks.map(({ url, name, img }) => (
                                    <SocialLink
                                        key={url}
                                        url={url}
                                        name={name}
                                        img={img}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='footer__family'>
                            <div
                                className='footer__family__links'
                                ref={footerRef}
                            >
                                <div
                                    className={`footer__family__link ${
                                        active && 'footer__family__link--active'
                                    }`}
                                >
                                    <button
                                        type='button'
                                        className='footer__family__link__trigger'
                                        aria-label='??????????????? ????????? ?????? ??????'
                                        onClick={onToggleButtonClick}
                                    >
                                        Sony Family
                                    </button>
                                    <div className='footer__family__link__inner'>
                                        <h4 className='optgroup__label'>
                                            Sony Family
                                        </h4>
                                        <ul className='optgroup'>
                                            {SONY_FAMILY.map(
                                                ({ url, name }) => (
                                                    <li
                                                        className='option'
                                                        key={`footer-ul-family-${name}`}
                                                    >
                                                        <a
                                                            href={
                                                                window.anchorProtocol +
                                                                url.replace(
                                                                    'https://',
                                                                    '',
                                                                )
                                                            }
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            onClick={
                                                                onToggleListClick
                                                            }
                                                        >
                                                            {name}
                                                        </a>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                        <h4 className='optgroup__label'>
                                            Family Company
                                        </h4>
                                        <ul className='optgroup'>
                                            {SONY_COMPANY.map(
                                                ({ url, name }) => (
                                                    <li
                                                        className='option'
                                                        key={`footer-ul-company-${name}`}
                                                    >
                                                        <a
                                                            href={
                                                                window.anchorProtocol +
                                                                url.replace(
                                                                    'https://',
                                                                    '',
                                                                )
                                                            }
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            onClick={
                                                                onToggleListClick
                                                            }
                                                        >
                                                            {name}
                                                        </a>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <a
                                href={window.anchorProtocol + 'www.sony.com/'}
                                onClick={window.openBrowser}
                                className='footer__family__global'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Sony Global
                            </a>
                        </div>
                    </div>
                    <div className='footer__legal'>
                        <div className='footer__legal__links'>
                            <Link
                                to='/footer/terms'
                                className='footer__legal__link'
                            >
                                ????????????
                            </Link>
                            <a
                                href={
                                    window.anchorProtocol +
                                    'www.sony.co.kr/handler/ProductInfo-Start?PageName=jsp/footer/CF_policy.jsp'
                                }
                                onClick={window.openBrowser}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='footer__legal__link privacy'
                            >
                                ????????????????????????
                            </a>
                            <a
                                href='/'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPop(true);
                                }}
                                className='footer__legal__link'
                            >
                                ????????? ?????? ????????????
                            </a>
                            <Link
                                to='/footer/sitemap'
                                className='footer__legal__link'
                            >
                                ????????????
                            </Link>
                        </div>
                        <div className='footer__legal__warning'>
                            <p>
                                ??? ???????????? ???????????? ??????????????? ????????? ?????? ???,
                                ????????? ????????? ????????????, ??????, ?????? ??????
                                ????????????.
                            </p>
                            <p>
                                ???????????? ????????? ????????? ?????? ?????? ?????? ?????????
                                ?????? ????????? ?????? ??????,
                                <br /> KG??????????????? ??????
                                ???????????????(??????????????????)??? ???????????? ??? ????????????.
                                <a
                                    className='escrow'
                                href={
                                    window.anchorProtocol +
                                        'mark.inicis.com/mark/escrow_popup_v3.php?mid=SonyKoreat'
                                }
                                   onClick={window.openBrowser}
                                    style={{
                                        backgroundImage:
                                            'url(https://image.inicis.com/mkt/certmark/escrow/escrow_43x43_gray.png)',
                                    }}
                                   target='_blank'
                                rel='noopener noreferrer'
                                >
                                    ??????????????? ???????????? ?????????????????? ????????????
                                    ???????????? ??? ????????????.
                                </a>
                            </p>
                        </div>
                    </div>
                    <address className='address'>
                        <span>
                            ??????????????? : ??????????????? ???????????? ??????????????? 10
                            ?????????????????? 24F
                        </span>
                        <span>
                            ????????? ???????????? : 106-81-23810 ??????????????????
                            2012-???????????????-1038 ??????????????????
                        </span>
                        <span>???????????? : Okura Kikuo</span>
                        <span>??????????????????????????? : Okura Kikuo</span>
                        {isMobile ? (
                            <span>
                                <a href='tel:1588-0911'>
                                    TEL : ??????????????? ???????????? 1588-0911
                                </a>
                            </span>
                        ) : (
                            <span>TEL : ??????????????? ???????????? 1588-0911</span>
                        )}
                        <span>
                            E-MAIL :{' '}
                            <a href='mailto:cshelp@sony.co.kr'>
                                cshelp@sony.co.kr
                            </a>
                        </span>
                        <span>
                            Copyright ?? Sony Korea Corporation. All rights
                            reserved.
                        </span>
                    </address>
                </div>
            </footer>

            {isPop === true && <InsurePop setPop={setPop} />}
        </>
    );
};

Footer.propTypes = {
    location: PropTypes.object.isRequired,
    isAppBarEnabled: PropTypes.bool.isRequired,
    scrollAction: PropTypes.string.isRequired,
};

export default memo(Footer);
