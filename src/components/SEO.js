import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, meta, og, twitter, itemprop }) => {
    // TODO: 추후 별도 파일로 분리
    const config = { title: '소니스토어', description: '' };

    return (
        <HelmetProvider>
            <Helmet>
                {/* 타이틀  */}
                <title>{title || config.title}</title>

                {/* 메타데이터 */}
                {meta && (
                    <>
                        <meta
                            name='title'
                            content={meta.title || config.title}
                        />
                        <meta
                            name='description'
                            content={meta.description || config.description}
                        />
                    </>
                )}

                {/* 오픈그래프 */}
                {og && (
                    <>
                        <meta property='og.title' content={og.title || ''} />
                        <meta property='og.type' content='website' />
                        <meta
                            property='og.description'
                            content={og.description || ''}
                        />
                        <meta property='og.image' content={og.logo || ''} />
                    </>
                )}

                {/* 트위터 */}
                {twitter && (
                    <>
                        <meta
                            property='twitter:card'
                            content={twitter.card || ''}
                        />
                        <meta
                            property='twitter:title'
                            content={twitter.title || ''}
                        />
                        <meta
                            property='twitter:description'
                            content={twitter.description || ''}
                        />
                        <meta
                            property='twitter:image'
                            content={twitter.image || ''}
                        />
                    </>
                )}

                {/* itemprop */}
                {itemprop && (
                    <>
                        <meta itemprop='name' content={itemprop.name || ''} />
                        <meta
                            itemprop='description'
                            content={itemprop.description || ''}
                        />
                        <meta itemprop='image' content={itemprop.image || ''} />
                    </>
                )}
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
    og: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    twitter: PropTypes.shape({
        card: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    itemprop: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
};

export default SEO;
