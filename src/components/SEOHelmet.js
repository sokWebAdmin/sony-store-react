import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ title }) => (
    <Helmet>
        <title>{title}</title>
    </Helmet>
);

export default SEOHelmet;
