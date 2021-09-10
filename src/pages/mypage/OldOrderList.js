import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OldOrderListItem from '../../components/order/OldOrderListItem';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getOldOrders } from '../../api/sony/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OldOrderList() {
  //FIXME: 개발후 삭제
  const mockData = [
    {
      orderid: '20210727-2V3743',
      createdate: '2021-07-27 17:06:13',
      customernr: '2780336',
      totalprice: 1800,
      status: '01',
      seqno: 'HDR-AZ1/W',
    },
    {
      orderid: '20210720-203G03',
      createdate: '2021-07-20 12:02:46',
      customernr: '2780336',
      totalprice: 1500,
      status: '07',
      seqno: 'A5000L/B',
    },
  ];

  // const [oldOrderProducts, setOldOrderProducts] = useState([...mockData]);
  const [oldOrderProducts, setOldOrderProducts] = useState([]);

  useEffect(() => {
    getOldOrders().then((res) => {
      console.log('response:', res);
      setOldOrderProducts(res.data.body);
    });
  }, []);

  //TODO: 스타일 전부 하나씩 scss 파일로 변환 해야하나?>
  // scss import 구문 주석 처리해도 괜찮던데,
  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      <div className="contents mypage">
        <div class="container">
          <div class="content">
            <div class="common_head">
              <Link to="/my-page/order-list" class="common_head_back">
                주문/배송내역
              </Link>
              <h1 class="common_head_name">이전 주문/배송내역</h1>
            </div>

            <div class="cont recent_order prev_order">
              <div class="tit_head mileage_inquiry">
                <h3 class="cont_tit">2021년 9월 이전 주문 내역</h3>
                <div class="date_box">
                  <ul class="date3_tab">
                    <li class="tabs on">
                      <a href="#" class="date3_btn">
                        3개월
                      </a>
                    </li>
                    <li class="tabs">
                      <a href="#" class="date3_btn">
                        6개월
                      </a>
                    </li>
                    <li class="tabs">
                      <a href="#" class="date3_btn">
                        1년
                      </a>
                    </li>
                  </ul>
                  <div class="date_rang">
                    <div class="calendar_box">
                      <input type="text" id="datepicker1" class="inp datepicker" autocomplete="off" />
                    </div>
                    <div class="calendar_box">
                      <input type="text" id="datepicker2" class="inp datepicker" autocomplete="off" />
                    </div>
                    <button class="button button_positive button-s" type="button">
                      조회
                    </button>
                  </div>
                </div>
              </div>

              <div class="col_table_wrap order_list">
                <div class="col_table">
                  <div class="col_table_head">
                    <div class="col_table_row">
                      <div class="col_table_cell">주문날짜/번호</div>
                      <div class="col_table_cell">제품</div>
                      <div class="col_table_cell">처리상태</div>
                    </div>
                  </div>
                  {oldOrderProducts.length > 0 && (
                    <div class="col_table_body">
                      {oldOrderProducts.map((oldOrderProduct) => (
                        <OldOrderListItem
                          orderid={oldOrderProduct.orderid}
                          createdate={oldOrderProduct.createdate}
                          status={oldOrderProduct.status}
                          seqno={oldOrderProduct.seqno}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {oldOrderProducts.length > 0 && (
                  <div class="btn_article">
                    <a href="#" class="more_btn">
                      더보기
                    </a>
                  </div>
                )}

                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다.  */}
                {oldOrderProducts.length === 0 && <div class="no-data">내역이 없습니다</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
