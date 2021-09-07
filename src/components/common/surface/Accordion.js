import '../../../assets/scss/interaction/accordion.scss'
import { useRef } from 'react';

/**
 * @param prop
 * title: string
 * children: HTMLElements
 */
const Accordion = prop => {
  const { title, children } = prop;

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
        <a className="acc_btn trigger" title={title + ' 열기'} onClick={toggle}>
          <span className="acc_tit">{title}</span>
          <span className="acc_arrow">상세 보기</span>
        </a>
      </div>
      <div className={`acc_inner parentNode`}>
        <div ref={content} className="acc_box">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Accordion;
