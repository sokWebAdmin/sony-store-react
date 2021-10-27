import React, { useState, useEffect, useCallback } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import Alert from '../../components/common/Alert';

import { useToggle } from '../../hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { getUrlParam } from '../../utils/location';

const labels = [
  '[필수] 소니스토어 쇼핑몰 이용약관 동의',
  '[필수] 소니 고객지원 사이트(SCS) 이용약관 동의',
  '[필수] 회원가입 개인정보 수집에 관한 동의',
  '[필수] 개인정보 위탁에 관한 동의',
  '[선택] 이벤트 등 프로모션 알림 메일 수신',
  '[선택] 이벤트 등 프로모션 알림 SMS 수신',
];

const JoinAgree = () => {
  const history = useHistory();
  const location = useLocation();
  const [checkAll, setCheckAll] = useToggle(false);
  const [checkList, setCheckList] = useState(labels.map(() => false));
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCheckClick = (index) =>
    setCheckList(checks => checks.map((c, i) => (i === index ? !c : c)));

  useEffect(() =>
    setCheckAll(checkList.every((x) => x))
  , [checkList])

  const validateAgree = () => {
    const requireAgree = Array.from(Array(4).keys()).every(index => checkList[index]);
    if (requireAgree) {
      history.push({
        pathname: '/member/joinStep',
        search: getUrlParam('sns') === 'true' ? `?sns=true&sms=${checkList[4]}&email=${checkList[5]}` : `?sms=${checkList[4]}&email=${checkList[5]}`,
        state: {
          agree: true,
          email: location.state?.email,
        },
      });
    } else {
      openAlert('이용약관에 동의해주세요.');
    }
  };

  const openAlert = (message) => {
    setAlertVisible(true);
    setAlertMessage(message);
  };

  const closeModal = () => {
    setAlertVisible(false);
  };

  let agreeName = null;
  const openAgreeLayer = (name) => {
    document.body.style.overflow = "hidden";
    agreeName = name;
    document.querySelector(`.${name}`).style.display = "block"
  }

  const closeAgreeLayer = () => {
    document.body.style.overflow = "auto";
    document.querySelector(`.${agreeName}`).style.display = "none"
  }

  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    setCheckList(labels.map(_ => !checkAll))
  }

  return (
    <>
      <SEOHelmet title={'소니코리아 회원가입'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="contents">
        <div className="container">
          <div className="login join_agree">
            <h2 className="login__title">소니스토어</h2>
            <p className="login__desc">소니 고객지원 사이트(SCS) 와 소니스토어는 하나의 ID 와 비밀번호로 운영됩니다.<span className="block">소니 고객지원 사이트(SCS)의 이용약관에 함께 동의하시면,</span>
              하나의 ID로 고객지원 사이트(SCS)를 편리하게 이용하실 수 있습니다.</p>
            <div className="agree_chk_box">
              <div className="all_box">
                <strong className="tit_label">약관 전체 동의<span>(선택 항목 포함)</span></strong>
                <div className="switchbtn">
                  <label className="switch">
                    <input type="checkbox" name="all" className="check_all" checked={checkAll}
                           onChange={handleCheckAll} />
                    <span className="toggle" />
                  </label>
                </div>
              </div>
              <div className="bg_check_box">
                {labels.map((label, index) => {
                  const key = `chk0${index}`;
                  return (<div className="chk_cell" key={key}>
                    <div className="check">
                      <input type="checkbox" className="inp_check" onChange={() => handleCheckClick(index)}
                             checked={checkList[index]} id={key} />
                      <label htmlFor={key}>{label}</label>
                    </div>
                    <a href="javascript:void(0)" className="btn_view" onClick={() => openAgreeLayer(`modal${index + 1}`)}>전체보기</a>
                  </div>);
                })}
              </div>
              <div className="btn_box agree full">
                <button type="button" className="btn btn_dark" onClick={() => validateAgree()}>동의</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal1">
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>소니스토어 쇼핑몰 이용약관 동의</h1>
            </div>
            <div className="layer_content ">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제1장 총칙</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제1조 (목적)</h5>
                      <p>본 약관은 소니코리아 주식회사 (이하 회사라 한다.)가 운영하는 소니코리아 공식 웹사이트(이하 공식 웹사이트라 한다.)가 제공하는 인터넷관련 서비스 (이하 서비스라
                        한다.)를 이용함에 있어 공식 웹사이트와 이용자의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article02">제2조 (정의)</h5>
                      <ol>
                        <li>
                          ① Sony Store라 함은 회사가 재화 또는 용역(이하 재화등이라 함)을 이용자에게 제공하기위해 컴퓨터등 정보통신설비를 이용하여 상품을 거래할 수 있도록 설정한
                          가상의 영업장을 말하며 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                        </li>
                        <li>
                          ② 이용자라 함은 Sony Store에 접속하여 이 약관에 따라 Sony Store가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        </li>
                        <li>
                          ③ 회원이라 함은 Sony Store에 개인정보를 제공하여 회원등록을 한 자로서 Sony Store가 제공하는 정보를 지속적으로 받으며 Sony Store의 서비스를
                          계속 제공받을 수 있는 자를 말합니다.
                        </li>
                        <li>
                          ④ 비회원이라 함은 회원에 가입하지 않고 서비스를 이용하는 자를 말합니다.
                        </li>
                        <li>
                          ⑤ 회원아이디(ID)라 함은 회원의 식별과 서비스 이용을 위해 회원이 정하고 Sony Store가 승인하는 문자 또는 숫자의 조합으로 회사가 운영하는 다른 인터넷사이트와
                          동일하게 사용하게 됩니다. 단, Sony Store에 가입한 회원이 소니픽쳐스 코리아가 제공하는 콜럼비아 트라이스타 사이트에 회원으로 가입하는 경우, Sony
                          Store와 동일한 회원 아이디(ID)와 비밀번호를 사용해야 합니다.
                        </li>
                        <li>
                          ⑥ Sony Store 멤버십제도는 Sony Store 온라인 가입 회원에게 해당되는 것으로 상품구입시 마일리지 제공 및 기타 이벤트 참가기회 제공 등 차별화된 서비스를
                          제공하는 것을 말합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article03">제3조 (약관의 게시, 효력, 개정)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 본 약관의 내용과 상호 및 대표자 성명, 영업소소재지(및 소비자의 불만을 처리할 수 있는 곳의 주소), 전화번호, fax번호, 전자우편주소,
                          사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 알 수 있도록 Sony Store의 초기화면에 게시합니다. 단, 약관의 내용은 이용자가 연결화면을
                          통하여 볼 수 있도록 할 수 있습니다.
                        </li>
                        <li>
                          ② Sony Store는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록
                          별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                        </li>
                        <li>
                          ③ 본 약관은 전자상거래등에서의 소비자보호에 관한 법률, 약관의 규제등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진 및 정보보호등에 관한 법률,
                          방문판매등에 관한 법률, 소비자보호법등 관련법을 위반하지 않는 범위내에서 개정될 수 있습니다.
                        </li>
                        <li>
                          ④ 회사가 본 약관을 이용자에게 불리하게 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 Sony Store는 개정전 내용과 개정후
                          내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                        </li>
                        <li>
                          ⑤ 회사가 약관을 개정할 경우에는 그 개정약관은 적용일자 이후에 체결된 계약에만 적용되고 그 이전에 이미 체결된 계약에 관해서는 개정전의 약관이 적용됩니다. 단, 이미
                          계약을 체결한 이용자가 개정약관의 적용을 받기를 원하는 뜻을 제④항의 공지기간내 Sony Store에 송신하여 Sony Store의 동의를 받은 경우는 개정약관 조항이
                          적용됩니다.
                        </li>
                        <li>
                          ⑥ 본 약관에 명시되지 않은 사항과 본 약관의 해석에 관해서는 전자상거래등에서의 소비자보호에 관한 법, 약관의규제등에 관한 법,공정거래위원회가 정하는 전자상거래등에서의
                          소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제2장 서비스 제공</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article04">제4조 (서비스 제공)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 다음과 같은 업무를 수행합니다.
                          <ul className="mt22 mb22">
                            <li>가. 재화등에 대한 정보제공 및 구매계약 체결</li>
                            <li>나. 구매계약이 체결된 재화등의 배송</li>
                            <li>다. 기타 Sony Store가 정하는 업무</li>
                          </ul>
                        </li>
                        <li>
                          ② Sony Store는 재화등의 품절 또는 기술적 사양이 변경되는 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화등의 내용을 변경할 수 있으며 이경우 변경된
                          재화등의 내용 및 제공일자를 명시하여 현재의 재화등의 내용을 게시한 곳에 즉시 공시합니다.
                        </li>
                        <li>
                          ③ Sony Store가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경등의 이유로 변경할 경우 그 사유를 이용자에게 통지가능한
                          주소로 즉시 통지합니다.
                        </li>
                        <li>
                          ④ 전항의 경우 Sony Store 로 인하여 이용자가 입은 손해를 배상합니다. 단, Sony Store에 고의 또는 과실이 없음을 입증하는 경우에는 그렇지 않습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article05">제5조 (서비스의 중단)</h5>
                      <ol>
                        <li>
                          ① Sony Store 컴퓨터등 정보통신설비의 보수, 점검, 교체 및 고장, 두절등의 사고가 발생하는 경우에는 서비스의 제공을 일시 중단할 수 있습니다.
                        </li>
                        <li>
                          ② Sony Store는 전항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, Sony Store가 고의
                          또는 과실이 없음을 입증하는 경우에는 그렇지 않습니다.
                        </li>
                        <li>
                          ③ 사업종목의 전환, 사업의 포기, 업체간 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우 Sony Store는 제10조에서 정한 방법으로 이용자에게 통지하고 당초
                          Sony Store에서 제시한 조건에 따라 소비자에게 보상합니다. 단, Sony Store보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을
                          Sony Store에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제3장 회원</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article06">제6조 (회원가입)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자가 제공한 개인정보에 대해 본인확인절차 및 I-PIN인증을 거쳐 회원가입을 승낙합니다.
                        </li>
                        <li>
                          ② Sony Store는 전 ①항과 같이 회원가입을 신청한 이용자중 다음의 각호에 해당하지 않는 한 회원으로 등록합니다.
                          <ul className="mt22 mb22">
                            <li>가. 가입신청자가 이 약관 제8조 에 의하여 이전에 회원자격을 상실한 적이 있는 경우 단, 회원자격 상실후 3년이 경과한 자로서 Sony Store의
                              회원재가입 승낙을 얻은 경우에는 예외로 한다.
                            </li>
                            <li>나. 등록내용에 허위, 누락, 오기가 있는 경우</li>
                            <li>다. 비실명으로 가입하는 경우 또는 실명이 확인되지 않은 경우</li>
                          </ul>
                        </li>
                        <li>
                          ③싱글사인온(Single Sign On)<br/>
                          회사는 고객의 편의를 위해 회사의 패밀리사이트인 Sony Store와 SCS사이트의 통합회원제도를 운영하고 있습니다. 이를 위해 본 회사가 수집한 개인정보는 아래의
                          내용에 따라 각 패밀리사이트에 제공하게 됩니다. 따라서 고객님이 Sony Store에 회원으로 가입하시고 동시에 회사가 운영하는 SCS에 회원으로 가입하신 경우,
                          고객님의 편리한 이용을 위해 Sony Store에 로그인(ID와 비밀번호로 접속)하시면 별도의 로그인절차없이 SCS 를 이용하실 수 있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article07">제7조 (회원정보변경)</h5>
                      <p>
                        회원은 등록사항에 변경이 있는 경우 즉시 Sony Store의 회원정보변경절차에 따라 직접 온라인상으로 변경사항을 수정해야 합니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article08">제8조 (회원탈퇴,자격상실 및 서비스이용제한등)</h5>
                      <ol>
                        <li>
                          ① 회원은 언제든지 탈퇴를 요청할 수 있고 Sony Store는 즉시 탈퇴처리를 합니다.
                        </li>
                        <li>
                          ② 회원이 사망한 때는 회원자격을 상실합니다.
                        </li>
                        <li>
                          ③ 회원이 다음 각 호의 사유에 해당하는 경우, Sony Store는 회원자격을 제한 및 정지시킬 수 있습니다.
                          <ul className="mt22 mb22">
                            <li>가. 가입신청시 허위의 내용을 등록한 경우</li>
                            <li>나. Sony Store가 정한 회원가입절차를 거치지 않은 경우</li>
                            <li>다. 구입한 재화와 용역의 대금을 기한내 지급하지 않거나 기타 회원이 부담하는 채무를 기일내 이행하지 않은 경우</li>
                            <li>라. 다른 사람의 Sony Store이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                            <li>마. Sony Store를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                          </ul>
                        </li>
                        <li>
                          ④ Sony Store가 회원자격을 제한,정지시킨 후 동일한 행위가 2회이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 Sony Store는 회원자격을
                          상실시킬 수 있습니다.
                        </li>
                        <li>
                          ⑤ Sony Store가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고 회원등록 말소전에 최소한 30일 이상의 기간을 정하여
                          소명할 기회를 부여합니다.
                        </li>
                        <li>
                          ⑥ 단, 회사의 회원가입절차 채택 및 회원ID 통합실시 이전에 가입한 회원으로서, 회사가 보낸 실명확인절차 이행 안내 및 회원 ID 변경을 요청한 전자우편을 받고도
                          일정한 기간내 실명확인 및 ID변경절차를 이행하지 않은 회원의 경우 당해 기간 경과 후 30일이 지나면 회원자격을 상실시킬 수 있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article09">제9조 (회원탈퇴에 따른 개인정보보유만료 및 멤버십제도 사용권 소멸)</h5>
                      <ol>
                        <li>
                          ① 회원자격을 상실하게 되는 경우 Sony Store는 회원의 개인정보를 즉시 파기,삭제하며 제10조 1항의 방법으로 개별통보합니다. 단, 개인정보취급방침에 따라 회사가
                          보존해야 하는 개인정보의 경우는 예외로 합니다.
                        </li>
                        <li>
                          ② 회원탈퇴 또는 회원자격상실시 Sony Store 멤버십제도의 사용권한도 소멸되므로 적립된 마일리지는 소멸됩니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article10">제10조 (회원에 대한 통지)</h5>
                      <ol>
                        <li>
                          ① 회원에 대한 통지를 하는 경우 회원이 Sony Store와 미리 약정하여 지정한 전자우편주소로 합니다.
                        </li>
                        <li>
                          ② 단, 불특정다수의 회원에 대한 통지는 1주일이상 Sony Store 화면에 게시함으로써 개별통지에 대신할 수 있습니다. 단, 회원 본인의 거래에 관련하여 중대한
                          영향을 미치는 사항에 대하여는 개별통지를 합니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제4장 상품구매</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article11">제11조 (구매신청)</h5>
                      <p>
                        이용자는 Sony Store에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며 Sony Store는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게
                        제공하여야 합니다. 단, 회원인 경우 나호내지 라호의 적용을 제외할 수 있습니다.
                      </p>
                      <ul className="mt22">
                        <li>가. 재화등의 검색 및 선택</li>
                        <li>나. 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호)등의 입력</li>
                        <li>다. 약관내용, 청약철회권이 제한되는 서비스, 배송료 및 설치비등의 비용부담과 관련한 내용에 대한 확인</li>
                        <li>라. 이 약관에 동의하고 위 다호의 사항을 확인하거나 거부하는 표시(예, 마우스클릭)</li>
                        <li>마. 재화등의 구매신청 및 이에관한 확인 또는 Sony Store의 확인에 대한 동의</li>
                        <li>바. 결제방법 선택</li>
                      </ul>

                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article12">제 12조 (계약의 성립)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자의 주문신청에 대해 다음 각호에 해당하면 승낙하지 않을 수 있습니다.
                          <ul className="mt22 mb22">
                            <li>가. 신청내용에 허위, 누락, 오기가 있는 경우</li>
                            <li>나. 미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화등을 구매하는 경우</li>
                            <li>다. 기타 주문신청에 승낙하는 것이 Sony Store의 기술상 현저히 지장이 있다고 판단하는 경우</li>
                          </ul>
                        </li>
                        <li>
                          ② Sony Store의 승낙이 제14조 제①항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립하는 것으로 봅니다.
                        </li>
                        <li>
                          ③ Sony Store의 승낙의 의사표시에는 이용자의 구매신청에 대한 확인 및 판매가능여부, 구매신청의 정정,취소등에 관한 정보등을 포함하여야 합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article13">제13조 (지급방법)</h5>
                      <p>
                        Sony Store에서 구매한 재화등에 대한 대급지급방법은 다음 각호의 방법중 가용한 방법으로 할 수 있습니다.<br/>
                        단, Sony Store는 이용자의 지급방법에 대하여 재화등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.
                      </p>
                      <ul className="mt22">
                        <li>가. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹등의 각종의 계좌이체</li>
                        <li>나. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제</li>
                        <li>다. 온라인무통자입금</li>
                        <li>라. 전자화폐에 의한 결제</li>
                        <li>마. 수령시 대금지급</li>
                        <li>바. 마일리지 등 Sony Store가 지급한 포인트에 의한 결제</li>
                        <li>사. Sony Store와 계약을 맺었거나 Sony Store가 인정한 상품권에 의한 결제</li>
                        <li>아. 기타 전자적 지급방법에 의한 대금지급 등</li>
                      </ul>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article14">제14조 (수신확인 및 구매신청 변경 및 취소)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자와 재화등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일이내에 재화등을 배송할 수 있도록 주문제작, 포장등
                          기타의 필요한 조치를 취합니다. 단, Sony Store가 이미 재화등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 2영업일 이내에
                          조치를 취합니다. 이때 Sony Store는 이용자가 재화등의 공급 절차 및 진행사항을 확인할 수 있도록 적절한 조치를 합니다.
                        </li>
                        <li>
                          ② 수신확인통지를 받은 이용자는 의사표시의 불일치등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 Sony Store는 배송전에
                          이용자의 요청이 있는 경우에는 지체없이 그 요청에 따라 처리하여야 합니다. 다만, 이미 대금을 지불한 경우에는 제17조의 청약철회 등에 관한 규정에 따릅니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article15">제15조 (재화등의 공급)</h5>
                      <p>
                        Sony Store는 이용자가 구매한 재화에 대한 배송수단, 수단별 배송비용부담자, 수단별 배송기간등을 명시합니다. 만약 Sony Store가 약정 배송기간을 초과한
                        경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 Sony Store가 고의, 과실이 없음을 입증한 경우에는 그러하지 아니합니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article16">제16조 (환급)</h5>
                      <p>
                        Sony Store는 이용자가 구매신청한 재화등이 품절등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체없이 그 사유를 이용자에게 통지하고 사전에 재화등의 대금을 받은
                        경우에는 대금을 받은 날부터 2영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article17">제17조 (청약철회 등)</h5>
                      <ol>
                        <li>
                          ① Sony Store와 재화등의 구매에 관한 계약을 체결한 이용자는 재화 등을 배송 받은 날부터 7일이내에는 청약의 철회를 할 수 있습니다.
                        </li>
                        <li>
                          ② 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                          <ul className="mt22 mb22">
                            <li>가. 이용자에게 책임있는 사유로 재화등이 멸실 또는 훼손된 경우. (다만, 재화등의 내용을 확인하기 위해 포장등을 훼손한 경우에는 청약철회를 할 수
                              있습니다.)
                            </li>
                            <li>나. 이용자의 사용 또는 일부 소비에 의해 상품의 가치가 현저히 감소한 경우</li>
                            <li>다. 시간의 경과로 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우</li>
                            <li>라. 같은 성능을 지닌 재화등으로 복제가 가능한 경우 그 원본인 재화등의 포장을 훼손한 경우</li>
                          </ul>
                        </li>
                        <li>
                          ③ 제2항 나호 내지 라호의 경우 Sony Store가 사전에 청약철회등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를
                          하지 않았다면 이용자의 청약철회등이 제한되지 않습니다.
                        </li>
                        <li>
                          ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화등의 내용이 표시,광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화등을 공급받은 날부터 3월이내, 그
                          사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article18">제18조 (청약철회 등의 효과)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자로부터 재화등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화등의 대금을 환급합니다. 이 경우 Sony Store가 이용자에게 재화등의
                          환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
                        </li>
                        <li>
                          ② Sony Store는 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐등의 결제수단으로 재화등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한
                          사업자로 하여금 재화등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
                        </li>
                        <li>
                          ③ 청약철회등의 경우 공급받는 재화등의 반환에 필요한 비용은 이용자가 부담합니다. Sony Store는 이용자에게 청약철회등을 이유로 위약금 또는 손해배상을 청구하지
                          않습니다. 다만 재화등의 내용이 표시,광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회등을 하는 경우 재화등의 반환에 필요한 비용은 Sony Store가
                          부담합니다.
                        </li>
                        <li>
                          ④ 이용자가 재화등을 제공받을 때 발송비를 부담한 경우에 Sony Store는 청약철회시 그 비용을 누가 부담하는지를 알기 쉽도록 명확하게 표시합니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제5장 개인정보의 보호</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article19">제19조 (개인정보의 수집)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자의 정보수집시 개인정보취급방침에 기재되어 있는 필요한 최소한의 정보를 수집합니다.
                        </li>
                        <li>
                          ② Sony Store가 이용자의 개인식별이 가능한 개인정보를 수집하는 때에는 반드시 당해 이용자의 동의를 받습니다.
                        </li>
                        <li>
                          ③ 이용자는 본 약관에 동의함으로 당사의 개인정보 수집 요청에 응한 것으로 간주됩니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article20">제20조 (개인정보에 관한 이용자의 권리)</h5>
                      <p>
                        이용자 또는 이용자의 법정대리인은 언제나 자신 또는 자신이 보호하는 아동의 개인정보를 열람, 정정하거나 삭제를 요청할 수 있으며, Sony Store는 이용자 또는 이용자의
                        법정대리인으로부터 요청을 받은 즉시 필요한 조치를 합니다. 이용자 또는 이용자의 법정대리인이 오류의 정정을 요구한 경우 그 오류를 정정할 때까지 당해 개인정보를 이용하지
                        않습니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article21">제21조 (개인정보관리책임자 등)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 개인정보보호를 위해 관리자를 한정하며 그 수를 최소화하며 신용카드, 은행계좌등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 변조등으로 인한
                          이용자의 손해에 대하여 모든 책임을 집니다.
                        </li>
                        <li>
                          ② Sony Store의 개인정보보호에 관한 보다 자세한 내용은 Sony Store 개인정보보호정책을 참고하시기 바랍니다. 개인정보와 관련된 문의사항은 개인정보관리책임자
                          및 담당자에게 요청하시기 바랍니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제6장 Sony Store 및 이용자의 의무</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article22">제22조 (Sony Store의 의무)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고 안정적으로 상품을 제공하는 데 최선을
                          다하여야 합니다.
                        </li>
                        <li>
                          ② Sony Store는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안시스템을 갖추어야 합니다.
                        </li>
                        <li>
                          ③ Sony Store가 상품이나 용역에 대하여 표시,광고의공정화에관한법률 제3조 소정의 부당한 표시,광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을
                          집니다.
                        </li>
                        <li>
                          ④ Sony Store는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article23">제23조 (회원의 ID 및 비밀번호에 대한 의무)</h5>
                      <ol>
                        <li>
                          ① 회사의 고의 및 과실로 인한 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
                        </li>
                        <li>
                          ② 회원은 자신의 ID및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
                        </li>
                        <li>
                          ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 Sony Store에 통보하고 Sony Store의 안내가 있는 경우에는
                          그에 따라야 합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article24">제24조 (이용자의 의무)</h5>
                      <p>이용자는 다음의 행위를 하여서는 안됩니다.</p>
                      <ol className="mt20">
                        <li>
                          ① 신청 또는 변경 시 허위내용의 등록
                        </li>
                        <li>
                          ② 타인의 정보 도용
                        </li>
                        <li>
                          ③ Sony Store에 게시된 정보의 변경
                        </li>
                        <li>
                          ④ Sony Store가 정한 정보 이외의 정보(컴퓨터 프로그램 등)등의 송신 또는 게시
                        </li>
                        <li>
                          ⑤ Sony Store 기타 제3자의 저작권등 지적재산권에 대한 침해
                        </li>
                        <li>
                          ⑥ Sony Store 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                        </li>
                        <li>
                          ⑦ 외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 Sony Store에 공개 또는 게시하는 행위
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제7장 Sony Store 멤버십제도</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제25조 (의의)</h5>
                      <p>
                        Sony Store 멤버십제도는 Sony Store 가입 회원에 대한 마일리지제공 및 이벤트 우선 참가기회등 차별화된 서비스를 제공합니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article26">제26조 (자격)</h5>
                      <p>
                        Sony Store 가입 회원은 해당 멤버십제도를 이용할 수 있습니다. 단, 회원등록내용에 허위가 있거나 실명이 확인되지 않는 경우 또는 회원자격 정지 및 상실요건에
                        해당하는 회원에게는 자격이 부여되지 않습니다
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article27">제27조 (이용방법)</h5>
                      <ol>
                        <li>
                          ① Sony Store및 off line Sony직영점에서 상품 구입시 회사가 정한 마일리지를 제공합니다. 단 상품에 따라 적용되는 마일리지는 다를 수 있습니다.
                        </li>
                        <li>
                          ② Sony Store event에 우선적으로 초대합니다.
                        </li>
                        <li>
                          ③ 적립된 마일리지는 Sony Store및 off line Sony직영점, Sony공식서비스센터 (제품 수리 서비스 이용시)에서 현금처럼 사용할 수 있으며, 1마일리지는
                          1원으로 환산됩니다. 다만, 회사는 환산비용을 변경할 수 있으며 이 경우 약관 3조 4항에 따라 고지합니다.
                        </li>
                        <li>
                          ④ 회원탈퇴 또는 회원자격상실시 멤버십제도의 사용권한도 소멸되므로 적립된 마일리지는 소멸됩니다.
                        </li>
                        <li>
                          ⑤ 위 사항외에 상세한 멤버십제도 관련 마일리지 사용방법, 제공방법, 적립방법, 적립한도등에 대해서는 Sony Store 화면의 마일리지 안내란을 참고하시기 바랍니다.
                        </li>
                        <li>
                          ⑥ 적립된 마일리지는 상품 구매일로부터 1년이 지나면 소멸됩니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article28">제28조 (멤버십제도운영방법 변경등)</h5>
                      <p>
                        멤버십제도 서비스와 관련하여 서비스의 변경 또는 마일리지 제공방법 변경시 Sony Store는 이를 미리 회원에게 고지할 것입니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제8장 기타사항</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article29">제29조 (보안 정책)</h5>
                      <p>
                        Sony Store는 회원 정보의 보안을 위하여 안전한 128비트 암호화 알고리즘(국제적으로 공인된 베리사인Verisign의 SSL 알고리즘)을 사용합니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article30">제30조 (연결몰과 피연결몰간의 관계)</h5>
                      <ol>
                        <li>
                          ① 상위 몰과 하위 몰이 하이퍼링크(하이퍼링크의 대상에는 문자, 그림 및 동화상등이 포함됨)방식으로 연결된 경우 전자를 연결 몰(웹사이트)이라고 하고 후자를
                          피연결몰(웹사이트)이라고 합니다.
                        </li>
                        <li>
                          ② 연결 몰은 피연결 몰이 독자적으로 제공하는 재화등에 의하여 이용자와 행하는 거래에 대해서는 보증책임을 지지 않는다는 뜻을 연결 몰의 초기화면 또는 연결되는 시점의
                          팝업화면으로 명시한 경우에는 그 거래에 대한 보증책임을 지지 않습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article31">제31조 (저작권의 귀속 및 이용제한)</h5>
                      <ol>
                        <li>
                          ① Sony Store가 작성한 저작물에 대한 저작권 및 기타 지적 재산권은 Sony Store에 귀속합니다. 단, 음악방송 및 영화관련 컨텐츠에 이용되는 저작물 등에
                          대하여는 다른 저작권자에게 저작권이 귀속되는 경우가 있습니다.
                        </li>
                        <li>
                          ② 이용자는 Sony Store를 이용함으로써 얻은 정보 중 Sony Store이나 기타의 저작권자에게 지적재산권이 귀속된 정보를 Sony Store의 사전 승낙 없이
                          복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 해서는 안됩니다.
                        </li>
                        <li>
                          ③ Sony Store는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.
                        </li>
                        <li>
                          ④ 재화등에 내장되거나 부수된 컴퓨터 프로그램의 소유권은 프로그램 저작권자의 권리로 유보됩니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article32">제32조 (컴퓨터 및 소프트웨어 라이센스)</h5>
                      <p>
                        재화등에 내장되거나 별도로 재화등과 함께 고객에게 제공되는 일체의 컴퓨터 프로그램은 회사가 당해 프로그램의 소유자와 적법한 라이센스계약등을 통해서 프로그램사용권을 부여 받은
                        것입니다. 이용자는 구입한 재화등의 유기적 일체로서 컴퓨터프로그램을 사용할 수 있으나 이를 별도로 분리하거나 이를 복제, 편집, 제3자에게 임대할 수 없습니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article33">제33조 (상품개조의 금지)</h5>
                      <p>
                        Sony Store로부터 구입한 재화등은 분해, 개조 또는 형상을 변경하여서는 아니 됩니다. 재화등을 개조하면 무상수리를 받을 수 없습니다.
                      </p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article34">제34조 (보증)</h5>
                      <ol>
                        <li>
                          ① Sony Store에서 구입한 재화등은 소비자피해보상규정등 소비자보호에 관한 관련법에 의해 무상수리, 교환, 환불 또는 보상을 받을 수 있습니다.
                        </li>
                        <li>
                          ② 수리서비스의 제공과 관련하여 고객은 서비스를 제공받기 이전에 재화등의 하드드라이브에 설치한 소프트웨어를 포함하여 저장된 모든 데이터와 하드드라이브의 내용을 백업해야
                          하고 재화등에 부속한 테이프, CD, 디스켓, 메모리스틱등 데이터가 저장되어 있는 모든 부속물을 제거하여야 합니다. 수리서비스를 제공하는 동안 고객의 하드드라이브 내용이
                          소실되거나 재포맷 될 가능성이 많으며 회사는 수리서비스를 제공하는 동안 발생할 수 있는 재화등에 저장되거나 재화등의 부속물에 저장된 프로그램, 데이터, 기타 정보의
                          손상, 손실, 분실 및 이로 인해 발생한 손해에 대해서 책임이 없습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article35">제35조 (분쟁해결)</h5>
                      <ol>
                        <li>
                          ① Sony Store는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치,운영합니다.
                        </li>
                        <li>
                          ② Sony Store의 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을
                          즉시 통보해 드립니다.
                        </li>
                        <li>
                          ③ Sony Store와 이용자간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시,도지사가 의뢰하는 분쟁조정기관의 조정에
                          따를 수 있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article36">제36조 (관할법원 및 준거법)</h5>
                      <ol>
                        <li>
                          ① Sony Store와 이용자간 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로
                          합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
                        </li>
                        <li>
                          ② Sony Store와 이용자간에 제기된 전자상거래소송에는 한국법을 적용합니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <ul>
                    <li>
                      <p>※ 본 약관에 대한 저작권은 소니 코리아에 귀속하며 무단 복제, 배포, 전송 기타 저작권 침해행위를 금지합니다.</p>
                      <p>※ 본 약관은 시행일자 : 2018년 8월 1일부터 적용됩니다.</p>
                      <p>직전변경일 : 2018년 4월 16일</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal2">
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>소니 고객지원 사이트(SCS) 이용약관 동의</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제1장 총칙</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제1조 (목적)</h5>
                      <p>본 약관은 소니코리아주식회사 (이하 회사라 합니다.)가 운영하는 사이버 고객지원 페이지인 Sony Customer Station (이하 SCS 이라 합니다.)이 제공하는
                        인터넷관련 서비스 (이하 서비스라 합니다.)를 이용함에 있어 SCS와 이용자의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다. 본 약관은 "온라인 수리요금 결제
                        서비스 이용약관" 및 "소니 아카데미 유료강좌 이용약관"에서 특별히 정하지 않은 사항에 대해서도 공통적으로 적용됩니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article02">제2조 (정의)</h5>
                      <ol>
                        <li>
                          ① 이용자라 함은 SCS에 접속하여 이 약관에 따라 SCS가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        </li>
                        <li>
                          ② 회원이라 함은 SCS에 개인정보를 제공하여 회원등록을 한 자로서, SCS의 정보를 지속적으로 제공받으며, SCS가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
                          말합니다.
                        </li>
                        <li>
                          ③ 비회원이라 함은 회원에 가입하지 않고 SCS에서 제공하는 서비스를 이용하는 자를 말합니다.
                        </li>
                        <li>
                          ④ 회원아이디(ID)라 함은 회원의 식별과 서비스 이용을 위해 회원이 정하고 SCS가 승인하는 문자 또는 숫자의 조합으로 회사가 운영하는 다른 인터넷사이트와 동일하게
                          사용하게 됩니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit" id="article02">제3조 (약관의 게시, 효력, 개정)</h5>
                      <ol>
                        <li>
                          ① SCS는 본 약관의 내용과 상호 및 대표자 성명, 영업소소재지(및 소비자의 불만을 처리할 수 있는 곳의 주소), 전화번호, fax번호, 전자우편주소, 사업자등록번호,
                          통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 알 수 있도록 SCS의 초기화면에 게시합니다. 단, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수
                          있습니다.
                        </li>
                        <li>
                          ② SCS는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
                          연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                        </li>
                        <li>
                          ③ 본 약관은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진 및 정보보호 등에 관한 법률,
                          방문판매 등에 관한 법률, 소비자보호법 등 관련법을 위반하지 않는 범위 내에서 개정될 수 있습니다.
                        </li>
                        <li>
                          ④ 회사가 본 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 현행약관과 함께SCS초기화면에 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만 이용자에게
                          불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 SCS는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가
                          알기 쉽도록 표시합니다.
                        </li>
                        <li>
                          ⑤ 회사가 약관을 개정할 경우에는 그 개정약관은 적용일자 이후에 체결된 계약에만 적용되고 그 이전에 이미 체결된 계약에 관해서는 개정전의 약관이 적용됩니다. 단, 이미
                          계약을 체결한 이용자가 개정약관의 적용을 받기를 원하는 뜻을 제④항의 공지기간 내 SCS에 송신하여 SCS의 동의를 받은 경우는 개정약관 조항이 적용됩니다.
                        </li>
                        <li>
                          ⑥ 본 약관에 명시되지 않은 사항과 본 약관의 해석에 관해서는 전자상거래 등에서의 소비자보호에 관한 법, 약관의 규제 등에 관한 법,공정거래위원회가 정하는 전자상거래
                          등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제2장 서비스 제공</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제4조 (서비스 제공)</h5>
                      <ol>
                        <li>
                          ① SCS는 다음과 같은 업무를 수행합니다.
                          <ul>
                            <li>가.보증기간 조회 및 연장신청 서비스</li>
                            <li>나.보증등록 및 각종 쿠폰발행 신청시 제품관련 설문</li>
                            <li>다.온라인 수리결제 서비스</li>
                            <li>라.수리서비스 만족도관련 설문조사</li>
                            <li>마.소니아카데미 고객 세미나 서비스</li>
                            <li>바.새로운 서비스, 신상품이나 이벤트 정보 안내</li>
                            <li>사.기타 SCS가 정하는 업무</li>
                          </ul>
                        </li>
                        <li>
                          ② SCS는 재화 등의 품절 또는 기술적 사양이 변경되는 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 등의 내용을 변경할 수 있으며 이 경우 변경된 재화 등의
                          내용 및 제공일자를 명시하여 현재의 재화 등의 내용을 게시한 곳에 즉시 공시합니다.
                        </li>
                        <li>
                          ③ SCS가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 이유로 변경할 경우 그 사유를 이용자에게 통지 가능한 주소로
                          즉시 통지합니다.
                        </li>
                        <li>
                          ④ 전항의 경우 SCS는 이로 인하여 이용자가 입은 직접적인 손해를 배상합니다. 단, SCS에 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제5조 (서비스의 중단)</h5>
                      <ol>
                        <li>
                          ① SCS는 컴퓨터 등 정보통신설비의 보수, 점검, 교체 및 고장, 두절 등의 사고가 발생하는 경우에는 서비스의 제공을 일시 중단할 수 있습니다.
                        </li>
                        <li>
                          ② SCS는 전항의 사유로 서비스의 제공이 일시적으로 중단되는 경우 이용자가 SCS에 제출한 전자우편 주소로 개별 통지하거나 1주일 이상 게시판에 게시함으로써 개별
                          통지에 갈음할 수 있습니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제3장 회원</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제6조 (회원가입)</h5>
                      <ol>
                        <li>
                          ① SCS의 이용자는 다음 절차에 따라 회원가입을 신청합니다.
                          <ul>
                            <li>가.성명, 핸드폰 번호 등 회원의 개인정보를 가입양식에 따라 기입(단, i-PIN을 통한 본인인증 시 휴대전화번호 불필요)</li>
                            <li>나.본 약관 및 SCS 개인정보보호정책 동의한다는 난에 대한 클릭</li>
                          </ul>
                        </li>
                        <li>
                          ② SCS는 이용자가 제공한 개인정보에 대해 본인인증절차를 거쳐 회원가입을 승낙합니다. 본인인증을 위해 SCS가 제휴한 본인인증기관에 이용자의 개인정보(이름,
                          휴대전화번호)가 제공됩니다. (단, i-PIN을 통한 본인인증절차 시 휴대전화번호는 불필요)
                        </li>
                        <li>
                          ③ SCS는 전 ①,②항과 같이 회원가입을 신청한 이용자중 다음의 각호에 해당하지 않는 한 회원으로 등록합니다. 가. 가입신청자가 이 약관 제8조 에 의하여 이전에
                          회원자격을 상실한 적이 있는 경우 단, 회원자격 상실 후 3년이 경과한 자로서 회원재가입 승낙을 얻은 경우에는 예외로 한다. 나. 등록내용에 허위, 누락, 오기가 있는
                          경우 다. 비실명으로 가입하는 경우 또는 실명이 확인되지 않은 경우 라. 만 14세 미만의 어린이의 경우 어린이의 개인정보를 보호하고 광고성 메일에 노출되는 것을
                          방지하기 위해 만14세 미만의 아동에 대해서는 SCS회원 가입을 허락하지 않습니다. 보증기간 연장신청 등을 위해 필요하실 경우 부모님이나 법정대리인이 직접 신청해 주시기
                          바랍니다. 단, 기존에 법정대리인의 동의하에 회원에 가입한 14세 미만 어린이는 그대로 유효하게 회원자격을 유지합니다. (2004년 12월 20일 부로 개정) 마. 기타
                          회원으로 등록하는 것이 SCS의 기술상 또는 업무 수행상 현저히 지장이 있다고 판단하는 경우
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제7조 (회원정보변경)</h5>
                      <p>회원은 등록사항에 변경이 있는 경우 즉시 회원정보변경절차에 따라 직접 온라인상으로 변경사항을 수정해야 합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제8조 (회원탈퇴,자격상실 및 서비스이용제한등)</h5>
                      <ol>
                        <li>① 회원은 언제든지 탈퇴를 요청할 수 있고 SCS는 즉시 탈퇴처리를 합니다.</li>
                        <li>② 회원이 사망한 때는 회원자격을 상실합니다.</li>
                        <li>③ 회원이 다음 각 호의 사유에 해당하는 경우, 회원자격을 제한 및 정지시킬 수 있습니다.
                          <ul>
                            <li>가.가입신청시 허위의 내용을 등록한 경우</li>
                            <li>나.본인인증절차를 거치지 않은 경우</li>
                            <li>다.구입한 재화와 용역의 대금을 기한 내 지급하지 않거나 기타 회원이 부담하는 채무를 기일 내 이행하지 않은 경우</li>
                            <li>라.다른 사람의 SCS이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                            <li>마.SCS를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                          </ul>
                        </li>
                        <li>④ SCS가 회원자격을 제한,정지시킨 후 동일한 행위가 2회이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 회원자격을 상실시킬 수 있습니다.</li>
                        <li>⑤ 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를
                          부여합니다.
                        </li>
                        <li>⑥ 회사의 실명확인절차 채택 및 회원ID 통합실시 이전에 가입한 회원으로서, 회사가 보낸 실명확인절차 이행 안내 및 회원 ID 변경을 요청한 전자우편을 받고도 일정한
                          기간 내 실명확인 및 ID변경절차를 이행하지 않은 회원의 경우 당해 기간 경과 후 30일이 지나면 회원자격을 상실시킬 수 있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제9조 (회원탈퇴에 따른 개인정보보유만료)</h5>
                      <ol>
                        <li>① 회원가입을 위해 제공받은 개인정보는 회원으로서 자격이 인정되는 시점까지만 회사가 보유하며 보유기간만료 후 재생할 수 없는 방법으로 삭제됩니다. 단,
                          관련법률(전자상거래 등에서의 소비자보호에 관한 법, 상법, 법인세법 등)이 요구하는 바에 따라 회사가 보존해야 하는 경우에는 그렇지 않습니다.
                        </li>
                        <li>② 회원자격을 상실하게 되는 경우 SCS는 회원의 개인정보를 즉시 파기,삭제하며 제10조 1항의 방법으로 개별 통보합니다. 단, 전항에 의해 회사가 보존해야 하는
                          개인정보의 경우는 예외로 합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제10조 (회원에 대한 통지)</h5>
                      <ol>
                        <li>① 회원에 대한 통지를 하는 경우 회원이 SCS와 미리 약정하여 지정한 전자우편주소로 합니다.</li>
                        <li>② 단, 불특정다수의 회원에 대한 통지는 1주일이상 SCS 화면에 게시함으로써 개별통지에 대신할 수 있습니다. 단, 회원 본인의 거래에 관련하여 중대한 영향을 미치는
                          사항에 대하여는 개별통지를 합니다.
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제4장 재화등의 구매</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제11조 (구매신청)</h5>
                      <ol>
                        <li>① 이용자는 SCS에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며 SCS는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
                          단, 회원인 경우 나호내지 라호의 적용을 제외할 수 있습니다.
                          <ul>
                            <li>가.재화등의 검색 및 선택</li>
                            <li>나.성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호)등의 입력</li>
                            <li>다.약관내용, 청약철회권이 제한되는 서비스, 배송료 및 설치비등의 비용부담과 관련한 내용에 대한 확인</li>
                            <li>라.이 약관에 동의하고 위 다호의 사항을 확인하거나 거부하는 표시(예, 마우스클릭)</li>
                            <li>마.재화등의 구매신청 및 이에 관한 확인 또는 SCS의 확인에 대한 동의</li>
                            <li>바.결제방법 선택</li>
                          </ul>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제 12조 (계약의 성립)</h5>
                      <ol>
                        <li>
                          ① SCS는 이용자의 주문신청에 대해 다음 각호에 해당하면 승낙하지 않을 수 있습니다. 다만 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자
                          본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지해야 합니다.
                          <ul>
                            <li>가.신청내용에 허위, 누락, 오기가 있는 경우</li>
                            <li>나.미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화등을 구매하는 경우</li>
                            <li>다.기타 주문신청에 승낙하는 것이 SCS의 기술상 현저히 지장이 있다고 판단하는 경우</li>
                          </ul>
                        </li>
                        <li>
                          ② SCS의 승낙이 제14조 제①항의 승낙의 의사표시 및 계약내용에 관한 서면 교부 형태로 이용자에게 도달한 시점에 계약이 성립하는 것으로 봅니다.
                        </li>
                        <li>
                          ③ Sony Store의 승낙의 의사표시에는 이용자의 구매신청에 대한 확인 및 구매신청의 정정,취소등에 관한 정보등 계약내용에 관한 내용을 포함합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제13조 (지급방법)</h5>
                      <p>구매한 재화등에 대한 대급지급방법은 다음 각호의 방법중 가용한 방법으로 할 수 있습니다. 단, SCS는 이용자의 지급방법에 대하여 재화등의 대금에 어떠한 명목의 수수료도
                        추가하여 징수할 수 없습니다.</p>
                      <ul>
                        <li>
                          가.폰뱅킹, 인터넷뱅킹, 메일 뱅킹등의 각종의 계좌이체
                        </li>
                        <li>나.선불카드, 직불카드, 신용카드 등의 각종 카드 결제</li>
                        <li>다.온라인무통장입금</li>
                        <li>라.전자화폐에 의한 결제</li>
                        <li>마.수령시 대금지급</li>
                        <li>바.SCS와 계약을 맺었거나 SCS가 인정한 상품권에 의한 결제</li>
                        <li>사.기타 전자적 지급방법에 의한 대금지급 등</li>
                      </ul>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제14조 (승낙의 의사표시 및 구매신청 변경 및 취소)</h5>
                      <ol>
                        <li>① SCS는 이용자의 구매신청이 있는 경우 이용자에게 승낙의 의사표시 및 계약내용에 대한 서면 교부(이하 승낙통지라 함)를 이용자가 회원가입시 SCS 에 고지한
                          전자우편주소로 송부합니다
                        </li>
                        <li>② 승낙통지를 받은 이용자는 의사표시의 불일치등이 있는 경우에는 승낙통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 SCS는 배송전에 이용자의 요청이
                          있는 경우에는 지체없이 그 요청에 따라 처리하여야 합니다. 다만, 이미 대금을 지불한 경우에는 제17조의 청약철회 등에 관한 규정에 따릅니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제15조 (재화등의 공급)</h5>
                      <ol>
                        <li>① SCS는 이용자와 재화등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일이내에 재화등을 배송할 수 있도록 주문제작, 포장등 기타의
                          필요한 조치를 취합니다. 단, SCS가 이미 재화등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 3영업일 이내에 재화등의 공급을 위해
                          필요한 조치를 취합니다. 이때 SCS는 이용자가 재화등의 공급 절차 및 진행사항을 확인할 수 있도록 적절한 조치를 합니다.
                        </li>
                        <li>② SCS는 이용자가 구매한 재화에 대한 배송수단, 수단별 배송비용부담자, 수단별 배송기간등을 명시합니다. 만약 약정 배송기간을 초과한 경우에는 그로 인한 이용자의
                          손해를 배상하여야 합니다. 다만 SCS가 고의, 과실이 없음을 입증한 경우에는 그러하지 아니합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제16조 (환급)</h5>
                      <p>SCS는 이용자가 구매신청한 재화등이 품절등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체없이 그 사유를 이용자에게 통지하고 사전에 재화등의 대금을 받은 경우에는
                        대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제17조 (청약철회 등)</h5>
                      <ol>
                        <li>① 재화등의 구매에 관한 계약을 체결한 이용자는 승낙통지를 받은 날 또는 재화등의 공급을 받은 날부터 7일이내에는 청약의 철회를 할 수 있습니다.</li>
                        <li>② 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                          <ul>
                            <li>가.이용자에게 책임있는 사유로 재화등이 멸실 또는 훼손된 경우. (다만, 재화등의 내용을 확인하기 위해 포장등을 훼손한 경우에는 청약철회를 할 수
                              있습니다.)
                            </li>
                            <li>나.이용자의 사용 또는 일부 소비에 의해 상품의 가치가 현저히 감소한 경우</li>
                            <li>다.시간의 경과로 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우</li>
                            <li>라.복제가 가능한 재화등의 포장을 훼손한 경우</li>
                          </ul>
                        </li>
                        <li>③ 제2항 나호 내지 라호의 경우 SCS가 사전에 청약철회등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지
                          않았다면 이용자의 청약철회등이 제한되지 않습니다.
                        </li>
                        <li>④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화등의 내용이 표시,광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화등을 공급받은 날부터 3월이내,
                          그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
                        </li>
                        <li>⑤ 단, 온라인수리결제 서비스 및 소니 아카데미 유료강좌 신청의 경우 각 서비스에서 정하는 내용에 따릅니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제18조 (청약철회 등의 효과)</h5>
                      <ol>
                        <li>① SCS는 이용자로부터 재화등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화등의 대금을 환급합니다. 이 경우 SCS가 이용자에게 재화등의 환급을 지연한 때에는
                          그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
                        </li>
                        <li>② SCS는 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐등의 결제수단으로 재화등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금
                          재화등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
                        </li>
                        <li>③ 청약철회등의 경우 공급받는 재화등의 반환에 필요한 비용은 이용자가 부담합니다. SCS는 이용자에게 청약철회등을 이유로 위약금 또는 손해배상을 청구하지 않습니다.
                          다만 재화등의 내용이 표시,광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회등을 하는 경우 재화등의 반환에 필요한 비용은 SCS가 부담합니다.
                        </li>
                        <li>④ 이용자가 재화등을 제공받을 때 발송비를 부담한 경우에 SCS은 청약철회시 그 비용을 누가 부담하는지를 알기 쉽도록 명확하게 표시합니다.</li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제5장 개인정보의 보호</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제19조 (개인정보의 보호)</h5>
                      <ol>
                        <li>① SCS가 이용자의 개인식별이 가능한 개인정보를 수집하는 때에는 반드시 당해 이용자의 동의를 받습니다.</li>
                        <li>② SCS에서 재화등을 구입하고 ISP(internet secure payment) 즉 인터넷안전결제 시스템을 채택하지 않은 신용카드로 결제하는 경우, 이용자는
                          신용카드번호, 신용카드 비밀번호 2자리, 신용카드 유효기간, 휴대전화번호를 본인확인 및 신용카드 결제를 위해 입력하여야 합니다. SCS는 위 정보를 오직 이용자의
                          본인확인 및 대금결제만을 위해서 이용할 것입니다. 단, SCS은 위 정보를 이용자의 청약철회에 대비하여 1개월동안 보존하며 1개월의 보존기간 경과시 재생할 수 없는
                          방법으로 삭제합니다.
                        </li>
                        <li>③ 이용자는 본 약관과 SCS 개인정보보호정책에 동의함으로 당사의 개인정보 수집 요청에 응한 것으로 간주됩니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제20조 (개인정보에 관한 이용자의 권리)</h5>
                      <p>이용자 또는 이용자의 법정대리인(이용자가 14세 미만의 어린이일 경우)는 언제나 자신 또는 자신이 보호하는 아동의 개인정보를 열람, 정정하거나 삭제를 요청할 수 있으며,
                        이용자 또는 이용자의 법정대리인으로부터 이러한 요청을 받은 즉시 필요한 조치를 합니다. 이용자 또는 이용자의 법정대리인이 오류의 정정을 요구한 경우 그 오류를 정정할 때까지
                        당해 개인정보를 이용하지 않습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제21조 (개인정보관리책임자 등)</h5>
                      <ul>
                        <li>① SCS는 개인정보보호를 위해 관리자를 한정하며 그 수를 최소화하며 신용카드, 은행계좌등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 변조등으로 인한 이용자의
                          손해에 대하여 모든 책임을 집니다.
                        </li>
                        <li>② SCS의 개인정보보호에 관한 보다 자세한 내용은 SCS 개인정보보호정책을 참고하시기 바랍니다. 개인정보와 관련된 문의사항은 개인정보관리책임자 및 담당자에게
                          요청하시기 바랍니다.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제6장 SCS 및 이용자의 의무</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제22조 (SCS의 의무)</h5>
                      <ol>
                        <li>① SCS는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고 안정적으로 상품을 제공하는 데 최선을 다하여야
                          합니다.
                        </li>
                        <li>② SCS는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안시스템을 갖추어야 합니다.</li>
                        <li>③ SCS가 상품이나 용역에 대하여 표시, 광고의공정화에관한법률 제3조 소정의 부당한 표시,광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을
                          집니다.
                        </li>
                        <li>④ SCS는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제23조 (회원의 ID 및 비밀번호에 대한 의무)</h5>
                      <ol>
                        <li>① 제19조 내지 제22조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.</li>
                        <li>② 회원은 자신의 ID및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</li>
                        <li>③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 SCS에 통보하고 SCS의 안내가 있는 경우에는 그에 따라야
                          합니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제24조 (이용자의 의무)</h5>
                      <p>이용자는 다음의 행위를 하여서는 안됩니다.</p>
                      <ol>
                        <li>① 신청 또는 변경 시 허위내용의 등록</li>
                        <li>② 타인의 정보 도용</li>
                        <li>③ 게시된 정보의 변경</li>
                        <li>④ SCS가 정한 정보 이외의 정보(컴퓨터 프로그램 등)등의 송신 또는 게시</li>
                        <li>⑤ SCS 기타 제3자의 저작권등 지적재산권에 대한 침해</li>
                        <li>⑥ SCS 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                        <li>⑦ 외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 SCS에 공개 또는 게시하는 행위</li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">제7장 기타사항</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제25조 (보안 정책)</h5>
                      <p>SCS는 회원 정보의 보안을 위하여 안전한 128비트 암호화 알고리즘(국제적으로 공인된 Thawte의 SSL 알고리즘)을 사용합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제26조 (연결몰과 피연결몰간의 관계)</h5>
                      <ol>
                        <li>① 상위 몰과 하위 몰이 하이퍼링크(하이퍼링크의 대상에는 문자, 그림 및 동화상등이 포함됨)방식으로 연결된 경우 전자를 연결 몰(웹사이트)이라고 하고 후자를
                          피연결몰(웹사이트)이라고 합니다.
                        </li>
                        <li>② 연결 몰은 피연결 몰이 독자적으로 제공하는 재화등에 의하여 이용자와 행하는 거래에 대해서는 보증책임을 지지 않는다는 뜻을 연결 몰의 초기화면 또는 연결되는 시점의
                          팝업화면으로 명시한 경우에는 그 거래에 대한 보증책임을 지지 않습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제27조 (저작권의 귀속 및 이용제한)</h5>
                      <ol>
                        <li>① SCS가 작성한 저작물에 대한 저작권 및 기타 지적 재산권은 SCS에 귀속합니다. 단, 음악방송 및 영화관련 컨텐츠에 이용되는 저작물 등에 대하여는 다른
                          저작권자에게 저작권이 귀속되는 경우가 있습니다.
                        </li>
                        <li>② 이용자는 SCS를 이용함으로써 얻은 정보 중 SCS나 기타의 저작권자에게 지적재산권이 귀속된 정보를 SCS의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송
                          기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 해서는 안됩니다.
                        </li>
                        <li>③ SCS는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.</li>
                        <li>④ 재화등에 내장되거나 부수된 컴퓨터 프로그램의 소유권은 프로그램 저작권자의 권리로 유보됩니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제28조 (컴퓨터 및 소프트웨어 라이센스)</h5>
                      <p>재화등에 내장되거나 별도로 고객에게 제공되는 일체의 컴퓨터 프로그램은 회사가 당해 프로그램의 소유자와 적법한 라이센스계약등을 통해서 프로그램사용권을 부여 받은 것입니다.
                        이용자는 구입한 재화등의 유기적 일체로서 컴퓨터프로그램을 사용할 수 있으나 이를 별도로 분리하거나 이를 복제, 편집, 제3자에게 임대할 수 없습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제29조 (보증)</h5>
                      <ol>
                        <li>① SCS에서 구입한 재화등은 소비자피해보상규정등 소비자보호에 관한 관련법에 의해 무상수리, 교환, 환불 또는 보상을 받을 수 있습니다.</li>
                        <li>② 수리서비스의 제공과 관련하여 고객은 서비스를 제공받기 이전에 재화등의 데이터저장영역에 설치한 소프트웨어를 포함하여 저장된 모든 데이터와 데이터저장영역의 내용을
                          백업해야 하고 재화등에 부속한 테이프, CD, 디스켓, 메모리스틱등 데이터가 저장되어 있는 모든 부속물을 제거하여야 합니다. 수리서비스를 제공하는 동안 고객의 재화등의
                          데이터저장영역 내 내용이 소실되거나 재포맷 될 가능성이 많으며 회사는 수리서비스를 제공하는 동안 발생할 수 있는 재화등에 저장되거나 재화등의 부속물에 저장된 프로그램,
                          데이터, 기타 정보의 손상, 손실, 분실 및 이로 인해 발생한 손해에 대해서 책임이 없습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제30조 (분쟁해결)</h5>
                      <ol>
                        <li>① SCS는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치,운영합니다.</li>
                        <li>② SCS의 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시
                          통보해 드립니다.
                        </li>
                        <li>③ SCS와 이용자간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시,도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수
                          있습니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article01">제31조 (관할법원 및 준거법)</h5>
                      <ol>
                        <li>① SCS와 이용자간 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.
                          다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
                        </li>
                        <li>② SCS와 이용자간에 제기된 전자상거래소송에는 한국법을 적용합니다.</li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">[수리요금 온라인 결제서비스 이용약관]</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제1조 계약의 성립 및 결제</h5>
                      <ol>
                        <li>1)수리요금 온라인 결제서비스란 공식 소니 서비스 센터를 통해 수리 받으신 제품의 수리비용을 SCS 사이트를 통해 편리하게 결제 할 수 있는 서비스입니다.</li>
                        <li>2)이용자는 다음과 같은 방법으로 SCS에서 수리 요금 결제를 합니다.
                          <ul>
                            <li>가.성명, 접수번호, 전화번호 등 입력</li>
                            <li>나.A/S 진행상황 조회 및 요금 확인</li>
                            <li>다.약관내용 확인</li>
                            <li>라.위 “나”항의 약관 사항을 동의하거나 거부하는 표시 (예, 마우스클릭)</li>
                            <li>마.배송지 정보 확인</li>
                            <li>바.수리요금 카드결제</li>
                            <li>사.결제 결과 확인</li>
                          </ul>
                        </li>
                        <li>3)SCS는 이용자의 결제신청에 대해 즉시 확인메일을 보내며 이용자에게 해당 확인메일이 도달한 시점에 온라인 결제서비스 계약이 성립하는 것으로 봅니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제2조 수신확인 및 결제신청 변경 및 취소</h5>
                      <p>결제신청 확인메일을 받은 이용자는 신청내용과 일치하지 않는 내용 등이 있을 경우 즉시 신청내용 변경 또는 신청 취소를 할 수 있으며 SCS는 배송 전에 이용자의 요청이
                        있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 단, 전자상거래 등에서의 소비자보호에 관한 법률 제18조 제8항 및 제 9항에 따라 이용자의 요청에 의하여 이미
                        배송 된 경우에는 배송비 등 SCS이 사용한 비용을 이용자에게 청구할 수 있습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제3조 요금지불</h5>
                      <p>온라인 결제서비스는 신용카드를 통해 결제가 가능하며 계좌이체는 제품을 접수하신 센터로 문의하여 주시기 바랍니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제4조 배송</h5>
                      <ol>
                        <li>1)배송은 결제 확인일로부터 2~3일 소요됩니다. 공휴일 및 기타 교통 사정으로 인하여 배송이 지연될 수 있습니다.</li>
                        <li>2)제품 인도 시 제품과 함께 수리결과표를 동봉합니다.</li>
                        <li>3)SCS는 제품에 대한 배송 수단, 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 SCS 가 고의 또는 과실로 약정 배송기간을 초과한 경우에는 그로 인한
                          이용자의 손해를 배상하여야 합니다. 단, SCS의 고의 또는 과실이 없이 불가항력 또는 제 3자의 고의 또는 과실에 의하여 약정 배송기간을 초과한 경우에는 그러하지
                          아니합니다.
                        </li>
                        <li>4)배송비의 경우 택배수리 서비스 기준에 의합니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제5조 설치</h5>
                      <p>배송해드린 제품은 설치를 해드리지 않습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제6조 세금</h5>
                      <p>결제 총 금액에는 10%의 부가가치세(VAT)가 포함되어 있습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제7조 기타</h5>
                      <p>본 약관에서 정하지 않은 사항에 대해서는 SCS이용약관에 의합니다.</p>
                    </li>
                  </ul>
                </div>
                <div className="foot_cont">
                  <h4 className="Fh4_tit">[소니 아카데미 유료 강좌 이용약관]</h4>
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제1조 계약의 성립 및 결제</h5>
                      <ol>
                        <li>1)소니 아카데미 유료 강좌란 SCS가 소니정품등록자를 대상으로 Sony 제품 사용법등을 강의하는 유료강좌입니다.</li>
                        <li>2. 2)이용자는 다음과 같은 방법으로 소니 아카데미 유료강좌를 신청합니다.
                          <ul>
                            <li>가.로그인, 정품등록</li>
                            <li>나.소니아카데미 강좌 선택</li>
                            <li>다.성명, 주소, 전화번호 등 확인</li>
                            <li>라.요금 확인</li>
                            <li>마.약관에 동의한다는 표시</li>
                            <li>바.결제</li>
                          </ul>
                          <p>소니 아카데미 일정 및 내용, 결제방법에 대해서는 SCS 홈페이지상의 소니 아카데미 페이지를 참조하도록 합니다.</p>
                        </li>
                        <li>3)SCS는 이용자의 결제신청에 대해 다음 각 호에 해당하지 않는 한 승낙합니다. 가. 신청내용에 허위, 누락, 오기가 있는 경우 나. 결제 신청에 승낙하는 것이
                          SCS의 기술상 현저히 지장이 있다고 판단하는 경우
                        </li>
                        <li>4)SCS는 이용자의 결제신청에 대해 결제 확인메일을 보내며 이용자에게 결제신청 확인메일이 도달한 시점에 요금지급 계약이 성립하는 것으로 합니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제2조 요금 지불</h5>
                      <p>온라인 요금결제는 신용카드 및 무통장 입금이 가능하며 자세한 내용은 해당 사이트 https://www.sony.co.kr/scs 의 소니 아카데미를 참조해주십시오. 무통장
                        입금으로 계약을 체결한 이용자는 수신 확인의 통지를 받은 날로부터 다음날 17시 이내로 입금을 해 주어야 합니다. (토,일,공휴일은 제외)</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제3조 결제 신청의 변경, 취소</h5>
                      <p>이용자는 결제신청 확인메일을 받고 신청내용과 일치하지 않는 내용 등이 있을 경우 즉시 신청내용 변경 또는 신청 취소를 할 수 있습니다. 이용자의 신청변경 및 취소는 세미나
                        실시일로부터 2일 전 17시까지 가능하며 강좌 실시일 1일 전 또는 당일 신청의 건은 취소 할 수 없습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제4조 철회에 대한 효과</h5>
                      <p>SCS는 소니 아카데미에 지불한 대금은 취소 신청 후 영업일 3일 이내에 지급받은 재화 등의 대금을 환급합니다. (토,일,공휴일은 제외) 재화등의 환급을 지연한 때에는 그
                        지연기간에 대하여 공정거래 위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.</p>
                      <p>SCS 는 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐등의 결제수단으로 재화등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공하는 사업자로 하여금 재화
                        등의 대금의 청구를 정지 또는 취소하도록 요청합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제5조 소니아카데미 일정의 변경</h5>
                      <p>회사 사정에 의하여 소니아카데미 일정은 변경될 수 있습니다. 단, SCS는 일정 변경에 대한 공지는 소니아카데미 실시 전에 유선, 전자메일을 통해 반드시
                        공지합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit first" id="article25">제6조 세금</h5>
                      <p>결제 총 금액에는 10%의 부가가치세(VAT)가 포함되어 있습니다.</p>
                    </li>
                    <ul>
                      <li>
                        <h5 className="Fh5_tit first" id="article25">제7조 기타</h5>
                        <p>본 약관에서 정하지 않은 사항에 대해서는 SCS이용약관에 의합니다.</p>
                        <p>※ 본 약관에 대한 저작권은 소니 코리아에 귀속하며 무단 복제, 배포, 전송 기타 저작권 침해행위를 금지합니다.</p>
                        <p>※ 본 약관은 2018년 4월 16일부터 적용됩니다</p>
                      </li>
                    </ul>

                  </ul>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal3">
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
                          <col style={{width:'35%'}} />
                          <col/>
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
                    <p className="dsc">수집된 개인정보는 회원 탈퇴 및 서비스 종료 시까지 보관됩니다.<br/>단, 회원가입 후 1년 동안 이용하지 않은 고객의 개인정보는 파기됩니다.
                    </p>
                  </div>
                  <div className="caution_box">
                    개인정보 수집에 거부할 수 있으며, 거부할 경우 회원가입이 제한됩니다.
                  </div>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal4">
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>개인정보 위탁에 관한 동의</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <div className="info_box">
                    <p className="dsc type2">회사는 원활한 고객서비스 이행을 위해 아래와 같이 외부 전문 업체에 개인정보를 위탁 운영하고 있습니다. 개인정보 위탁에 대하여 거부할
                      수 있으며 거부 시 회원가입이 제한됩니다.</p>
                    <div className="layer_tbl">
                      <table>
                        <caption>수탁자, 위탁목적, 개인정보 보유 및 이용기간 목록 표</caption>
                        <colgroup>
                          <col style={{width:'33.3%'}} />
                          <col style={{width:'33.3%'}} />
                          <col />
                        </colgroup>
                        <thead>
                        <tr>
                          <th scope="col">수탁자</th>
                          <th scope="col">위탁목적</th>
                          <th scope="col">개인정보 보유 및 이용기간</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>한국코퍼레이션</td>
                          <td>상담업무</td>
                          <td>상담업무 종료 후<br />3년까지</td>
                        </tr>
                        <tr>
                          <td>LB Hunet<br />(엘비휴넷)</td>
                          <td>제품판매위탁운영</td>
                          <td>제품구매 후<br />5년까지</td>
                        </tr>
                        <tr>
                          <td>CJ대한통운(주)<br />삼영무류(주)<br />(주)한국복합물류</td>
                          <td>제품 배송 및 수거</td>
                          <td>제품배송 후<br />5년까지</td>
                        </tr>
                        <tr>
                          <td>비즈톡 주식회사</td>
                          <td>구매정보 관련 정보 발송</td>
                          <td>제품배송 후<br />5년까지</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal5">
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>이벤트 등 프로모션 알림 메일 수신</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <div className="info_box">
                    <strong className="tit">수집, 이용목적</strong>
                    <p className="dsc">마케팅 등 프로모션 이메일 및 SNS 알림</p>
                  </div>
                  <div className="info_box">
                    <strong className="tit">수집하는 개인정보 항목</strong>
                    <p className="dsc">필수 : 이메일 주소(아이디), 성명, 휴대폰번호, 생년월일</p>
                  </div>
                  <div className="info_box">
                    <strong className="tit">개인정보 보유 및 이용기간</strong>
                    <p className="dsc">수집된 개인정보는 회원 탈퇴 및 서비스 종료 시까지 보관됩니다.<br />단, 회원가입 후 1년 동안 이용하지 않은 고객의 개인정보는 파기됩니다.
                    </p>
                  </div>
                  <div className="caution_box">
                    개인정보 수집에 거부할 수 있으며, 동의를 거부할 경우<br />이에 따른 불이익은 없습니다.
                  </div>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="layer agree_layer modal6">
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>이벤트 등 프로모션 알림 SMS 수신</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <div className="info_box">
                    <strong className="tit">수집, 이용목적</strong>
                    <p className="dsc">마케팅 등 프로모션 이메일 및 SNS 알림</p>
                  </div>
                  <div className="info_box">
                    <strong className="tit">수집하는 개인정보 항목</strong>
                    <p className="dsc">필수 : 이메일 주소(아이디), 성명, 휴대폰번호, 생년월일</p>
                  </div>
                  <div className="info_box">
                    <strong className="tit">개인정보 보유 및 이용기간</strong>
                    <p className="dsc">수집된 개인정보는 회원 탈퇴 및 서비스 종료 시까지 보관됩니다.<br />단, 회원가입 후 1년 동안 이용하지 않은 고객의 개인정보는 파기됩니다.
                    </p>
                  </div>
                  <div className="caution_box">
                    개인정보 수집에 거부할 수 있으며, 동의를 거부할 경우<br />이에 따른 불이익은 없습니다.
                  </div>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기"  onClick={() => closeAgreeLayer()}>
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinAgree;
