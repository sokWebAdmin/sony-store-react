import React from 'react';

// stylesheet
import '../../assets/scss/contents.scss';

export default function PurchaseConsultingNotice({ setVisible }) {
    const closeModal = () => setVisible(false);

    return (
        <div
            className='layer agree_layer modal_pop'
            style={{ display: 'block' }}
        >
            <div className='layer_wrap'>
                <div className='layer_container'>
                    <div className='layer_title'>
                        <h1>기업 구매 시 유의사항</h1>
                    </div>
                    <div className='layer_content'>
                        <div className='scroll_inner'>
                            <div className='foot_cont'>
                                <ul>
                                    <li>
                                        <h5 className='Fh5_tit first'>
                                            사용용도
                                        </h5>
                                        <p>
                                            소니코리아 본사와 대량구매 진행 시
                                            사용 용도에 대한 명확한 확인 및
                                            증빙자료의 제출이 필요할 수 있으며
                                            용도 외 사용은 엄격히 제한됩니다.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className='Fh5_tit first'>
                                            할인율 및 최소 수량
                                        </h5>
                                        <p>
                                            주문 수량에 따른 할인율은 담당자에게
                                            문의 바랍니다.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className='Fh5_tit first'>결제</h5>
                                        <p>
                                            지불은 현금 또는 카드 결제가
                                            가능합니다. 후불 결제는 불가하며 선
                                            결제 확인 후 출고가 진행됩니다.
                                            세금계산서는 현금결제 후 고객 요청
                                            발행 가능합니다.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className='Fh5_tit first'>
                                            배송 및 소요시간
                                        </h5>
                                        <p>
                                            협의된 지정 배송일에 지정 배송지로
                                            택배 발송됩니다. 배송까지의
                                            소요시간은 주문 수량과 물류 센터
                                            상황에 따라 달라질 수 있습니다.
                                            <br />
                                            대량 주문의 경우 최소 1주일 전
                                            주문을 권해 드리며 견적 요청 시 희망
                                            납품일을 알려주시면 가능 여부를 답변
                                            드리겠습니다.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className='Fh5_tit first'>교환</h5>
                                        <p>
                                            제품의 하자나 배송 중 파손 제품에
                                            대해 배송 받은 박스 송장과 제품 사진
                                            자료 확인 후 교환 처리가 가능합니다.
                                            <br />
                                            고객 변심 등의 기타 이유로는 반품 및
                                            교환이 불가합니다.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className='layer_close close'
                            title='팝업창 닫기'
                        >
                            <span>팝업창 닫기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
