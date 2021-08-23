import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/support.css"

export default function videoCourse() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container full">
  <div className="content">
    <div className="course_video">
      <div className="common_head first_tit">
        <h1 className="common_head_name">동영상 강좌</h1>
        <p className="common_head_txt">제품의 기본 기능부터 숨겨진 기능까지 한번에 알 수 있는<br /> 동영상 강좌를 통해 소니 제품을 100% 활용해 보세요!</p>
      </div>
      <div className="course_video_zone">
        <div className="course_video_main">
          <div className="video_wrap">
            {/* <a href="#" class="video_cover"><img src="/images/_tmp/course_video_thumb_01.png" alt=""></a> */}
            <iframe src="https://www.youtube.com/embed/V_VgQhpS5MA" frameBorder={0} width="100%" height="100%" />
          </div>
          <p className="course_video_tit">WF-1000XM4 블루투스 연결법 (안드로이드)</p>
        </div>
        <div className="course_video_list">
          <ul>
            <li className="lists">
              <div className="video_thumb">
                <a href="https://www.youtube.com/embed/V_VgQhpS5MA" className="video_thumb_btn" data-video-url="https://www.youtube.com/embed/V_VgQhpS5MA" target="_blank" title="새창열림">
                  <img src="/images/_tmp/course_video_thumb_list_02.png" alt="" />
                </a>
                <div className="video_thumb_info">
                  <span className="pos_center">
                    <p className="tit">WF-1000XM4 블루투스 연결법 (안드로이드)</p>
                    <p className="txt">안드로이드 핸드폰 블루투스 연결하기</p>
                  </span>
                </div>
              </div>
            </li>
            <li className="lists">
              <div className="video_thumb">
                <a href="https://www.youtube.com/embed/64y3hTkGV5A" className="video_thumb_btn" data-video-url="https://www.youtube.com/embed/64y3hTkGV5A" target="_blank" title="새창열림">
                  <img src="/images/_tmp/course_video_thumb_list_01.png" alt="" />
                </a>
                <div className="video_thumb_info">
                  <span className="pos_center">
                    <p className="tit">[강의] ILCE-7SM3 (a7S3) 스마트리모콘 이용하기</p>
                    <p className="txt">QR코드 연결 방법</p>
                  </span>
                </div>
              </div>
            </li>
            <li className="lists">
              <div className="video_thumb">
                <a href="https://www.youtube.com/embed/GCHITgvg-8w" className="video_thumb_btn" data-video-url="https://www.youtube.com/embed/GCHITgvg-8w" target="_blank" title="새창열림">
                  <img src="/images/_tmp/course_video_thumb_list_03.png" alt="" />
                </a>
                <div className="video_thumb_info">
                  <span className="pos_center">
                    <p className="tit">[강의] SRS-RA5000 Sony Music Center 앱 활용하기</p>
                    <p className="txt">터치 패드로 터치 초점 이용하기</p>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="course_more_zone">
      <p className="tit">더 많은 동영상 강좌를 지금 만나보세요!</p>
      <div className="ico_box_link">
        <a href="https://www.sony.co.kr/scs/handler/Common-PageView?pageName=/jsp/scs/lecture/playlist.jsp" className="box_link_inner ico_course1">
          <div className="txt_box">
            <p className="tit">동영상 강좌</p>
            <p className="txt">더 많은 동영상 강좌로 제품 사용의 팁을 모두 얻어가세요!</p>
          </div>
        </a>
        <a href="https://www.youtube.com/channel/UC_NlkiLtoPVHWuByWvF64Fw" target="_blank" title="새 창 열림" className="box_link_inner ico_course2">
          <div className="txt_box">
            <p className="tit">소니코리아 공식 유튜브</p>
            <p className="txt">소니코리아 공식 유튜브에서 더 많은 영상을 확인하세요!</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

        </>
    );
}