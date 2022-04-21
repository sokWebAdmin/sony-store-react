import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import {
    resetProfile,
    useProfileState,
    useProileDispatch,
} from 'context/profile.context';
import GlobalContext from 'context/global.context';
import SEOHelmet from 'components/SEOHelmet';
import SelectBox from 'components/common/SelectBox';
import OpenLogin from 'components/member/OpenLogin';
import Alert from 'components/common/Alert';
import LayerPopup from 'components/common/LayerPopup';
import { withdrawalMember } from 'api/sony/member';
import { getProfileOrdersSummaryStatus } from 'api/order';
import { toCurrencyString } from 'utils/unit';
import {
    getItem,
    KEY,
    removeAccessToken,
    removeItem,
    setItem,
} from 'utils/token';
import { getAgent } from 'utils/detectAgent';
import { useAlert } from 'hooks';
import { withdrawalReasons } from 'const/mypage';
import 'assets/scss/contents.scss';
import 'assets/scss/mypage.scss';

export default function Withdraw() {
    const history = useHistory();
    const { onChangeGlobal } = useContext(GlobalContext);
    const { profile, my } = useProfileState();
    const profileDispatch = useProileDispatch();

    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
    const {
        openAlert: openConfirm,
        closeModal: closeConfirm,
        alertVisible: confirmVisible,
    } = useAlert();
    const [isPwVisible, setPwVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [withdrawReason, setWithdrawReason] = useState(null);
    const [verifyOpenId, setVerifyOpenId] = useState(false);

    const availablemileage = useMemo(() => {
        return my?.availablemileage ?? 0;
    }, [my]);

    const validateWithdraw = async () => {
        if (!withdrawReason) {
            openAlert('탈퇴사유를 선택해주세요.');
            return;
        }

        // TODO: 기본 검색 기간은 3개월이지만 정확히 명시, 탈퇴전 주문 확인 기간 확인 필요
        const orderSummary = await getProfileOrdersSummaryStatus({
            params: {
                startYmd: dayjs().subtract('3', 'months').format('YYYY-MM-DD'),
                endYmd: dayjs().format('YYYY-MM-DD'),
            },
        });

        if (orderSummary.status !== 200) {
            openAlert('잠시 후 다시 시도해 주세요.');
            return;
        }
        const {
            deliveryIngCnt,
            deliveryPrepareCnt,
            payDoneCnt,
            cancelProcessingCnt,
            exchangeProcessingCnt,
            returnProcessingCnt,
        } = orderSummary;
        const hasOrder =
            deliveryIngCnt > 0 || deliveryPrepareCnt > 0 || payDoneCnt > 0;
        const hasClaim =
            cancelProcessingCnt > 0 ||
            exchangeProcessingCnt > 0 ||
            returnProcessingCnt > 0;
        const hasProcessOrder = hasOrder || hasClaim;
        if (hasProcessOrder) {
            openAlert(
                '진행중인 주문이 있어서 주문진행 완료 후 탈퇴가 가능합니다.',
            );
            return;
        }
        if (!password) {
            openAlert('비밀번호를 입력해주세요.');
            return;
        }

        openConfirm();
    };

    const onClickWithdraw = async () => {
        const provider = getItem(KEY.OPENID_PROVIDER);
        const checkWithdraw = await withdrawalMember({
            customerid: profile?.memberId ?? profile?.email,
            withdrawreason: withdrawReason.optionNo,
            password: provider && verifyOpenId ? '' : password,
        });
        if (checkWithdraw.data.errorCode === '0000') {
            removeAccessToken();
            onChangeGlobal({ isLogin: false });
            resetProfile(profileDispatch);
            history.push('/my-page/withdraw-complete');
        } else if (checkWithdraw.data.errorCode === '3008') {
            openAlert('회원탈퇴 시 입력한 사용자 정보가 다릅니다.');
        } else if (checkWithdraw.data.errorCode === '3400') {
            openAlert('인증에 실패하였습니다.');
        } else if (checkWithdraw.data.errorCode === '9999') {
            openAlert('비정상적인 오류가 발생하였습니다.');
        } else {
            openAlert(checkWithdraw.data.errorMessage);
        }
    };

    const withdrawCallback = (errorCode) => {
        window.shopOauthCallback = null;

        if (errorCode === '0000') {
            setVerifyOpenId(true);
            const agent = getAgent();
            const openIdReason = agent.isApp
                ? getItem('withdrawReason')
                : withdrawReason;
            setWithdrawReason(openIdReason);
            removeItem('openIdReason');
            if (!openIdReason) {
                openAlert('탈퇴사유를 선택해주세요.');
                return;
            }
            openConfirm();
        } else {
            setVerifyOpenId(false);
        }
    };

    useEffect(() => {
        setItem('currentPath', window.location.pathname);
    }, []);

    return (
        <>
            <SEOHelmet title={'마이페이지 : 회원 탈퇴'} />
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            {confirmVisible && (
                <LayerPopup
                    onClose={closeConfirm}
                    size='ms'
                    className='withdraw_pop'
                >
                    <p className='pop_tit'>정말 탈퇴하시겠습니까?</p>
                    <div className='point_box'>
                        <dl>
                            <dt>사용가능한 마일리지</dt>
                            <dd>{toCurrencyString(availablemileage)}</dd>
                        </dl>
                    </div>
                    <p className='pop_txt'>
                        회원 탈퇴 시 보유하신 멤버십 마일리지(소니스토어)와
                        정품등록 정보(소니코리아 고객지원 사이트)는 자동
                        삭제됩니다.
                    </p>
                    <p className='pop_txt'>
                        탈퇴하신 이후에는 마일리지 복구가 불가능하며, SIPS회원일
                        경우 SIPS회원에서도 탈퇴됩니다.
                    </p>
                    <div className='btn_article'>
                        <button
                            className='button button_negative button-m closed'
                            type='button'
                            onClick={closeConfirm}
                        >
                            취소
                        </button>
                        <button
                            className='button button_positive button-m'
                            type='button'
                            onClick={() => onClickWithdraw()}
                        >
                            회원탈퇴
                        </button>
                    </div>
                </LayerPopup>
            )}
            <div className='contents mypage'>
                <div className='container' id='container'>
                    <div className='content'>
                        <div className='common_head'>
                            <Link to={'/my-page'} className='common_head_back'>
                                마이페이지
                            </Link>
                            <div className='common_head_name'>회원탈퇴</div>
                        </div>
                        <div className='withdraw_wrap'>
                            <div className='member_idbox'>
                                {profile?.memberId ?? ''}
                            </div>
                            <p className='txt_primary'>
                                개인정보, 쿠폰 정보, 보유하신 마일리지, 정품등록
                                정보 등 회원 탈퇴 시 삭제됩니다.
                                <br />
                                SNS 계정으로 가입하신 회원님은 하단에 가입하신
                                SNS로 인증하신 후 탈퇴 사유를 선택해주세요.
                            </p>
                            <form>
                                <div className='withdraw_box'>
                                    <div className='group'>
                                        <div className='inp_box password_box'>
                                            <label
                                                className='inp_desc'
                                                htmlFor='popPw'
                                            >
                                                <input
                                                    type={
                                                        isPwVisible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    id='popPw'
                                                    className='inp center'
                                                    placeholder=''
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <span className='label'>
                                                    비밀번호
                                                </span>
                                                <span className='focus_bg' />
                                                <div className='eyes'>
                                                    <button
                                                        type='button'
                                                        title='비밀번호 숨김'
                                                        onClick={() =>
                                                            setPwVisible(
                                                                !isPwVisible,
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className={
                                                                isPwVisible
                                                                    ? 'ico_eyes_open'
                                                                    : 'ico ico_eyes'
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            </label>
                                        </div>
                                        <div className='error_txt'>
                                            <span className='ico' />
                                            현재 비밀번호가 올바르지 않습니다.
                                        </div>
                                    </div>
                                    <div className='select_ui_zone btm_line'>
                                        <SelectBox
                                            defaultInfo={{
                                                type: 'dropdown',
                                                placeholder:
                                                    '탈퇴사유를 선택해주세요.',
                                            }}
                                            selectOptions={withdrawalReasons}
                                            selectOption={(option) => {
                                                setWithdrawReason(option);
                                                setItem(
                                                    'withdrawReason',
                                                    option,
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className='btn_article'>
                                        <button
                                            className='button button_positive popup_comm_btn button-full'
                                            type='button'
                                            onClick={() => validateWithdraw()}
                                        >
                                            회원탈퇴
                                        </button>
                                    </div>
                                    <div className='info_withdraw'>
                                        <strong className='info_title'>
                                            [안내]
                                        </strong>
                                        <ul className='list_dot'>
                                            <li>
                                                소니코리아 고객지원 사이트와
                                                소니스토어는 하나의 이메일 ID와
                                                비밀번호로 운영됩니다.
                                            </li>
                                            <li>
                                                <strong>
                                                    회원 탈퇴 신청 시
                                                    "소니코리아 고객지원
                                                    사이트와 소니스토어" 모두
                                                    탈퇴처리됩니다.
                                                </strong>
                                            </li>
                                            <li>
                                                고객님의 소중한 의견을 참고하여,
                                                보다 나은 소니코리아가 될 수
                                                있도록 하겠습니다.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='sns_certify'>
                                        <OpenLogin
                                            message='SNS 계정으로 회원 인증'
                                            title='SNS 계정으로 가입하신 회원님은 비밀번호 입력 대신 SNS 계정을 인증해 주셔야 탈퇴가 가능합니다.'
                                            type='withdraw'
                                            customCallback={withdrawCallback}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
