import SEO from 'components/SEO';
import EventTop from 'components/event/Top';
import EventBottom from 'components/event/Bottom';

import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import 'assets/scss/event.scss';
import 'assets/scss/contents.scss';

export default function EventList() {
    return (
        <>
            <SEO data={{ title: '기획전' }} />
            <div className='contents events'>
                <div className='container full'>
                    <div className='content'>
                        <EventTop />
                        <EventBottom />
                    </div>
                </div>
            </div>
        </>
    );
}
