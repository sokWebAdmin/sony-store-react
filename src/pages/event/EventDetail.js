import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SEO from 'components/SEO';
import EventProducts from 'components/event/EventProducts';
import EventTopContent from 'components/event/EventTopContent';
import { getEventByEventNo } from 'api/display';
import { useMediaQuery } from 'hooks';

const EventDetail = () => {
    const { eventNo } = useParams();
    const onlyMo = useMediaQuery('(max-width: 640px)');
    const [event, setEvent] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await getEventByEventNo(eventNo, {
                soldout: true,
            });
            setEvent(data);
        })();
    }, [eventNo]);

    if (!event) {
        return null;
    }

    return (
        <>
            <SEO data={{ title: event?.label }} />
            <div className='contents events'>
                <div className='container full'>
                    <div className='content employee'>
                        <EventTopContent
                            url={
                                onlyMo ? event.top.mobile.url : event.top.pc.url
                            }
                            type={
                                onlyMo
                                    ? event.top.mobile.type
                                    : event.top.pc.type
                            }
                        />
                        <EventProducts
                            event={event}
                            gift={true}
                            sectionImage={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetail;
