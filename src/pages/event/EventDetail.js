import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SEO from 'components/SEO';
import EventProducts from 'components/event/EventProducts';
import { getEventByEventNo } from 'api/display';
import { useMediaQuery } from 'hooks';

const EventDetail = () => {
    const { eventNo } = useParams();
    const onlyMo = useMediaQuery('(max-width: 640px)');
    const [event, setEvent] = useState(null);
    const [seo, setSeo] = useState();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getEventByEventNo(eventNo, {
                    soldout: true,
                });

                setEvent(data);
                setSeo((prev) => ({
                    ...prev,
                    meta: {
                        title: data.label,
                        description: data.promotionText,
                    },
                    og: {
                        title: data.label,
                        description: data.promotionText,
                        image: data.pcImageUrl,
                    },
                    twitter: {
                        card: 'summary',
                        title: data.label,
                        description: data.promotionText,
                        image: data.pcImageUrl,
                    },
                    itemprop: {
                        name: data.label,
                        description: data.promotionText,
                        image: data.pcImageUrl,
                    },
                }));
            } catch (error) {
                history.push('/404');
            }
        })();
    }, [eventNo, history]);

    const TopContent = ({ url, type }) => {
        return (
            <>
                {type === 'FILE' ? (
                    <img src={url} alt='' style={{ width: '100%' }} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: url }} />
                )}
            </>
        );
    };

    return (
        <>
            {seo && <SEO data={seo} />}
            {event && (
                <div className='contents events'>
                    <div className='container full'>
                        <div className='content employee'>
                            <TopContent
                                url={
                                    onlyMo
                                        ? event.top.mobile.url
                                        : event.top.pc.url
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
            )}
        </>
    );
};

export default EventDetail;
