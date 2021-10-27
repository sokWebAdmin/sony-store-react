import '../../../assets/scss/interaction/accordion.scss'
import { useRef, useEffect } from 'react';

/**
 * @param prop
 * title: string
 * children: HTMLElements
 */
const Accordion = prop => {
  const { title, children, defaultVisible } = prop;

  const trigger = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    defaultVisible && show()
  }, [defaultVisible]);

  const toggle = () => content.current.parentNode.clientHeight === 0 ? show() : hide();

  function show () {
    const height = content.current.clientHeight;

    content.current.parentNode.style.height = `${height}px`
    trigger.current.classList.add('on')
  }

  function hide () {
    content.current.parentNode.style.height = 0
    trigger.current.classList.remove('on')
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
