import { Helmet } from "react-helmet";

const SEOHelmet = ({ title }) => (
    <>
        <Helmet>
            <title>{ title }</title>
        </Helmet>
    </>
)

export default SEOHelmet