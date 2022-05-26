import { Helmet } from 'react-helmet';

import useScript from 'hooks/useScript';

const SEOHelmet = ({ title, children }) => {
    useScript('//image.sony.co.kr/omniture/real/sonystore_code_2013.js');

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
