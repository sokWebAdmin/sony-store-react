import {
    useEffect,
    useState,
    useContext,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';

import GlobalContext from 'context/global.context';
import DatePicker from 'components/common/DatePicker';
import SelectBox from 'components/common/SelectBox';
import FindAddress from 'components/popup/FindAddress';
import PickRecentAddresses from 'components/popup/PickRecentAddresses';
import { handleChange, setObjectState } from 'utils/state';
import { getStrYMDHMSS } from 'utils/dateFormat';
import { deliveryMemos } from 'const/order';
import 'assets/scss/interaction/field.dynamic.scss';

const receiverAddressMap = {
    // from: to
    address: 'receiverAddress',
    jibunAddress: 'receiverJibunAddress',
    zipCode: 'receiverZipCd',
};

// 배송지 정보
const ShippingAddressForm = forwardRef((prop, ref) => {
    const { isLogin } = useContext(GlobalContext);

    // popup state
    const [findAddressVisible, setFindAddressVisible] = useState(false);
    const [pickRecentAddressesVisible, setPickRecentAddressesVisible] =
        useState(false);

    // components state
    const [specifyDelivery, setSpecifyDelivery] = useState(false); // bool
    const [specifyDeliveryDate, setSpecifyDeliveryDate] = useState(
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    ); // Date
    const [deliveryMemoVisible, setDeliveryMemoVisible] = useState(false); // Date
    const [deliveryMemo, setDeliveryMemo] = useState(''); // Date
    // object

    useEffect(
        () =>
            specifyDelivery
                ? handleShippingChangeParameter(
                      'requestShippingDate',
                      getStrYMDHMSS(specifyDeliveryDate)?.substr(0, 10),
                  )
                : handleShippingChangeParameter('requestShippingDate', null),
        [specifyDeliveryDate, specifyDelivery],
    );

    // addressNo, countryCd, addressName, receiverName, receiverZipCd,
    // receiverAddress, receiverDetailAddress, receiverJibunAddress,
    // receiverContact1, receiverContact2, customsIdNumber, deliveryMemo
    const { shipping, setShipping, orderer, recentAddresses } = prop;

    const receiverName = useRef();
    const receiverContact1 = useRef();
    const receiverZipCd = useRef();
    const receiverDetailAddress = useRef();

    useEffect(() => setSameAsOrderer(false), [orderer]);

    const bindReceiverAddress = (selectedAddress) => {
        if (!selectedAddress) {
            return;
        }

        Object.entries(receiverAddressMap).forEach(([from, to]) =>
            setObjectState(to, selectedAddress[from])(setShipping),
        );

        receiverDetailAddress.current.focus();
    };

    const ordererMap = {
        receiverName: orderer.ordererName,
        receiverContact1: orderer.ordererContact1,
    };

    const deliveryMemoFixedList = deliveryMemos;

    const handleShippingChange = (event) => {
        if (!event?.target) {
            return;
        }

        const { name } = event.target;
        const noSame = ['receiverName', 'receiverContact1'].some(
            (v) => v === name,
        );
        if (noSame) {
            setSameAsOrderer(false);
        }

        if (event.target.value.trim()) {
            event.target.parentNode.classList.remove('error');
        }
        handleChange(event)(setShipping);

        if (name === 'deliveryMemo') {
            handleShippingChangeParameter('deliveryMemo', event.target.value);
            setDeliveryMemo(event.target.value);
        }
    };

    function handleShippingChangeParameter(key, value) {
        setObjectState(key, value)(setShipping);
    }

    const [sameAsOrderer, setSameAsOrderer] = useState(false);

    useEffect(() => {
        if (sameAsOrderer) {
            Object.entries(ordererMap).forEach(([key, value]) =>
                handleShippingChangeParameter(key, value),
            );
        } else {
            handleShippingChangeParameter('receiverName', '');
            handleShippingChangeParameter('receiverContact1', '');
        }
    }, [sameAsOrderer]);

    useImperativeHandle(ref, () => ({
        fieldValidation() {
            const refs = {
                receiverName,
                receiverContact1,
                receiverZipCd,
                receiverDetailAddress,
            };

            const emptyRef = Object.entries(refs).find(
                ([k]) => !shipping[k],
            )?.[1];
            if (!emptyRef) {
                return true;
            }

            attachError(emptyRef);
            return false;
        },
        sameAsOrderer,
    }));

    function attachError(ref) {
        const el = ref.current;
        el.parentNode.classList.add('error');
        el.focus();
    }
    const onChangeDate = (date) => setSpecifyDeliveryDate(date);

    return (
        <>
            {isLogin && (
                <div className='acc_form'>
                    <div className='acc_cell'>
                        <label htmlFor='delivery_choice'>배송지 선택</label>
                    </div>
                    <div className='acc_cell'>
                        <div className='acc_group parent'>
                            <div className='acc_inp type4'>
                                <p className='delivery_txt'>
                                    {shipping.addressName
                                        ? shipping.addressName
                                        : '배송지를 선택하세요.'}
                                </p>
                                <div className='delivery_btn_box'>
                                    <button
                                        className='button button_negative button-s popup_comm_btn'
                                        type='button'
                                        data-popup-name='shipping_addr'
                                        onClick={() =>
                                            setPickRecentAddressesVisible(true)
                                        }
                                    >
                                        최근 배송지
                                    </button>
                                    {pickRecentAddressesVisible && (
                                        <PickRecentAddresses
                                            shipping={shipping}
                                            setShipping={setShipping}
                                            recentAddresses={recentAddresses}
                                            close={() =>
                                                setPickRecentAddressesVisible(
                                                    false,
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='acc_form'>
                <div className='acc_cell vat'>
                    <label htmlFor='user_name2'>
                        수령인 이름
                        <i className='necessary' />
                    </label>
                </div>
                <div className='acc_cell'>
                    <div className='acc_group parent'>
                        <div className='acc_inp type3'>
                            <input
                                type='text'
                                className='inp'
                                id='user_name2'
                                placeholder='이름을 입력하세요.'
                                name='receiverName'
                                ref={receiverName}
                                value={shipping.receiverName || ''}
                                onChange={handleShippingChange}
                            />
                            <span className='focus_bg' />
                            <p className='error_txt'>
                                <span className='ico' />
                                이름을 입력해 주세요.
                            </p>
                        </div>
                    </div>
                    <div className='check email_check'>
                        <input
                            type='checkbox'
                            className='inp_check'
                            id='chkSame'
                            checked={sameAsOrderer}
                            onChange={(evt) =>
                                setSameAsOrderer(evt.target.checked)
                            }
                        />
                        <label htmlFor='chkSame'>주문자 정보와 동일</label>
                    </div>
                </div>
            </div>
            <div className='acc_form'>
                <div className='acc_cell vat'>
                    <label htmlFor='user_number2'>
                        휴대폰 번호
                        <i className='necessary' />
                    </label>
                </div>
                <div className='acc_cell'>
                    <div className='acc_group parent'>
                        <div className='acc_inp type5'>
                            <input
                                type='text'
                                className='inp'
                                id='user_number2'
                                name='receiverContact1'
                                ref={receiverContact1}
                                value={shipping.receiverContact1 || ''}
                                onChange={handleShippingChange}
                            />
                            <span className='focus_bg' />
                            <p className='error_txt'>
                                <span className='ico' />
                                휴대폰 번호를 입력해주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='acc_form'>
                <div className='acc_cell vat'>
                    <label htmlFor='user_address'>
                        주소
                        <i className='necessary' />
                    </label>
                </div>
                <div className='acc_cell'>
                    <div className='acc_group parent'>
                        <div className='acc_inp type4'>
                            <input
                                type='text'
                                className='inp dynamic_input'
                                id='user_address'
                                placeholder='주소를 입력하세요.'
                                name='receiverZipCd'
                                ref={receiverZipCd}
                                value={shipping.receiverZipCd || ''}
                                onChange={handleShippingChange}
                                readOnly
                            />
                            <span className='focus_bg' />
                            <div className='delivery_btn_box type1'>
                                <button
                                    onClick={() => {
                                        setFindAddressVisible(true);
                                        receiverZipCd.current.parentNode.classList.remove(
                                            'error',
                                        );
                                    }}
                                    className='button button_negative button-s'
                                    type='button'
                                >
                                    우편번호 검색
                                </button>
                                {findAddressVisible && (
                                    <FindAddress
                                        setVisible={setFindAddressVisible}
                                        setAddress={bindReceiverAddress}
                                    />
                                )}
                            </div>
                            <p className='error_txt'>
                                <span className='ico' />
                                배송 받으실 주소를 입력해 주세요.
                            </p>
                        </div>
                    </div>
                    <div className='acc_group parent'>
                        <div className='acc_inp type5'>
                            <input
                                type='text'
                                className='inp dynamic_input'
                                name='receiverAddress'
                                value={shipping.receiverAddress || ''}
                                onChange={handleShippingChange}
                                readOnly
                            />
                            <span className='focus_bg' />
                        </div>
                    </div>
                    <div className='acc_group parent'>
                        <div className='acc_inp type5'>
                            <input
                                type='text'
                                className='inp'
                                placeholder='상세 주소를 입력하세요.'
                                name='receiverDetailAddress'
                                ref={receiverDetailAddress}
                                value={shipping.receiverDetailAddress || ''}
                                onChange={handleShippingChange}
                            />
                            <span className='focus_bg' />
                            <p className='error_txt'>
                                <span className='ico' />
                                상세 주소를 입력해 주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='acc_form'>
                <div className='acc_cell vat'>
                    <label htmlFor='delivery_request'>배송 요청 사항</label>
                </div>
                <div className='acc_cell'>
                    <div className='acc_group parent'>
                        <div className='acc_inp type3'>
                            <SelectBox
                                defaultInfo={{
                                    type: 'dropdown',
                                    placeholder:
                                        '택배 기사님께 요청하실 내용을 선택하세요.',
                                }}
                                selectOptions={deliveryMemoFixedList}
                                selectOption={({ optionNo, label }) => {
                                    if (optionNo !== 1) {
                                        handleShippingChangeParameter(
                                            'deliveryMemo',
                                            label,
                                        );
                                        setDeliveryMemo('');
                                    } else {
                                        handleShippingChangeParameter(
                                            'deliveryMemo',
                                            '',
                                        );
                                    }
                                    optionNo === 8
                                        ? setDeliveryMemoVisible(true)
                                        : setDeliveryMemoVisible(false);
                                }}
                            />
                        </div>
                    </div>
                    <div className='acc_group parent'>
                        <div className='acc_inp type3'>
                            <input
                                type='text'
                                className='inp'
                                placeholder='배송 메모를 입력하세요.'
                                value={deliveryMemo}
                                name='deliveryMemo'
                                onChange={handleShippingChange}
                                disabled={deliveryMemoVisible !== true}
                            />
                            <span className='focus_bg' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='acc_form' style={{ height: '423px' }}>
                <div className='acc_cell vat'>
                    <label htmlFor='delivery_choice'>배송일 선택</label>
                </div>
                <div className='acc_cell vat'>
                    <div className='acc_group parent'>
                        <div className='acc_inp'>
                            <div className='acc_radio'>
                                <div className='radio_box'>
                                    <input
                                        type='radio'
                                        className='inp_radio'
                                        id='delivery_radio1'
                                        name='deliveryRadio'
                                        checked={!specifyDelivery}
                                        onChange={() =>
                                            setSpecifyDelivery(false)
                                        }
                                    />
                                    <label
                                        htmlFor='delivery_radio1'
                                        className='contentType'
                                    >
                                        정상 배송
                                    </label>
                                </div>
                                <div className='radio_box'>
                                    <input
                                        type='radio'
                                        className='inp_radio'
                                        id='delivery_radio2'
                                        value='specify'
                                        checked={specifyDelivery}
                                        onChange={() =>
                                            setSpecifyDelivery(true)
                                        }
                                        name='deliveryRadio'
                                    />
                                    <label
                                        htmlFor='delivery_radio2'
                                        className='contentType'
                                    >
                                        출고일 지정
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='acc_group'>
                        <div className='acc_inp'>
                            <DatePicker
                                style={{
                                    display: specifyDelivery ? 'block' : 'none',
                                }}
                                disabled={!specifyDelivery}
                                bindDate={onChangeDate}
                                dateValue={specifyDeliveryDate}
                                option={{
                                    selectableRanges: [
                                        [
                                            new Date(
                                                Date.now() +
                                                    1000 * 60 * 60 * 24 * 3,
                                            ),
                                            new Date(2999, 11, 31),
                                        ],
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <ul className='list_dot'>
                        <li>정상 배송이 제일 빠른 배송입니다.</li>
                        <li>
                            출고일 지정 배송의 경우 주문 날짜의 3일 후부터
                            선택이 가능하며,
                            <br />
                            지정된 출고일에 맞춰서 제품이 발송되고, 출고일 기준
                            2~3일 이내 수령이 가능합니다.
                        </li>
                        <li>소니스토어의 모든 제품은 무료 배송 입니다.</li>
                        <li>
                            배송기간은 서울, 경기일 경우 2~3일(주문일 포함),
                            기타 지역은 3~5일 정도 걸립니다.
                            <br />
                            (정오(낮12시) 이전 결제완료 기준)
                        </li>
                        <li>
                            단, 지역 및 교통 사정에 따라 배송이 지연되는 경우가
                            발생할 수 있습니다.
                        </li>
                        <li>
                            일요일, 공휴일은 배송되지 않습니다. (예:토요일 주문
                            시 월요일에 접수되어 화요일 이후 배송)
                        </li>
                        <li>예약판매는 별도의 배송 일정을 따릅니다.</li>
                    </ul>
                </div>
            </div>
        </>
    );
});

ShippingAddressForm.displayName = 'ShippingAddressForm';

export default ShippingAddressForm;
