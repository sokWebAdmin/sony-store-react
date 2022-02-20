import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, canonical, meta, og, twitter, itemprop }) => {
    // TODO: 추후 별도 파일로 분리
    const config = { title: 'SonyStore', description: '' };

    return (
        <HelmetProvider>
            <Helmet>
                {/* 타이틀  */}
                <title>{title || config.title}</title>

                {/* Canonical tag */}
                {canonical && <link rel='canonical' href={canonical} />}

                {/* 메타데이터 */}
                {meta.title && (
                    <meta name='title' content={meta.title || config.title} />
                )}
                {meta.description && (
                    <meta
                        name='description'
                        content={meta.description || config.description}
                    />
                )}

                {/* 오픈그래프 */}
                <meta property='og:type' content='website' />
                {og.title && <meta property='og:title' content={og.title} />}
                {og.description && (
                    <meta property='og:description' content={og.description} />
                )}
                {og.image && <meta property='og:image' content={og.image} />}

                {/* 트위터 */}
                {twitter.card && (
                    <meta property='twitter:card' content={twitter.card} />
                )}
                {twitter.title && (
                    <meta property='twitter:title' content={twitter.title} />
                )}
                {twitter.description && (
                    <meta
                        property='twitter:description'
                        content={twitter.description}
                    />
                )}
                {twitter.image && (
                    <meta property='twitter:image' content={twitter.image} />
                )}

                {/* itemprop */}
                {itemprop.name && (
                    <meta itemprop='name' content={itemprop.name || ''} />
                )}
                {itemprop.description && (
                    <meta
                        itemprop='description'
                        content={itemprop.description || ''}
                    />
                )}
                {itemprop.image && (
                    <meta itemprop='image' content={itemprop.image || ''} />
                )}
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string.isRequired,
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
};

export default SEO;
