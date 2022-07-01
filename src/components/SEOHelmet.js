import { Helmet } from 'react-helmet';

const SEOHelmet = ({ title, children }) => {
    return (
        <Helmet>
            <title>{title}</title>
            {children}
            {title && (
                <script
                    defer
                    src='//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js'
                ></script>
            )}
        </Helmet>
    );
};

export default SEOHelmet;
