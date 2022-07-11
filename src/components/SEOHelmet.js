import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useScript from 'hooks/useScript';

const SEOHelmet = ({ title, children }) => {
    const location = useLocation();

    useScript(
        `//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js?path=${location.pathname}`,
    );
    return (
        <Helmet>
            <title>{title}</title>
            {children}
        </Helmet>
    );
};

export default SEOHelmet;
