import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventByEventNo } from '../../api/display';
import { useMediaQuery } from '../../hooks';
import SEOHelmet from '../../components/SEOHelmet';
import EventProducts from '../../components/event/EventProducts';

const EventDetail = () => {
  const { eventNo } = useParams();
  const onlyMo = useMediaQuery('(max-width: 640px)');
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
      <SEOHelmet title={event?.label} />
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
};

export default EventDetail;
