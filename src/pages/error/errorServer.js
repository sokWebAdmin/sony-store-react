// import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import "../../assets/scss/contents.scss"

//img
import errorLogo from '../../assets/images/common/ic_server.svg';

export default function ErrorServer() {

    return (
        <>
        <SEOHelmet title={"서버 점검중입니다"} />

        <div className="error">
            <div className="error__container">
            <div className="error_content">
                <i className="icon"><img src={errorLogo} alt="" /></i>
                <h2 className="title">현재 서버 점검중입니다.</h2>
                <p className="eng">The requested page is under maintenance.</p>
                <p className="desc">보다 나은 서비스를 제공해 드리기 위하여 서비스 점검을 실시합니다.<br />
                고객 여러분의 많은 양해 부탁드립니다.</p>
            </div>
           </div>
           </div>
        </>
    );
}
