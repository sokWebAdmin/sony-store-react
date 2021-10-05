import React from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

// stylesheet
import '../../assets/scss/app.scss';

const PushList = () => {
  return (
    <>
      <SEOHelmet title={`PUSH 알림 메세지함`} />
      <div className="wrapper">
        <div className="container" id="container">
          <div className="app_head">
            <a href="#" className="back_btn">뒤로 가기</a>
            <h1 className="app_head_tit">PUSH 알림 메시지함</h1>
          </div>
          <div className="app_guide">
            <ul className="list_dot">
              <li>최근 14일간의 메시지 입니다.</li>
              <li>과거 내용이므로 현재와 상이할 수 있습니다.</li>
              <li>운영정책에 따라 예고 없이 삭제 될 수 있습니다.</li>
            </ul>
          </div>
          <div className="app_push_inner">
            <p className="ico_box_tit">
              <i className="ico_none_list"></i>
              <strong className="ico_tit">조회 내역이 존재하지 않습니다.</strong>
            </p>
          </div>
          <div className="app_push_inner">
            <ul className="app_push_list">
              <li className="lists">
                <span className="category">공지</span>
                <strong className="tit">추석 연휴 소니스토어 압구정 휴무 안내</strong>
                <span className="duration">21.04.08 ~ 21.05.31</span>
              </li>
              <li className="lists">
                <span className="category">이벤트</span>
                <strong className="tit">8월 14일은 뮤직데이 뮤직데이기념 SALE 위크</strong>
                <span className="duration">21.04.08 ~ 21.05.31</span>
              </li>
              <li className="lists">
                <span className="category">이벤트</span>
                <strong className="tit">메가스터디와 함께하는 주간완전학습 플래너 증정 이벤트</strong>
                <span className="duration">21.04.08 ~ 21.05.31</span>
              </li>
            </ul>
            <div className="btn_article comm_more line">
              <a href="#" className="more_btn" title="기획전 더보기">더보기</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PushList;