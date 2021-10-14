import { useState, useRef, useEffect } from 'react';

import LayerPopup from '../../components/common/LayerPopup';
import { handleChange } from '../../utils/state';
import { postInvoice, getInvoice } from '../../api/sony/order';

import '../../assets/scss/partials/popup/invoice.scss';

const InvoicePublish = ({ basketid, close }) => {
  const [processDone, setProcessDone] = useState(false);
  const [formData, setFormData] = useState({
    regnum: '',
    company: '',
    president: '',
    address: '',
    kind: '',
    item: '',
  });
  const [postedData, setPostedData] = useState(null);

  // fields. validation 시 focus 필요
  const regnum = useRef();
  const company = useRef();
  const president = useRef();
  const address = useRef();
  const kind = useRef();
  const item = useRef();

  useEffect(() => {
    fetchPostedData.then(setFormData);
  }, []);

  const onChangeInput = event => {
    const el = event.target;

    if (el.value.trim()) {
      el.parentNode.querySelector('.error_txt').style.display = 'none';
    }
    handleChange(event)(setFormData);
  };

  const submit = evt => {
    evt.preventDefault();

    if (!fieldValidation()) {
      return;
    }

    post().then(fetchPostedData).then(setPostedData);
  };

  async function post () {
    const request = {
      basketid,
      ...formData,
    };
    try {
      await postInvoice(request);
      setProcessDone(true);
    }
    catch (err) {
      console.error(err);
    }
  }

  async function fetchPostedData () {
    try {
      const res = await getInvoice(basketid);
      if (res?.data?.body) {
        return res.data.body
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  function fieldValidation () {
    const refs = {
      regnum,
      company,
      president,
      address,
      kind,
      item,
    };

    const emptyRef = Object.entries(refs).find(([k]) => !formData[k])?.[1];
    if (!emptyRef) {
      return true;
    }

    attachError(emptyRef);
    return false;
  }

  function attachError (ref) {
    const el = ref.current;
    el.parentNode.querySelector('.error_txt').style.display = 'block';
    el.focus();
  }

  return (
    <LayerPopup
      size={'m'}
      onClose={close}
      popContClassName={'scrollH'}
    >
      <p className="pop_tit">전자 세금계산서 신청</p>
      <div className="pop_cont_scroll tax_invoice2" style={{ height: '651px' }}>
        {!processDone ?
          <>
            <form onSubmit={submit}>
              <div className="form_zone">
                <div className="input_item">
                <span className="input_tit"><label htmlFor="corp_num"
                                                   className="tit">사업자등록번호</label></span>
                  <span className="input_box">
                  <input type="text" id="corp_num" className="input"
                         placeholder="사업자 등록 번호를 입력하세요. ( - 포함 등록)"
                         name="regnum"
                         value={formData.regnum} ref={regnum}
                         onChange={onChangeInput} />
                  <span className="focus_bg"></span>
                   <p className="error_txt"><span
                     className="ico" />사업자 등록 번호를 입력하세요.</p>
                </span>
                </div>
                <div className="input_item">
                <span className="input_tit"><label htmlFor="corp_group"
                                                   className="tit">법인명(단체명)</label></span>
                  <span className="input_box">
                  <input type="text" id="corp_group" className="input"
                         placeholder="법인(단체)명을 입력하세요." name="company"
                         value={formData.company} ref={company}
                         onChange={onChangeInput} />
                  <span className="focus_bg"></span>
                  <p className="error_txt"><span
                    className="ico" />법인명(단체명)을 입력하세요.</p>
                </span>
                </div>
                <div className="input_item">
                <span className="input_tit"><label htmlFor="corp_name"
                                                   className="tit">대표자명</label></span>
                  <span className="input_box">
                  <input type="text" id="corp_name" className="input"
                         placeholder="대표자 이름을 입력하세요." name="president"
                         value={formData.president} ref={president}
                         onChange={onChangeInput} />
                  <span className="focus_bg"></span>
                  <p className="error_txt"><span
                    className="ico" />대표자명 입력하세요.</p>
                </span>
                </div>
                <div className="input_item">
                <span className="input_tit"><label htmlFor="corp_addr"
                                                   className="tit">사업장 소재지</label></span>
                  <span className="input_box">
                  <input type="text" id="corp_addr" className="input"
                         placeholder="사업장 소재지를 입력하세요. (ex : 서울)" name="address"
                         value={formData.address} ref={address}
                         onChange={onChangeInput} />
                  <span className="focus_bg"></span>
                  <p className="error_txt"><span
                    className="ico" />사업장 소재지를 입력하세요.</p>
                </span>
                </div>
                <div className="input_item col">
                <span className="input_tit"><span
                  className="tit">사업의 종류</span></span>
                  <div className="input_col_type">
                  <span className="input_col">
                    <span className="input_tit"><label htmlFor="corp_type1"
                                                       className="tit">업태</label></span>
                    <span className="input_box">
                      <input type="text" id="corp_type1" className="input"
                             placeholder="(ex : 도매, 소매, 서비스)" name="kind"
                             value={formData.kind} ref={kind}
                             onChange={onChangeInput} />
                      <span className="focus_bg"></span>
                      <p className="error_txt"><span
                        className="ico" />업태를 입력하세요.</p>
                    </span>
                  </span>
                    <span className="input_col">
                    <span className="input_tit"><label htmlFor="corp_type2"
                                                       className="tit">종목</label></span>
                    <span className="input_box">
                      <input type="text" id="corp_type2" className="input"
                             placeholder="(ex : 무역, 통신판매)" name="item"
                             value={formData.item} ref={item}
                             onChange={onChangeInput} />
                     <span className="focus_bg"></span>
                      <p className="error_txt"><span
                        className="ico" />종목을 입력하세요.</p>
                    </span>
                  </span>
                  </div>
                </div>
              </div>
              <div className="btn_article">
                <button className="button button_positive button-m"
                        type="submit">전자
                  세금계산서 신청하기
                </button>
              </div>
            </form>
            <div className="related_laws">
              <ul className="dot_line">
                <li>
                  <p className="tit">부가가치세법 제 22조 - 제2호</p>
                  <p className="desc">② 사업자가 다음 각 호의 어느 하나에 해당하는 경우에는 그 공급가액에
                    대하여
                    100분의 1(제2호의 2에 해당하는 경우에 1천분의 5)에 해당하는 금액을 납부세액에 더하거나 환급세액에서
                    뺀다.
                    다만, 제2호의2는 법인사업자에 대해서는 2010년 12월 31일까지 적용하지 아니하고 2011년 1월
                    1일부터
                    2012년 12월 31일까지는 각각 1천분의3, 1천분의 1을 적용하며, 대통령령으로 정하는 개인사업자에
                    대해서는
                    2011년 12월 31일까지 적용하지 아니하고 2012년 1월 1일부터 2013년 12월 31일까지는 각각
                    1천분의3, 1천분의 1을 적용한다. (개정 2010.1, 2010.12.27)</p>
                </li>
                <li>
                  <ol>
                    <li className="desc">1. 제16조에 따른 세금계산서의 발급시기를 경과하여 발급하거나
                      세금계산서의
                      필요적 기재사항의 전부 또는 일부가 착오 또는 과실로 적혀 있기 아니하거나 사실과 다른 경우
                    </li>
                    <li className="desc">2. 제16조제2항에 따라 전자세금계산서를 발급한 사업자가 재화 또는
                      용역의
                      공급시기가 속하는 과세기간 말의 다음 달 15일까지 국세청장에게 세금계산서 발급명세를 전송하지 아니한
                      경우,
                      2의2, 제16조제3항에 따른 기한이 경과한 후 재화 또는 용역의 공급시기가 속하는 과세기간 말의 다음달
                      15일까지 국세청장에게 세금계산서 발급명세를 전송하는 경우
                    </li>
                    <li className="desc">3. 제32조의2제3항에 따른 신용카드매출전표등을 발급받아
                      제18조제1항
                      및
                      제2항 단서 또는 제19조제1항에 따라 신고하는 때에 정부에 제출하여 매입세액을 공제받지 아니하고
                      대톨령령으로
                      정하는 사유로 매입세액을 공제받는 경우
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </>
          :
          <>
            <div className="pop_txt">
              <p className="pop_tit_s" style={{ marginBottom: '1em' }}>세금계산서 신청
                완료</p>
              <p style={{ marginBottom: '1em' }}>세금계산서의 내용이 정확하게 입력되었는지 다시 한번 더
                확인해 주시기 바랍니다.</p>
              <p>잘못 입력한 사항에 대해서는 변경버튼을 클릭 후 각 항목에 대해서 다시 수정 후 신청해 주시기 바랍니다.</p>
            </div>
            <div className="invoice_result">
              <dl>
                <dt>법인명(단체명)</dt>
                <dd>{postedData.company}</dd>
              </dl>
              <dl>
                <dt>대표자명</dt>
                <dd>{postedData.president}</dd>
              </dl>
              <dl>
                <dt>사업장 소재지</dt>
                <dd>{postedData.address}</dd>
              </dl>
              <dl>
                <dt>사업의 종류</dt>
                <dd>
                  업태 : {postedData.kind} / 종목 : {postedData.item}
                </dd>
              </dl>
            </div>
            <div className="btn_article">
              <button className="button button_positive button-m"
                      onClick={() => setProcessDone(false)}>
                신청정보 변경
              </button>
            </div>
          </>
        }
      </div>
    </LayerPopup>
  );
};

export default InvoicePublish;