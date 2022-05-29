import PropTypes from 'prop-types';
import Omniture from 'components/Omniture';
import SonyHelmet from 'components/SonyHelmet';

const SEO = ({ data }) => {
    // TODO: 추후 별도 파일로 분리
    const config = { title: 'SonyStore', description: '' };

    return (
        <>
            <SonyHelmet data={data} />
            {data?.title && <Omniture />}
        </>
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
