import LayerPopup from '../../components/common/LayerPopup';

const InvoiceGuide = ({ close }) => {
  return (
    <LayerPopup
      size={'m'}
      onClose={close}
      popContClassName={'scrollH'}
    >
      <p className="pop_tit">전자 세금계산서 발행 안내</p>
      <div className="pop_cont_scroll" style={{ height: '651px' }}>
        <p className="pop_txt txt_l">2011년 1월부터 전자 세금계산서 제도를 시행하고 있습니다.<br />
          이에 따라 전자 세금계산서 발행이 의무화되었으며, <strong className="under_line">재화를 공급한 달의
            익월 8일</strong> 까지 세금계산서를 발행하도록 규정하고 있습니다. <br />
          <strong className="under_line">익월 8일 이후</strong>에 요청되는 세금계산서 발행 요청에
          대해서는 불가한 점 고객님들의 양해를 구합니다.</p>
        <div className="related_laws">
          <ul className="dot_line">
            <li>
              <p className="tit">부가가치세법 제 22조 - 제2호</p>
              <p className="desc">② 사업자가 다음 각 호의 어느 하나에 해당하는 경우에는 그 공급가액에 대하여
                100분의 1(제2호의 2에 해당하는 경우에 1천분의 5)에 해당하는 금액을 납부세액에 더하거나 환급세액에서 뺀다.
                다만, 제2호의2는 법인사업자에 대해서는 2010년 12월 31일까지 적용하지 아니하고 2011년 1월 1일부터
                2012년 12월 31일까지는 각각 1천분의3, 1천분의 1을 적용하며, 대통령령으로 정하는 개인사업자에 대해서는
                2011년 12월 31일까지 적용하지 아니하고 2012년 1월 1일부터 2013년 12월 31일까지는 각각
                1천분의3, 1천분의 1을 적용한다. (개정 2010.1, 2010.12.27)</p>
            </li>
            <li>
              <ol className="dot_depth_list">
                <li className="desc">1. 제16조에 따른 세금계산서의 발급시기를 경과하여 발급하거나 세금계산서의
                  필요적 기재사항의 전부 또는 일부가 착오 또는 과실로 적혀 있기 아니하거나 사실과 다른 경우
                </li>
                <li className="desc">2. 제16조제2항에 따라 전자세금계산서를 발급한 사업자가 재화 또는 용역의
                  공급시기가 속하는 과세기간 말의 다음 달 15일까지 국세청장에게 세금계산서 발급명세를 전송하지 아니한 경우,
                  2의2, 제16조제3항에 따른 기한이 경과한 후 재화 또는 용역의 공급시기가 속하는 과세기간 말의 다음달
                  15일까지 국세청장에게 세금계산서 발급명세를 전송하는 경우
                </li>
                <li className="desc">3. 제32조의2제3항에 따른 신용카드매출전표등을 발급받아 제18조제1항 및
                  제2항 단서 또는 제19조제1항에 따라 신고하는 때에 정부에 제출하여 매입세액을 공제받지 아니하고 대톨령령으로
                  정하는 사유로 매입세액을 공제받는 경우
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </LayerPopup>
  );
};

export default InvoiceGuide;