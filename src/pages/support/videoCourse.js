import ReactPlayer from 'react-player';

import SEO from 'components/SEO';
import { videoCourse as videoCourseSEO } from 'const/seo';
import 'assets/scss/contents.scss';
import 'assets/scss/support.scss';

export default function videoCourse() {
    return (
        <>
            <SEO data={videoCourseSEO} />

            <div className='contents support'>
                <div className='container full'>
                    <div className='course_video'>
                        <div className='common_head first_tit'>
                            <h1 className='common_head_name'>동영상 강좌</h1>
                            <p className='common_head_txt'>
                                제품의 기본 기능부터 숨겨진 기능까지 한번에 알
                                수 있는
                                <br /> 동영상 강좌를 통해 소니 제품을 100%
                                활용해 보세요!
                            </p>
                        </div>
                        <div className='course_video_zone'>
                            <div className='course_video_main'>
                                <div className='video_wrap'>
                                    <ReactPlayer
                                        className='react-player'
                                        url='https://www.youtube.com/embed/MQHGdefGaiI'
                                        width='100%' // 플레이어 크기 (가로)
                                        height='100%' // 플레이어 크기 (세로)
                                        playing={false} // 자동 재생 off
                                        muted={false} // 음소거 off
                                        controls={true} // 플레이어 컨트롤 노출 여부
                                        light={false} // 플레이어 모드
                                        pip={true} // pip 모드 설정 여부
                                    />
                                </div>
                                <p className='course_video_tit'>
                                    [강의] SRS-XB13 블루투스 연결방법(iOS)
                                </p>
                            </div>
                            <div className='course_video_list'>
                                <ul>
                                    <li className='lists'>
                                        <div className='video_thumb'>
                                            <a
                                                href={
                                                    window.anchorProtocol +
                                                    'www.youtube.com/embed/g1Vtfa1dMow'
                                                }
                                                onClick={window.openBrowser}
                                                className='video_thumb_btn'
                                                data-video-url='https://www.youtube.com/embed/g1Vtfa1dMow'
                                                target='_blank'
                                                title='새창열림'
                                                rel='noreferrer'
                                            >
                                                <img
                                                    src='/images/_tmp/course_video_thumb_list_01.png'
                                                    alt=''
                                                />
                                            </a>
                                            <div className='video_thumb_info'>
                                                <span className='pos_center'>
                                                    <p className='tit'>
                                                        [강의]ILCE_7SM3 (A7S3)
                                                        드라이브 모드 활용하기
                                                    </p>
                                                    <p className='txt'>
                                                        (브래킷모드
                                                        연속,단일,WB,DRO)
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='lists'>
                                        <div className='video_thumb'>
                                            <a
                                                href={
                                                    window.anchorProtocol +
                                                    'www.youtube.com/embed/LwyAfL_FTpQ'
                                                }
                                                onClick={window.openBrowser}
                                                className='video_thumb_btn'
                                                data-video-url='https://www.youtube.com/embed/LwyAfL_FTpQ'
                                                target='_blank'
                                                title='새창열림'
                                                rel='noreferrer'
                                            >
                                                <img
                                                    src='/images/_tmp/course_video_thumb_list_02.png'
                                                    alt=''
                                                />
                                            </a>
                                            <div className='video_thumb_info'>
                                                <span className='pos_center'>
                                                    <p className='tit'>
                                                        [강의] WF-1000XM4 펌웨어
                                                        업데이트하기
                                                    </p>
                                                    <p className='txt'>
                                                        헤드셋 펌웨어 업데이트
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='lists'>
                                        <div className='video_thumb'>
                                            <a
                                                href={
                                                    window.anchorProtocol +
                                                    'www.youtube.com/embed/Ds_HCaXyWtI'
                                                }
                                                onClick={window.openBrowser}
                                                className='video_thumb_btn'
                                                data-video-url='https://www.youtube.com/embed/Ds_HCaXyWtI'
                                                target='_blank'
                                                title='새창열림'
                                                rel='noreferrer'
                                            >
                                                <img
                                                    src='/images/_tmp/course_video_thumb_list_03.png'
                                                    alt=''
                                                />
                                            </a>
                                            <div className='video_thumb_info'>
                                                <span className='pos_center'>
                                                    <p className='tit'>
                                                        [강의] ILCE_7SM3 (a7s3)
                                                        드라이브 모드 활용하기
                                                    </p>
                                                    <p className='txt'>
                                                        (단일 촬영, 연속 촬영,
                                                        셀프 타이머)
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='course_more_zone'>
                        <p className='tit'>
                            더 많은 동영상 강좌를 지금 만나보세요!
                        </p>
                        <div className='ico_box_link'>
                            <a
                                href={
                                    window.anchorProtocol +
                                    'www.sony.co.kr/scs/handler/Common-PageView?pageName=/jsp/scs/lecture/playlist.jsp'
                                }
                                onClick={window.openBrowser}
                                className='box_link_inner ico_course1'
                                target='_blank'
                                rel='noreferrer'
                                title='새창열림'
                            >
                                <div className='txt_box'>
                                    <p className='tit'>동영상 강좌</p>
                                    <p className='txt'>
                                        더 많은 동영상 강좌로 제품 사용의 팁을
                                        모두 얻어가세요!
                                    </p>
                                </div>
                            </a>
                            <a
                                href={
                                    window.anchorProtocol +
                                    'www.youtube.com/channel/UC_NlkiLtoPVHWuByWvF64Fw'
                                }
                                onClick={window.openBrowser}
                                target='_blank'
                                title='새 창 열림'
                                rel='noreferrer'
                                className='box_link_inner ico_course2'
                            >
                                <div className='txt_box'>
                                    <p className='tit'>
                                        소니코리아 공식 유튜브
                                    </p>
                                    <p className='txt'>
                                        소니코리아 공식 유튜브에서 더 많은
                                        영상을 확인하세요!
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
