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

  const TopContent = ({ url, type }) => {
    return (
      <>
        {type === 'FILE' ? <img src={url} alt="" style={{ width: '100%' }} /> :
          <div dangerouslySetInnerHTML={{ __html: url }} />}
      </>
    );
  };

  return (
    <>
      <SEOHelmet title={event?.label} />
      {event && <div className="contents events">
        <div className="container full">
          <div className="content employee">
            <TopContent url={onlyMo ? event.top.mobile.url : event.top.pc.url}
                        type={onlyMo ? event.top.mobile.type : event.top.pc.type} />
            <EventProducts event={event} gift={true} sectionImage={true} />
          </div>
        </div>
      </div>}
    </>
  );
};

export default EventDetail;
