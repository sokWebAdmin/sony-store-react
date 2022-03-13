import { Helmet } from 'react-helmet';

// TODO: 삭제예정
const SEOHelmet = ({ title, children }) => (
    <>
        <Helmet>
            <title>{title}</title>
            {children}
        </Helmet>
    </>
);

export default SEOHelmet;
