export default function Privacy ({ toggle }) {
  return (
    <div className="layer agree_layer modal3" style={{ display: 'block' }}>
      <div className="layer_wrap">
        <div className="layer_container">
          <div className="layer_title">
            <h1>회원가입 개인정보 수집에 관한 동의</h1>
          </div>
          <div className="layer_content">
            <div className="scroll_inner">
              <div className="foot_cont">
                <div className="info_box">
                  <strong className="tit">수집, 이용목적</strong>
                  <p className="dsc">서비스 제공에 관한 계약 및 서비스제공에 따른 요금정산, 회원관리</p>
                </div>
                <div className="info_box">
                  <strong className="tit">수집하는 개인정보 항목</strong>
                  <div className="layer_tbl">
                    <table>
                      <caption>회원가입, 수집하는 개인정보 항목 목록 표</caption>
                      <colgroup>
                        <col style={{ width: '35%' }} />
                        <col />
                      </colgroup>
                      <thead>
                      <tr>
                        <th scope="col">회원가입</th>
                        <th scope="col">수집하는 개인정보 항목</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>일반 회원 가입 시</td>
                        <td>
                          필수항목: 이메일 주소(아이디), 성명, 비밀번호, 휴대폰번호, 생년월일, 성별
                          최초상품 주문 시: 주소
                        </td>
                      </tr>
                      <tr>
                        <td>외국인 회원 가입 시</td>
                        <td>필수항목: 이메일 주소(아이디), 성명, 비밀번호, 휴대폰번호, 생년월일, 성별
                          최초상품 주문 시: 주소
                        </td>
                      </tr>
                      <tr>
                        <td>법인 회원 가입 시</td>
                        <td>필수항목: 사업자등록번호, 상호명, 이메일 주소(아이디), 비밀번호, 휴대폰 번호
                          최초상품 주문 시: 주소
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="info_box">
                  <strong className="tit">개인정보 보유 및 이용기간</strong>
                  <p className="dsc">수집된 개인정보는 회원 탈퇴 및 서비스 종료 시까지 보관됩니다.<br />단,
                    회원가입 후 1년 동안 이용하지 않은 고객의 개인정보는 파기됩니다.
                  </p>
                </div>
                <div className="caution_box">
                  개인정보 수집에 거부할 수 있으며, 동의를 거부할 경우<br />이에 따른 불이익은 없습니다.
                </div>
              </div>
            </div>
          </div>
          <button className="layer_close close" title="팝업창 닫기"
                  onClick={() => toggle(false)}
          >
            <span>팝업창 닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
}