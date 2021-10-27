import React, { useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import { getDisplayEvents, getEventByEventNo } from '../../api/display';
import EventProducts from '../../components/event/EventProducts';
import { useMediaQuery } from '../../hooks';
import { useParams } from 'react-router-dom';

export default function Refined() {
  const onlyMo = useMediaQuery('(max-width: 640px)');
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
      <SEOHelmet title={'정품등록 특가몰'} />
      {event && <div className="contents events">
        <div className="container full">
          <div className="content employee">
            <div className="event_header">
              <div className="event_header_inner"
                   style={{ background: `url('${onlyMo ? event.top.mobile.url : event.top.pc.url}') no-repeat 0 0` }}>
                <h1 className="event_header_title">{event.label}</h1>
                <p className="event_header_desc">{event.promotionText}</p>
              </div>
            </div>
            <div className="event_tablist type1">
              <div className="employee_prd">
                <EventProducts event={event}/>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
