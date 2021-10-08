import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

// stylesheet
import '../../assets/scss/app.scss';
import { getPushs } from '../../api/sony/member';
import ViewMore from '../../components/common/ViewMore';

const PushList = () => {
  const history = useHistory();
  const [pushData, setPushData] = useState({items: [], totalCount: 0});

  const fetchPushList = async (pageIdx = 1) => {
    const { data } = await getPushs({fromDate: '100', rowsPerPage: 10, pageIdx});
    console.log(data);
    setPushData({items: data.body, totalCount: data.paginationInfo.totalCount});
  }

  useEffect(() => {
    fetchPushList();
  }, [])

  return (
    <>
      <SEOHelmet title={`PUSH 알림 메세지함`} />
      <div className="wrapper">
        <div className="container" id="container">
          <div className="app_head">
            <a href="/" className="back_btn">뒤로 가기</a>
            <h1 className="app_head_tit">PUSH 알림 메시지함</h1>
          </div>
          <div className="app_guide">
            <ul className="list_dot">
              <li>최근 14일간의 메시지 입니다.</li>
              <li>과거 내용이므로 현재와 상이할 수 있습니다.</li>
              <li>운영정책에 따라 예고 없이 삭제 될 수 있습니다.</li>
            </ul>
          </div>
          {pushData.totalCount <= 0 ? <div className="app_push_inner">
            <p className="ico_box_tit">
              <i className="ico_none_list"></i>
              <strong className="ico_tit">조회 내역이 존재하지 않습니다.</strong>
            </p>
          </div>
            :
          <div className="app_push_inner">
            <ul className="app_push_list">
              {pushData.items.map((item) => {
                return (
                  <li className="lists" onClick={() => history.push(item.linkUrl)}>
                    <span className="category"></span>
                    <strong className="tit">{item.title}</strong>
                    <span className="duration">{item.text}</span>
                  </li>
                )
              })}
            </ul>
            <ViewMore totalCount={pushData.totalCount} pageSize={10} viewMore={fetchPushList} />
          </div>}
        </div>
      </div>
    </>
  );
};

export default PushList;