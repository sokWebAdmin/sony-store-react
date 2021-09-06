import '../../../assets/scss/interaction/accordion.scss'
import { useRef } from 'react';

const Accordion = prop => {
  const trigger = useRef(null)
  const content = useRef(null)

  const toggle = () => {
    const triggerNode = trigger.current
    const contentNode = content.current
    const contentParentNode = contentNode.parentNode;
    const height = contentNode.clientHeight;
    const isVisible = contentParentNode.clientHeight !== 0;

    if (isVisible) {
      contentParentNode.style.height = 0
      triggerNode.classList.remove('on')
      return;
    }

    contentParentNode.style.height = `${height}px`
    triggerNode.classList.add('on')
  }

  return (
    <div className="acc_item" ref={trigger}>
      <div className="acc_head">
        <a className="acc_btn trigger" title="주문자 정보 열기" onClick={toggle}>
          <span className="acc_tit">주문자 정보</span>
          <span className="acc_arrow">상세 보기</span>
        </a>
      </div>
      <div className={`acc_inner parentNode`}>
        <div ref={content} className="acc_box">
          <p className="acc_dsc_top">표시는 필수입력 정보</p>
          <div className="acc_form">
            <div className="acc_cell vat">
              <label htmlFor="user_name">이름<i
                className="necessary" /></label>
            </div>
            <div className="acc_cell">
              <div
                className="acc_group parent error">{/* error 문구 제어 */}
                <div className="acc_inp type3">
                  <input type="text" className="inp"
                         id="user_name"
                         placeholder="이름을 입력하세요."
                         defaultValue="김소니" />
                  <span className="focus_bg" />
                </div>
                <p className="error_txt"><span
                  className="ico" />이름을 입력해 주세요.</p>
              </div>
            </div>
          </div>
          <div className="acc_form">
            <div className="acc_cell vat">
              <label htmlFor="user_email">이메일<i
                className="necessary" /></label>
            </div>
            <div className="acc_cell">
              <div
                className="acc_group parent error">{/* error 문구 제어 */}
                <div className="acc_inp type3">
                  <input type="text" className="inp"
                         id="user_email"
                         placeholder="이메일 아이디 (예 : sony@sony.co.kr)"
                         defaultValue="sony@sony.co.kr" />
                  <span className="focus_bg" />
                </div>
                <p className="error_txt"><span
                  className="ico" />이메일 아이디를 입력해 주세요.</p>
              </div>
            </div>
          </div>
          <div className="acc_form">
            <div className="acc_cell vat">
              <label htmlFor="user_number">휴대폰 번호<i
                className="necessary" /></label>
            </div>
            <div className="acc_cell">
              <div
                className="acc_group parent error">{/* error 문구 제어 */}
                <div className="acc_inp type3">
                  <input type="text" className="inp"
                         id="user_number"
                         defaultValue={'01099999999'} />
                  <span className="focus_bg" />
                </div>
                <p className="error_txt"><span
                  className="ico" />휴대폰 번호를 입력해 주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Accordion;
