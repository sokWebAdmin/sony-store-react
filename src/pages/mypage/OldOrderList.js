import React, { useEffect } from 'react';
import { getOldOrders } from '../../api/sony/order';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OldOrderList() {
  useEffect(() => {
    getOldOrders().then((res) => console.log('뭐:', res));
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
              <a
                href="/dist/html/mypage/orderList.html"
                class="common_head_back"
              >
                주문/배송내역
              </a>
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
                      <input
                        type="text"
                        id="datepicker1"
                        class="inp datepicker"
                        autocomplete="off"
                      />
                    </div>
                    <div class="calendar_box">
                      <input
                        type="text"
                        id="datepicker2"
                        class="inp datepicker"
                        autocomplete="off"
                      />
                    </div>
                    <button
                      class="button button_positive button-s"
                      type="button"
                    >
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
                  <div class="col_table_body">
                    <div class="col_table_row">
                      <div class="col_table_cell order">
                        <span class="order_date">21.05.12</span>
                        <a href="#" class="order_number">
                          20210512-663W24
                        </a>
                      </div>
                      <div class="col_table_cell prd_wrap">
                        <div class="prd">
                          <div class="prd_info">
                            <div class="prd_info_name">
                              AK-47 Hi-Res 헤드폰 앰프
                            </div>
                            <p class="prd_info_option">128Bit/피아노블랙</p>
                          </div>
                        </div>
                      </div>
                      <div class="col_table_cell order">
                        <span class="order_status">결제완료</span>
                      </div>
                    </div>
                    <div class="col_table_row">
                      <div class="col_table_cell order">
                        <span class="order_date">21.05.12</span>
                        <a href="#" class="order_number">
                          20210512-663W24
                        </a>
                      </div>
                      <div class="col_table_cell prd_wrap">
                        <div class="prd">
                          <div class="prd_info">
                            <div class="prd_info_name">
                              PLAYSTATION 5 DIGITAL (CFI-1018B01)
                            </div>
                            <p class="prd_info_option">
                              4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                              1인치 핸디캠/ LIMITED EDITION(사일런트 화이트)
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col_table_cell order">
                        <span class="order_status">배송완료</span>
                      </div>
                    </div>
                    <div class="col_table_row">
                      <div class="col_table_cell order">
                        <span class="order_date">21.05.12</span>
                        <a href="#" class="order_number">
                          20210512-663W24
                        </a>
                      </div>
                      <div class="col_table_cell prd_wrap">
                        <div class="prd">
                          <div class="prd_info">
                            <div class="prd_info_name">
                              AK-47 Hi-Res 헤드폰 앰프
                            </div>
                            <p class="prd_info_option">128Bit/피아노블랙</p>
                          </div>
                        </div>
                      </div>
                      <div class="col_table_cell order">
                        <span class="order_status">주문취소</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btn_article">
                  <a href="#" class="more_btn">
                    더보기
                  </a>
                </div>

                {/* 내역 없는 경우 .col_table_body, .btn_article 노출 안되어야 합니다.  */}
                {/* <div class="no-data">
            내역이 없습니다
          </div>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
