import { Link } from 'react-router-dom';
export default function OrderListLinkBox() {
  return (
    <div className="ico_box_link">
      <a href="https://www.sony.co.kr/electronics/support" className="box_link_inner ico_type3" target="_blank">
        <div className="txt_box">
          <p className="tit">고객지원 센터</p>
          <p className="txt">제품 서비스 및 보증기간을 확인하세요!</p>
        </div>
      </a>
      <Link to="/my-page/old-order-list" className="box_link_inner ico_type4">
        <div className="txt_box">
          <p className="tit">2021년 9월 이전 주문 내역</p>
          <p className="txt">이전 소니스토어에서 구매하신 내역을 확인하세요!</p>
        </div>
      </Link>
    </div>
  );
}
