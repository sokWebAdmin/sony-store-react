const CouponList = () => {
  return (
    <div className="cont history_coupon">
      <h3 className="cont_tit" id="coupon-tit">
        쿠폰
      </h3>
      <div className="history_inner">
        <div className="history_list">
          <div className="coupon_inner on">
            {/* class : on 내역이 있을 경우 on */}
            <div className="coupon_list">
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
              <div className="coupon_box">
                <div className="coupon">
                  <span className="coupon_no">
                    No. <span className="num">3757897055</span>
                  </span>
                  <p className="tit">
                    정품등록감사
                    <br /> 소니 액세서리 <span className="percentage">10%</span> 할인
                  </p>
                  <p className="cut_txt">3만원 이상 구매 시 </p>
                  <p className="expiration_txt">
                    <strong>유효 기간 </strong>2021.05.21 ~ 2021.06.12
                  </p>
                </div>
              </div>
            </div>
            <div className="btn_article line">
              <a className="more_btn">더보기</a>
            </div>
          </div>
          <div className="no_data on">
            {/* class : on 내역이 없을 경우 on */}
            <span>내역이 없습니다.</span>
          </div>
        </div>
        <div className="guide_list">
          <p className="tit">[쿠폰 사용 안내]</p>
          <ul className="list_dot">
            <li>
              쿠폰은 <strong>주문당 1매씩 사용 가능하며, 제품 1개에만 적용</strong>됩니다.
            </li>
            <li>쿠폰 할인은 결제 시점에서 자동으로 할인 금액만큼 차감되며 결제 예정금액이 표시됩니다.</li>
            <li>쿠폰은 주문 후 취소할 경우 재발급되지 않으니 사용에 유의하여 주시기 바랍니다.</li>
            <li>소니스토어에서 발행하는 쿠폰은 행사 내용에 따라 기간 및 해당 제품 등 적용 방법이 다를 수 있습니다.</li>
          </ul>
        </div>
        <div className="ico_box_link">
          <a className="box_link_inner ico_type1">
            <div className="txt_box">
              <p className="tit">소니스토어의 쿠폰 보기</p>
              <p className="txt">첫 구매 등 소니스토어의 다양한 쿠폰 혜택을 받으세요!</p>
            </div>
          </a>
          <a
            href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start"
            target="_blank"
            title="새 창 열림"
            className="box_link_inner ico_type2"
          >
            <div className="txt_box">
              <p className="tit">정품등록 관리</p>
              <p className="txt">소니 제품 구매 후 정품등록하고 쿠폰을 받으세요!</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
