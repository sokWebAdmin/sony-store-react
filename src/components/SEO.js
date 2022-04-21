import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

// import useScript from 'hooks/useScript';

const SEO = ({ data }) => {
    // TODO: 추후 별도 파일로 분리
    const config = { title: 'SonyStore', description: '' };

    // useScript('//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js');

    return (
        <HelmetProvider>
            <Helmet>
                {/* 타이틀  */}
                <title>{data.title || config.title}</title>

                {/* Canonical tag */}
                {data.canonical && (
                    <link rel='canonical' href={data.canonical} />
                )}

                {/* 메타데이터 */}
                {data.meta?.title && (
                    <meta
                        name='title'
                        content={data.meta.title || config.title}
                    />
                )}
                {data.meta?.description && (
                    <meta
                        name='description'
                        content={data.meta.description || config.description}
                    />
                )}

                {/* 오픈그래프 */}
                <meta property='og:type' content='website' />
                {data.og?.title && (
                    <meta property='og:title' content={data.og.title} />
                )}
                {data.og?.description && (
                    <meta
                        property='og:description'
                        content={data.og.description}
                    />
                )}
                {data.og?.image && (
                    <meta property='og:image' content={data.og.image} />
                )}

                {/* 트위터 */}
                {data.twitter?.card && (
                    <meta property='twitter:card' content={data.twitter.card} />
                )}
                {data.twitter?.title && (
                    <meta
                        property='twitter:title'
                        content={data.twitter.title}
                    />
                )}
                {data.twitter?.description && (
                    <meta
                        property='twitter:description'
                        content={data.twitter.description}
                    />
                )}
                {data.twitter?.image && (
                    <meta
                        property='twitter:image'
                        content={data.twitter.image}
                    />
                )}

                {/* itemprop */}
                {data.itemprop?.name && (
                    <meta itemprop='name' content={data.itemprop.name || ''} />
                )}
                {data.itemprop?.description && (
                    <meta
                        itemprop='description'
                        content={data.itemprop.description || ''}
                    />
                )}
                {data.itemprop?.image && (
                    <meta
                        itemprop='image'
                        content={data.itemprop.image || ''}
                    />
                )}
            </Helmet>
        </HelmetProvider>
    );
};

SEO.proTypes = {
    data: {
        title: PropTypes.string,
        canonical: PropTypes.string,
        meta: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
        }),
        og: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
        }),
        twitter: PropTypes.shape({
            card: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
        }),
        itemprop: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
        }),
    },
};

export default SEO;
