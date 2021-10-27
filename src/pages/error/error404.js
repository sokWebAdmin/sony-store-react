 import { React } from 'react';

 //SEO
 import SEOHelmet from '../../components/SEOHelmet';
 
 //api

 //css
 import "../../assets/scss/contents.scss"
 
 //img
 import errorLogo from '../../assets/images/common/error_logo.svg';
 import ic404 from '../../assets/images/common/ic_404.svg';

 //utils
import { useHistory } from "react-router-dom";

 export default function Error404() {
    const history = useHistory();

     return (
         <>
         <SEOHelmet title={"페이지를 찾을 수 없습니다"} />

         <div className="error">
            <div className="error__container">
                <div className="error_content">
                <i className="icon"><img src={ic404} alt="404 Error" /></i>
                <h2 className="title">요청하신 페이지를 <span>표시할 수 없습니다.</span></h2>
                <p className="eng">The page that you are looking for is unavailable.</p>
                <p className="desc">오래된 URL이거나 폐지된 페이지일 수 있으니,<br />
                    메인(홈)으로 이동하셔서 원하시는 정보를 찾아주십시오. 감사합니다.</p>
                <div className="btn_box">
                    <a  onClick={()=>{history.push('/')}} className="btn btn_dark">홈으로</a>
                </div>
                </div>
            </div>
            </div>
         </>
     );
 }