import { Helmet } from 'react-helmet';

const SEOHelmet = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      {children}
    </Helmet>
  </>
);

export default SEOHelmet;