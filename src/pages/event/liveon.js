import React, { useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import '../../assets/scss/liveon.scss';
import { getEventByEventNo } from '../../api/display';
import EventProducts from '../../components/event/EventProducts';
import { Link, useParams } from 'react-router-dom';

export default function Liveon() {
  const { eventNo } = useParams();
  const [event, setEvent] = useState(null);

  const fetchDetailEvent = async () => {
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
                  <span className="event_video_badge">LIVE ON</span>
                  <h1 className="event_video_title">{event.label}</h1>
                  <p className="event_video_desc">{event.promotionText}</p>
                  <div className="event_video_playbox">
                    <div className="video_container">
                      <iframe src={event.top.pc.url.replace(/<[^>]*>?/gm, '')} frameBorder={0} width="100%"
                              height="100%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="event_video_inner prd_inner">
                <div className="event_prd">
                  <h2 className="event_prd_title">LIVE ON 제품</h2>
                  <EventProducts event={event} gift={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}