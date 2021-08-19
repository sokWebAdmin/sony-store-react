import { Helmet } from "react-helmet";

const SEOHelmet = (props) => {
    return (
    <Helmet>
        <title>{props.title}</title>
    </Helmet>
    )
}
export default SEOHelmet