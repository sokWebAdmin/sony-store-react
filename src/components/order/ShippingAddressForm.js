// 배송지 정보
const ShippingAddressForm = prop => {
  // addressNo, countryCd, addressName, receiverName, receiverZipCd,
  // receiverAddress, receiverDetailAddress, receiverJibunAddress,
  // receiverContact1, receiverContact2, customsIdNumber,
  const { shipping, setShipping } = prop;

  const handleChange = e => {
    const { name, value } = e.target;

    setShipping(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="delivery_choice">배송지 선택</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type4">
              <p className="delivery_txt">배송지를 선택하세요.</p>
              <div className="delivery_btn_box">
                <button
                  className="button button_negative button-s popup_comm_btn"
                  type="button"
                  data-popup-name="shipping_addr">최근 배송지
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_email2">이메일<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     id="user_email2"
                     placeholder="이메일 아이디 (예 : sony@sony.co.kr)"
                     defaultValue="sony@sony.co.kr" />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />이메일 아이디를 입력해 주세요.</p>
          </div>
          <div className="check email_check">
            <input type="checkbox" className="inp_check"
                   id="chkemail" />
            <label htmlFor="chkemail">주문자 정보와 동일</label>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_number2">휴대폰 번호<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type5">
              <input type="text" className="inp"
                     id="user_number2" />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />휴대폰 번호를 입력해주세요.</p>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_address">주소<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type4">
              <input type="text" className="inp"
                     id="user_address"
                     placeholder="주소를 입력하세요."
                     defaultValue={'08008'} />
              <span className="focus_bg" />
              <div className="delivery_btn_box type1">
                <button
                  className="button button_negative button-s"
                  type="button">우편 번호
                </button>
              </div>
              <p className="error_txt"><span
                className="ico" />배송 받으실 주소를 입력해 주세요.
              </p>
            </div>
          </div>
          <div className="acc_group parent">
            <div className="acc_inp type5">
              <input type="text" className="inp"
                     defaultValue="서울특별시 영등포구 여의도동 국제금융로 10 One IFC" />
              <span className="focus_bg" />
            </div>
          </div>
          <div
            className="acc_group parent">
            <div className="acc_inp type5">
              <input type="text" className="inp"
                     placeholder="상세 주소를 입력하세요."
                     defaultValue="24cmd (주)소니코리아" />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />상세 주소를 입력해 주세요.</p>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="delivery_request">배송 요청
            사항</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type3">
              <div className="select_ui_zone btm_line">
                <a className="selected_btn"
                   data-default-text="택배 기사님께 요청하실 내용을 선택하세요.">{/* disabled : 선택불가 품절 */}
                  택배 기사님께 요청하실 내용을 선택하세요.
                </a>
                <div className="select_inner">
                  <p className="prd_tag">요청사항</p>
                  <ul className="select_opt">
                    <li>
                      <a
                        className="opt_list">{/* disabled : 선택 불가 품절 */}
                        <div className="item">배송 전 연락바랍니다.
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="opt_list">
                        <div className="item">부재 시 경비실에 맡겨 주세요.
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="opt_list">
                        <div className="item">부재 시 무인 택배함에 맡겨주세요.
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="opt_list">
                        <div className="item">부재 시 집 문앞에 놔주세요.
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="opt_list">
                        <div className="item">부재 시 휴대폰으로 연락 주세요.
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="opt_list">
                        <div className="item">파손의 위험이 있는 상품이니 조심히 다뤄주세요.
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     placeholder="배송 메모를 입력하세요." />
              <span className="focus_bg" />
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="delivery_choice">배송일 선택</label>
        </div>
        <div className="acc_cell vat">
          <div className="acc_group parent">
            <div className="acc_inp">
              <div className="acc_radio">
                <div className="radio_box">
                  <input type="radio"
                         className="inp_radio"
                         id="delivery_radio1"
                         name="deliveryradio"
                         defaultChecked="checked" />
                  <label htmlFor="delivery_radio1"
                         className="contentType">정상 배송</label>
                </div>
                <div className="radio_box">
                  <input type="radio"
                         className="inp_radio"
                         id="delivery_radio2"
                         name="deliveryradio" />
                  <label htmlFor="delivery_radio2"
                         className="contentType">출고일 지정</label>
                </div>
              </div>
            </div>
          </div>
          <div className="acc_group">
            <div className="calendar_box">
              <input type="text"
                     className="inp datepicker"
                     autoComplete="off" />
            </div>
          </div>
          <ul className="list_dot">
            <li>정상 배송이 제일 빠른 배송입니다.</li>
            <li>출고일 지정 배송의 경우 주문 날짜의 3일 후부터 선택이
              가능하며,<br />지정된 출고일에 맞춰서 제품이 발송되고, 출고일 기준
              2~3일 이내 수령이 가능합니다.
            </li>
            <li>소니스토어의 모든 제품은 무료 배송 입니다.</li>
            <li>배송기간은 서울, 경기일 경우 2~3일(주문일 포함), 기타 지역은
              3~5일
              정도 걸립니다.<br />(정오(낮12시) 이전 결제완료 기준)
            </li>
            <li>단, 지역 및 교통 사정에 따라 배송이 지연되는 경우가 발생할 수
              있습니다.
            </li>
            <li>일요일, 공휴일은 배송되지 않습니다. (예:토요일 주문 시 월요일에
              접수되어
              화요일 이후 배송)
            </li>
            <li>예약판매는 별도의 배송 일정을 따릅니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShippingAddressForm;