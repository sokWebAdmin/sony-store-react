import React from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//css
import '../../assets/scss/event.scss';
import '../../assets/scss/contents.scss';
import EventTop from '../../components/event/Top';
import EventBottom from '../../components/event/Bottom';

export default function EventList() {
  return (
    <>
      <SEOHelmet title='기획전'>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"/>
      </SEOHelmet>
      <div className="contents events">
        <div className="container full">
          <div className="content">
            <EventTop/>
            <EventBottom/>
          </div>
        </div>
      </div>
    </>
  );
}