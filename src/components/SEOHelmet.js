import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEOHelmet = ({ title }) => (
    <>
        <HelmetProvider>
            <Helmet>
                <title>{ title }</title>
            </Helmet>
        </HelmetProvider>
    </>
)

export default SEOHelmet