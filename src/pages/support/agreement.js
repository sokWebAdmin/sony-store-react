import { React, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/support.scss"

function AgreementItem({label, index, checked, onChange}) {
    return (
         <div className="chk_cell">
             <div className="check">
                 <input type="checkbox" className="inp_check" id={`chk${index}`} checked={checked} onChange={onChange}/>
                 <label htmlFor={`chk${index}`}>{label}</label>
             </div>
             <a className="btn_view" data-modal-target="modal1" href="javascript:openModal(`modal${index + 1}`)">전체보기</a>
         </div>
    )
}

export default function Agreement() {
    const [agreementList, setAgreementList] = useState([false,false,false]);
    const labelList = ['[필수] 소니스토어 쇼핑몰 이용약관 동의', '[필수] 소니 고객지원 사이트(SCS) 이용약관 동의', '[필수] 개인정보 수집에 관한 동의']

    const onChangeAllAgreement = () => {
        setAgreementList(prevAgreementList => prevAgreementList.map(agreement => !agreement))
    }

    const onChangAgreement = (event, id) => {
       setAgreementList(agreementList => agreementList.map((agreement,index) => (index === id) ? !agreement : agreement));
    }

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />

        <div className="contents support">
        <div className="container">
            <div className="content">
                <div className="support_head">
                <h1 className="support_head_title">구매상담 안내</h1>
                <p className="support_head_desc">소니스토어에서 필요하신 상품과 연락처를 알려주시면 담당자가 친절하고 신속하게 상담해 드리겠습니다.</p>
                </div>
                <div className="login join_agree">
                <div className="agree_chk_box">
                    <div className="all_box">
                    <strong className="tit_label">약관 전체 동의</strong>
                    <div className="switchbtn">
                        <label className="switch">
                        <input type="checkbox" name="all" className="check_all" onChange={onChangeAllAgreement} checked={!agreementList.includes(false)}/>
                        <span className="toggle" />
                        </label>
                    </div>
                    </div>
                    <div className="bg_check_box">
                        {labelList.map((label, index) => (
                           <AgreementItem key={index} onChange={(e) => onChangAgreement(e, index)} checked={agreementList[index]} label={label} index={index}/>
                        ))}
                    {/*<div className="chk_cell">*/}
                    {/*    <div className="check">*/}
                    {/*    <input type="checkbox" className="inp_check" id="chk01" />*/}
                    {/*    <label htmlFor="chk01">[필수] 소니스토어 쇼핑몰 이용약관 동의</label>*/}
                    {/*    </div>*/}
                    {/*    <a href="javascript:openModal('modal1');" className="btn_view" data-modal-target="modal1">전체보기</a>*/}
                    {/*</div>*/}
                    {/*<div className="chk_cell">*/}
                    {/*    <div className="check">*/}
                    {/*    <input type="checkbox" className="inp_check" id="chk02" />*/}
                    {/*    <label htmlFor="chk02">[필수] 소니 고객지원 사이트(SCS) 이용약관 동의</label>*/}
                    {/*    </div>*/}
                    {/*    <a href="javascript:openModal('modal2');" className="btn_view">전체보기</a>*/}
                    {/*</div>*/}
                    {/*<div className="chk_cell">*/}
                    {/*    <div className="check">*/}
                    {/*    <input type="checkbox" className="inp_check" id="chk03" />*/}
                    {/*    <label htmlFor="chk03">[필수] 개인정보 수집에 관한 동의</label>*/}
                    {/*    </div>*/}
                    {/*    <a href="javascript:openModal('modal3');" className="btn_view">전체보기</a>*/}
                    {/*</div>*/}
                    </div>
                    <div className="btn_box agree full">
                    <button type="button" className="btn btn_dark">동의</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}