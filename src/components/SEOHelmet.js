import { Helmet } from 'react-helmet';

import Omniture from './Omniture';

const SEOHelmet = ({ title, children }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                {children}
            </Helmet>
            {title && <Omniture />}
        </>
    );
};

export default SEOHelmet;
