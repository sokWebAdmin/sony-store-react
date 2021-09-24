import { useHistory } from 'react-router-dom';

const BToBBanners = () => {
  const history = useHistory();

  return (
    <div className="cont_inner">
      <div className="b2b_banner">
        <a onClick={() => {history.push('/event/refurbish');}}
           className="b2b_link refurbish">
          <div className="txt_box">
            <p className="tit">리퍼비시몰</p>
            <p className="txt">소니 제품을 리퍼비시몰에서 더 저렴하게 만나보세요!</p>
          </div>
        </a>
        <a onClick={() => {history.push('/event/employee');}}
           className="b2b_link executives">
          <div className="txt_box">
            <p className="tit">임직원몰</p>
            <p className="txt">맞춤형 임직원몰에서 특별한 혜택 누리세요!</p>
          </div>
        </a>
        <a onClick={() => {history.push('/event/refined');}}
           className="b2b_link refined_article">
          <div className="txt_box">
            <p className="tit">정품등록 특가몰</p>
            <p className="txt">정품등록을 완료하신 고객님께 특별한 혜택을 드립니다!</p>
          </div>
        </a>
        <a onClick={() => {history.push('/event/asc');}}
           className="b2b_link asc">
          <div className="txt_box">
            <p className="tit">ASC몰</p>
            <p className="txt">ASC 임직원을 위해 준비한 다양한 제품을 특별한 가격으로 만나보세요!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default BToBBanners;