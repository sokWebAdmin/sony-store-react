const MileageInfo = () => {
  return (
    <div className="cont history_mileage">
      <h3 className="cont_tit">마일리지</h3>
      <div className="history_inner">
        <div className="my_mileage">
          <p className="txt">사용 가능
            <span className="mileage_val">153,248</span>
            <span className="extinction">
                        (<strong className="val_txt"><span
              className="val">300</span>M</strong>당월 소멸 예정)
                        </span>
          </p>
        </div>
        <div className="mileage_inquiry">
          <div className="date_box">
            <ul className="date3_tab">
              <li className="tabs on">
                <a className="date3_btn">3개월</a>
              </li>
              <li className="tabs">
                <a className="date3_btn">6개월</a>
              </li>
              <li className="tabs">
                <a className="date3_btn">1년</a>
              </li>
            </ul>
            <div className="date_rang">
              <div className="calendar_box">
                <input type="text" id="datepicker1"
                       className="inp datepicker" autoComplete="off" />
              </div>
              <div className="calendar_box">
                <input type="text" id="datepicker2"
                       className="inp datepicker" autoComplete="off" />
              </div>
              <button className="button button_positive button-s"
                      type="button">조회
              </button>
            </div>
          </div>
          <div className="history_list">
            <div
              className="col_table_wrap mileage_table on">{/* 데이터가 있는 경우 class : on */}
              <div className="col_table">
                <div className="col_table_head">
                  <div className="col_table_row">
                    <div className="col_table_cell">날짜</div>
                    <div className="col_table_cell">내역</div>
                    <div className="col_table_cell">주문번호</div>
                    <div className="col_table_cell">마일리지</div>
                    <div className="col_table_cell">유효기간</div>
                  </div>
                </div>
                <div className="col_table_body">
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 400</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">마일리지로 제품 구입</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 800</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage up">
                      <p className="txt">+ 800</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage up">
                      <p className="txt">+ 2500</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 3000</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage up">
                      <p className="txt">- 800</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage up">
                      <p className="txt">- 800</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 400</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 400</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                  <div className="col_table_row">
                    <div className="col_table_cell order_date">
                      <p className="txt">21.05.12</p>
                    </div>
                    <div className="col_table_cell order_details">
                      <p className="txt">주문 취소</p>
                    </div>
                    <div className="col_table_cell order_number">
                      <a className="txt">20210512-663W24</a>
                    </div>
                    <div className="col_table_cell order_mileage down">
                      <p className="txt">- 400</p>
                    </div>
                    <div className="col_table_cell order_expiration">
                      <p className="txt">22.12.31</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn_article">
                <a className="more_btn">더보기</a>
              </div>
            </div>
            <div className="no_data on"> {/* 데이터가 없을 경우 class : on */}
              <span>내역이 없습니다.</span>
            </div>
          </div>
        </div>
        <div className="guide_list">
          <p className="tit">[멤버십 마일리지 안내]</p>
          <ul className="list_dot">
            <li>구매 시 결제금액의 2%가 적립됩니다. (일부 품목 마일리지 적립대상 제외)</li>
            <li><strong>VIP회원</strong>(누적 구매
              금액 <strong>200만원</strong> 이상부터 적용)은 구매 시 결제금액의 4%가 적립됩니다.
              (2년 간 혜택 유지)
            </li>
            <li>마일리지 적립은 <strong>제품 구매일 당일</strong>에만 적립 가능합니다. (온라인
              소니스토어 배송 완료 후 7일 이내에 적립)
            </li>
            <li><strong>5,000 마일리지 이상</strong>이면 현금처럼 사용하실 수 있습니다.</li>
            <li>적립하신 마일리지는 소니스토어 온라인 및 직영점에서 제품 구매 시, 소니 공식 서비스 센터에서의 제품
              수리 및 콘텐츠 이용 시 사용 가능합니다.
            </li>
            <li>최근 1년 간의 멤버십 마일리지 내역만 조회 가능합니다. (날짜 직접 검색을 통해서 확인 가능)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MileageInfo;