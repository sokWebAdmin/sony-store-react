import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import GlobalContext from 'context/global.context';
import {
    fetchMyProfile,
    setProfile,
    useProileDispatch,
} from 'context/profile.context';
import SEOHelmet from 'components/SEOHelmet';
import Alert from 'components/common/Alert';
import { registerApi } from 'api/sony/member';
import { loginApi, sendSMS, verifySMS } from 'api/auth';
import { getProfile } from 'api/member';
import { emptyCheck, timeFormat } from 'utils/utils';
import { getUrlParam } from 'utils/location';
import { getItem, KEY, setAccessToken } from 'utils/token';
import { getAgent } from 'utils/detectAgent';
import { CLIENT_ID } from 'utils/constants';
import 'assets/scss/contents.scss';

export default function JoinStep() {
    const { onChangeGlobal, isLogin } = useContext(GlobalContext);
    const profileDispatch = useProileDispatch();

    const history = useHistory();
    const location = useLocation();

    const [isPwVisible, setPwVisible] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    //state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('2');
    const [phone, setPhone] = useState('');
    const [authSent, setAuthSent] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [authCheck, setAuthCheck] = useState(false);

    //validation
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isConfirm, setIsConfirm] = useState(true);
    const [isName, setIsName] = useState(true);
    const [isBirthday, setIsBirthday] = useState(true);
    const [isPhone, setIsPhone] = useState(true);

    const [authAvailable, setAuthAvailable] = useState(false);

    //wrongType
    const [pwWrongType, setPwWrongType] = useState('');
    const [confirmWrongType, setConfirmWrongType] = useState('');
    const [birthdayWrongType, setBirthdayWrongType] = useState('');
    const [phoneWrongType, setPhoneWrongType] = useState('');

    //timer
    const [time, setTime] = useState(179);
    const [expireAt, setExpireAt] = useState('');

    // alert
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCloseFunc, setAlertCloseFun] = useState(null);

    const openAlert = (message, onClose) => {
        setAlertVisible(true);
        setAlertMessage(message);
        setAlertCloseFun(onClose);
    };

    const closeModal = () => {
        setAlertVisible(false);
        alertCloseFunc?.();
    };

    const getSnsInfo = () => {
        const provider = getItem(KEY.OPENID_PROVIDER);

        if (!provider || getUrlParam('sns') !== 'true') return null;
        return provider.substring(0, 1).toUpperCase();
    };

    const checkMail = (e) => {
        if (emptyCheck(e.trim())) {
            setIsEmail(false);
            return true;
        } else {
            //email check
            if (
                e.match(
                    /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g,
                )
            ) {
                setIsEmail(true);
            } else {
                setIsEmail(false);
                return true;
            }
        }
    };

    const checkMatchPwd = (e) => {
        if (!location.state?.email) {
            //비밀번호
            if (emptyCheck(e.trim())) {
                setPwWrongType(1);
                setIsPassword(false);
                return true;
            } else {
                const patternNumber = /[0-9]/g;
                const patternEnglish = /[a-zA-Z]/g;
                const patternSpecial =
                    /[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]/g;

                const checkNumber = patternNumber.test(password) ? 1 : 0;
                const checkEnglish = patternEnglish.test(password) ? 1 : 0;
                const checkSpecial = patternSpecial.test(password) ? 1 : 0;
                const checkSum = checkNumber + checkEnglish + checkSpecial;
                if (checkSum === 3 && e.length >= 12) {
                    setIsPassword(true);
                } else {
                    setPwWrongType(2);
                    setIsPassword(false);
                    return true;
                }
            }
        }
    };

    const onEmailChange = (e) => setEmail(e.target.value);

    const onPasswordChange = (e) => setPassword(e.target.value);

    const onPasswordConfirmChange = (e) => setConfirm(e.target.value);

    const onNameChange = (e) => {
        const value = e.target.value.toString();
        const name = value.replace(/[^a-zA-Zㄱ-힣]/g, '');
        setName(name);
    };

    const onBirthdayChange = (e) => {
        const value = e.target.value.toString();
        const birthday = value.replace(/[^0-9]/g, '');
        setBirthday(birthday);
    };

    const onPhoneChange = (e) => {
        const value = e.target.value.toString();
        const phoneNo = value.replace(/[^0-9]/g, '');
        setPhone(phoneNo);
    };

    const onEmailBlur = (e) => {
        if (e.target.value.length > 0) {
            checkMail(e.target.value);
        } else {
            setIsEmail(true);
        }
    };

    const onPasswordBlur = (e) => {
        if (e.target.value.length > 0) {
            checkMatchPwd(e.target.value);

            if (confirm.length > 0) {
                checkMatchConfirmPwd(e.target.value, confirm);
            }
        } else {
            setIsPassword(true);
        }
    };

    const onPasswordConfirmBlur = (e) => {
        if (e.target.value.length > 0) {
            checkMatchConfirmPwd(password, e.target.value);
        } else {
            setIsConfirm(true);
        }
    };

    const onPasswordVisibleClick = () => setPwVisible((prev) => !prev);

    const onPasswordConfirmVisibleClick = () =>
        setConfirmVisible((prev) => !prev);

    const checkMatchConfirmPwd = (e, c) => {
        //비밀번호 확인
        if (e.trim() === c.trim()) {
            setIsConfirm(true);
        } else {
            setConfirmWrongType(2);
            setIsConfirm(false);
            return true;
        }
    };

    const onChangeGender = (e) => setGender(e.target.value);

    const onSubmit = async () => {
        await _registerApi();
    };

    const _registerApi = async () => {
        //이메일
        if (checkMail(email)) {
            return;
        }

        //패스워드
        if (checkMatchPwd(password)) {
            return;
        }

        if (checkMatchConfirmPwd(password, confirm)) {
            return;
        }

        //이름
        if (emptyCheck(name.trim())) {
            setIsName(false);
            return;
        } else {
            setIsName(true);
        }

        //생년월일
        if (emptyCheck(birthday.trim())) {
            setBirthdayWrongType(1);
            setIsBirthday(false);
            return;
        } else {
            if (
                birthday.match(
                    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
                )
            ) {
                setIsBirthday(true);
            } else {
                setBirthdayWrongType(2);
                setIsBirthday(false);
                return;
            }
        }

        //휴대폰 번호
        if (emptyCheck(phone)) {
            setPhoneWrongType(1);
            setIsPhone(false);
            return;
        } else {
            if (phone.match(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g)) {
                setIsPhone(true);
            } else {
                setPhoneWrongType(2);
                setIsPhone(false);
                return;
            }
        }

        //authCheck
        if (authCheck !== true) {
            openAlert('휴대폰 인증을 해주세요.');
            return;
        }

        //final
        const data = {
            customerid: email,
            custcategory: '01',
            gender,
            firstname: name,
            mobile: phone
                .replace(/[^0-9]/g, '')
                .replace(
                    /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
                    '$1-$2-$3',
                )
                .replace('--', '-'),
            birthday: birthday,
            email: email,
            viasite: 'SonyStyle',
            sms: getUrlParam('sms') === 'true' ? 'Y' : 'N',
            mobileflag: 'N',
            servicesite: {
                news: getUrlParam('email') === 'true' ? 'Y' : 'N',
                snsinfo: getSnsInfo() ?? null,
            },
            password: password,
        };

        const response = await registerApi(data);
        if (response.status === 200) {
            if (response.data.errorCode === '0000') {
                //성공
                openAlert('회원가입이 완료되었습니다.', () => async () => {
                    const provider = getItem(KEY.OPENID_PROVIDER);
                    const response = await loginApi(
                        email,
                        !provider || getUrlParam('sns') !== 'true'
                            ? password
                            : CLIENT_ID[provider],
                    );
                    if (response.status === 200) {
                        const { accessToken, expireIn } = response.data;
                        setAccessToken(accessToken, expireIn);
                        onChangeGlobal({ isLogin: true });
                        const profile = await getProfile();
                        const data = {
                            type: '30',
                            customerid: profile.data.memberId,
                        };
                        setProfile(profileDispatch, profile.data);
                        await fetchMyProfile(profileDispatch, data);

                        const agent = getAgent();
                        if (agent.isApp) {
                            window.location = `sonyapp://autoLoginYn?value=N&customerid=${profile.data.memberId}`;
                        }
                        history.replace('/');
                    } else {
                        const errorMessage = response.data?.message
                            ? JSON.parse(response.data.message).errorMessage
                            : '';
                        alert(errorMessage);
                        window.location.replace('/member/login');
                    }
                });
            } else {
                openAlert(response.data.errorMessage);
            }
        }
    };

    const _sendSMS = async (phoneNum) => {
        const response = await sendSMS(phoneNum, 'JOIN');
        if (response.status === 200) {
            //발송성공
            setAuthSent(true);
        } else {
            openAlert(response.data.message);
        }
    };

    const _verifySMS = async (phoneNum, code) => {
        const response = await verifySMS(phoneNum, code, 'JOIN');
        if (response.status === 200) {
            //인증성공
            setAuthCheck(true);
            openAlert('인증되었습니다.');
        } else {
            openAlert(response.data.message);
        }
    };

    useEffect(() => {
        if (phone.match(/^\d{2,3}\d{3,4}\d{4}$/)) {
            setAuthAvailable(true);
        } else {
            setAuthAvailable(false);
        }
    }, [phone]);

    useEffect(() => {
        if (authSent === true) {
            if (time > 0) {
                const Counter = setInterval(() => {
                    const gap = Math.floor(
                        (new Date(expireAt).getTime() - new Date().getTime()) /
                            1000,
                    );
                    setTime(gap);
                }, 1000);
                return () => clearInterval(Counter);
            }
        }
    }, [expireAt, time, authSent]);

    useEffect(() => {
        if (!location.state?.agree) {
            history.push('/member/join-agree');
        }
        if (isLogin) {
            history.push('/');
            return;
        }
        const redirectedProvider = getItem(KEY.OPENID_PROVIDER);
        const redirectedToken = getItem(KEY.OPENID_TOKEN);
        if (redirectedProvider && redirectedToken) {
            setEmail(location.state?.email);
        }
    }, []);

    return (
        <>
            <SEOHelmet title={'소니코리아 회원가입'} />
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            <div className='contents'>
                <div className='container' id='container'>
                    <div className='login join_step'>
                        <h2 className='login__title'>회원가입</h2>
                        <p className='login__desc'>
                            소니코리아 통합 웹회원 정책 상 공식적으로{' '}
                            <strong>
                                만 14세 미만의 경우 회원가입이 불가합니다.
                            </strong>
                        </p>
                        <div className='join_inp_box'>
                            <div
                                className={`group ${
                                    isEmail === false && 'error'
                                }`}
                            >
                                <div className='inp_box'>
                                    <label
                                        className='inp_desc'
                                        htmlFor='loginName'
                                    >
                                        <input
                                            type='text'
                                            id='loginName'
                                            className='inp'
                                            placeholder=' '
                                            autoComplete='off'
                                            readOnly={location.state?.email}
                                            onBlur={onEmailBlur}
                                            value={email}
                                            name='email'
                                            onChange={onEmailChange}
                                        />
                                        <span className='label'>
                                            이메일 아이디
                                            <span>(예 : sony@sony.co.kr)</span>
                                        </span>
                                        <span className='focus_bg' />
                                    </label>
                                </div>
                                <div className='error_txt'>
                                    <span className='ico' />
                                    이메일 아이디를 입력해 주세요.
                                </div>
                            </div>
                            {!location.state?.email && (
                                <>
                                    <div
                                        className={`group ${
                                            isPassword === false && 'error'
                                        }`}
                                    >
                                        <div className='inp_box password_box'>
                                            <label
                                                className='inp_desc'
                                                htmlFor='loginPw1'
                                            >
                                                <input
                                                    type={
                                                        isPwVisible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    id='loginPw1'
                                                    className='inp'
                                                    placeholder=' '
                                                    autoComplete='off'
                                                    value={password}
                                                    onBlur={onPasswordBlur}
                                                    onChange={onPasswordChange}
                                                />
                                                <span className='label'>
                                                    비밀번호
                                                    <span>
                                                        (대/소문자, 숫자,
                                                        특수문자 3종 포함
                                                        12~15자리 미만)
                                                    </span>
                                                </span>
                                                <span className='focus_bg' />
                                                <div className='eyes'>
                                                    <button
                                                        type='button'
                                                        title='비밀번호 숨김'
                                                        onClick={
                                                            onPasswordVisibleClick
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
                                            {pwWrongType == 1
                                                ? '비밀번호를 입력해 주세요.'
                                                : '비밀번호 형식이 맞지 않습니다.'}
                                        </div>
                                    </div>
                                    <div
                                        className={`group ${
                                            isConfirm === false && 'error'
                                        }`}
                                    >
                                        <div className='inp_box password_box'>
                                            <label
                                                className='inp_desc'
                                                htmlFor='loginPw2'
                                            >
                                                <input
                                                    type={`${
                                                        isConfirmVisible ===
                                                        true
                                                            ? 'text'
                                                            : 'password'
                                                    }`}
                                                    id='loginPw2'
                                                    className='inp'
                                                    placeholder=' '
                                                    autoComplete='off'
                                                    value={confirm}
                                                    onBlur={
                                                        onPasswordConfirmBlur
                                                    }
                                                    onChange={
                                                        onPasswordConfirmChange
                                                    }
                                                />
                                                <span className='label'>
                                                    비밀번호 확인
                                                </span>
                                                <span className='focus_bg' />
                                                <div className='eyes'>
                                                    <button
                                                        type='button'
                                                        title='비밀번호 숨김'
                                                        onClick={
                                                            onPasswordConfirmVisibleClick
                                                        }
                                                    >
                                                        <i
                                                            className={
                                                                isConfirmVisible
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
                                            {confirmWrongType == 1
                                                ? '비밀번호를 재입력 해주세요.'
                                                : '입력하신 비밀번호가 일치하지 않습니다.'}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className='rowgroup'>
                                <div
                                    className={`group ${
                                        isName === false && 'error'
                                    }`}
                                >
                                    <div className='inp_box'>
                                        <label
                                            className='inp_desc'
                                            htmlFor='username'
                                        >
                                            <input
                                                type='text'
                                                id='username'
                                                className='inp'
                                                placeholder=' '
                                                autoComplete='off'
                                                value={name}
                                                onChange={onNameChange}
                                            />
                                            <span className='label'>
                                                이름
                                                <span>
                                                    (띄어쓰기 없이 입력하세요.)
                                                </span>
                                            </span>
                                            <span className='focus_bg' />
                                        </label>
                                    </div>
                                    <div className='error_txt'>
                                        <span className='ico' />
                                        이름을 입력해 주세요.
                                    </div>
                                </div>
                                <div
                                    className={`group ${
                                        isBirthday === false && 'error'
                                    }`}
                                >
                                    <div className='inp_box'>
                                        <label
                                            className='inp_desc'
                                            htmlFor='userbirth'
                                        >
                                            <input
                                                type='text'
                                                id='userbirth'
                                                className='inp'
                                                placeholder=' '
                                                value={birthday}
                                                onChange={onBirthdayChange}
                                            />
                                            <span className='label'>
                                                생년월일
                                                <span>(예 : 20210307)</span>
                                            </span>
                                            <span className='focus_bg' />
                                        </label>
                                    </div>
                                    <div className='error_txt'>
                                        <span className='ico' />
                                        {birthdayWrongType == 1
                                            ? '생년월일을 입력해주세요.'
                                            : '생년월일 형식이 맞지 않습니다.'}
                                    </div>
                                </div>
                            </div>
                            <div className='gender'>
                                <div className='gender_inner'>
                                    <strong className='gender_tit'>성별</strong>
                                    <div className='gender_radio'>
                                        <div className='radio_box'>
                                            <input
                                                type='radio'
                                                className='inp_radio'
                                                id='tab1'
                                                name='genderradio'
                                                value='2'
                                                checked={gender === '2'}
                                                onChange={onChangeGender}
                                            />
                                            <label
                                                htmlFor='tab1'
                                                className='contentType'
                                            >
                                                여성
                                            </label>
                                        </div>
                                        <div className='radio_box'>
                                            <input
                                                type='radio'
                                                className='inp_radio'
                                                id='tab2'
                                                name='genderradio'
                                                value='1'
                                                checked={gender === '1'}
                                                onChange={onChangeGender}
                                            />
                                            <label
                                                htmlFor='tab2'
                                                className='contentType'
                                            >
                                                남성
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='error_txt'>
                                    <span className='ico'></span>성별을 선택해
                                    주세요.
                                </div>
                            </div>
                            <div
                                className={`group btn_type ${
                                    isPhone === false && 'error'
                                }`}
                            >
                                <div className='inp_box'>
                                    <label
                                        className='inp_desc'
                                        htmlFor='phonenumber'
                                    >
                                        <input
                                            type='text'
                                            id='phonenumber'
                                            className='inp'
                                            placeholder=' '
                                            autoComplete='off'
                                            value={phone}
                                            onChange={onPhoneChange}
                                            readOnly={authSent ? true : false}
                                        />
                                        <span className='label'>
                                            휴대폰 번호
                                            <span>(-없이 입력하세요.)</span>
                                        </span>
                                        <span className='focus_bg' />
                                    </label>
                                    <div className='btn_box'>
                                        {authSent && authCheck == false ? (
                                            <button
                                                type='button'
                                                className={`btn btn_default`}
                                                onClick={() => {
                                                    if (
                                                        authAvailable === true
                                                    ) {
                                                        //유효기간 설정
                                                        let now =
                                                            new Date().getTime();
                                                        const target = new Date(
                                                            now + 3 * 60000,
                                                        );
                                                        setTime(179);
                                                        setExpireAt(target);

                                                        //인증번호 발송
                                                        _sendSMS(phone);
                                                    }
                                                }}
                                            >
                                                재전송
                                            </button>
                                        ) : (
                                            <button
                                                type='button'
                                                className={`btn ${
                                                    authAvailable == true &&
                                                    authCheck == false
                                                        ? 'btn_primary'
                                                        : 'btn_disable'
                                                }`}
                                                onClick={() => {
                                                    if (
                                                        authAvailable === true
                                                    ) {
                                                        //유효기간 설정
                                                        let now =
                                                            new Date().getTime();
                                                        const target = new Date(
                                                            now + 3 * 60000,
                                                        );
                                                        setTime(179);
                                                        setExpireAt(target);

                                                        //인증번호 발송
                                                        _sendSMS(phone);
                                                    }
                                                }}
                                            >
                                                인증번호
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='error_txt'>
                                    <span className='ico' />
                                    {phoneWrongType == 1
                                        ? '휴대폰 번호를 입력해주세요.'
                                        : '휴대폰 번호 형식이 맞지 않습니다.'}
                                </div>
                            </div>
                            {authSent === true && (
                                <div className='group btn_type'>
                                    <div className='inp_box'>
                                        <label
                                            className='inp_desc'
                                            htmlFor='certifynumber'
                                        >
                                            <input
                                                type='text'
                                                id='certifynumber'
                                                className='inp'
                                                placeholder=' '
                                                autoComplete='off'
                                                value={authCode}
                                                onChange={(e) => {
                                                    setAuthCode(e.target.value);
                                                }}
                                                readOnly={
                                                    authCheck ? true : false
                                                }
                                            />
                                            <span className='label'>
                                                인증번호
                                            </span>
                                            {authCheck === false && (
                                                <span
                                                    className='timer'
                                                    id='timer'
                                                >
                                                    {timeFormat(time)}
                                                </span>
                                            )}
                                            <span className='focus_bg' />
                                        </label>
                                        <div className='btn_box'>
                                            <button
                                                type='button'
                                                className={`btn ${
                                                    authCheck !== true
                                                        ? 'btn_primary'
                                                        : 'btn_disable'
                                                }`}
                                                onClick={() => {
                                                    if (authCheck !== true) {
                                                        if (time == 0) {
                                                            openAlert(
                                                                '인증시간이 만료되었습니다. 재전송 후 인증해주세요.',
                                                            );
                                                        } else {
                                                            if (
                                                                authCode === ''
                                                            ) {
                                                                openAlert(
                                                                    '인증번호를 입력해주세요.',
                                                                );
                                                                return;
                                                            }
                                                            _verifySMS(
                                                                phone,
                                                                authCode,
                                                                'JOIN',
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                인증
                                            </button>
                                        </div>
                                    </div>
                                    <div className='certify_txt'>
                                        ※ 입력하신 번호로 인증번호가
                                        전송되었습니다.
                                    </div>
                                </div>
                            )}

                            <div className='btn_box full'>
                                <button
                                    type='button'
                                    className='btn btn_dark'
                                    onClick={onSubmit}
                                >
                                    가입 완료
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
