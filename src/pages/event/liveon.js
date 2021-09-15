import React, { useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import '../../assets/scss/liveon.scss';
import { getDisplayEvents, getEventByEventNo } from '../../api/display';
import EventProducts from '../../components/event/EventProducts';
import { Link } from 'react-router-dom';

export default function Liveon() {
  const [event, setEvent] = useState(null);

  const fetchDetailEvent = async () => {
    const { data } = await getDisplayEvents();
    const eventNo = data.find((event) => `/${event.url}` === window.location.pathname).eventNo;
    const response = await getEventByEventNo(eventNo, { soldout: true });
    setEvent(response.data);
  };

  useEffect(() => {
    fetchDetailEvent();
  }, []);

  return (
    <>
      <SEOHelmet title={'LIVE ON'} />
      {event && <div className="contents events liveon">
        <div className="container full">{/* full : max-width 1920 */}
          <div className="content liveon">
            <div className="event_video">
              <div className="event_video_bgbox">
                <div className="event_video_inner">
                  <span className="event_video_badge">{event.label}</span>
                  <h1 className="event_video_title">SRS-XP500 <span className="block">런칭 라이브온</span></h1>
                  <p className="event_video_desc">한 층 더 업그레이드 된 사운드와 조명으로 공간을 밝히는 스피커<br />지금 라이브온에서 만나보세요!</p>
                  <div className="event_video_playbox">
                    <div className="video_container">
                      <iframe src="https://www.youtube.com/embed/c0llCoHilCU" frameBorder={0} width="100%"
                              height="100%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="event_video_inner prd_inner">
                <div className="event_prd">
                  <h2 className="event_prd_title">LIVE ON 제품</h2>
                  <EventProducts event={event} />
                  <div className="button_wrap">
                    <Link to="/event/list" className="button button_positive">목록</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}