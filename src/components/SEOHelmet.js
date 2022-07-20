import { Helmet } from 'react-helmet';

const SEOHelmet = ({ title, children }) => {
    return (
        <Helmet>
            <title>{title}</title>
            {children}
            {title && (
                <script
                    defer
                    src='//image.sony.co.kr/omniture/real/sonystore_code_2013.js'
                ></script>
            )}
        </Helmet>
    );
};

export default SEOHelmet;
