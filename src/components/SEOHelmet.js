import { Helmet } from 'react-helmet';

import useScript from 'hooks/useScript';

const SEOHelmet = ({ title, children }) => {
    

    return (
        <>
            <Helmet>
                <title>{title}</title>
                {children}
            </Helmet>
        </>
    );
};

export default SEOHelmet;
