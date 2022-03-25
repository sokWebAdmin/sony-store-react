import {
    useState,
    useEffect,
    useContext,
    createRef,
    useMemo,
    Fragment,
    useCallback,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';

import Notification from 'components/products/Notification';
import Alert from 'components/common/Alert';
import SectionMap from 'components/event/SectionMap';
import GlobalContext from 'context/global.context';
import { ERROR_CODE_MAPPING_ROUTE, forGradeTags } from 'utils/constants';
import { postCart, postOrderSheets } from 'api/order';
import { getProductOptions } from 'api/product';
import { useAlert, useMediaQuery } from 'hooks';
import { SUCCESS } from 'const/httpStatus';

const EventProducts = ({
    event,
    filterLabel,
    grade,
    gift = false,
    sectionImage = false,
}) => {
    const filterProductsByGrade = useCallback(
        (event, isGrade) =>
            event?.section
                .flatMap(({ products }) => products)
                ?.filter(({ hsCode }) => isGrade === !!hsCode),
        [],
    );

    const { isLogin } = useContext(GlobalContext);

    const history = useHistory();
    const onlyMo = useMediaQuery('(max-width: 640px)');

    const isMemberGrade = useMemo(() => {
        const splitPathname = history.location.pathname.split('/');
        return forGradeTags.includes(splitPathname[splitPathname.length - 2]);
    }, [history.location.pathname]);
    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

    const [section, setSection] = useState(
        filterProductsByGrade(event, isMemberGrade),
    );
    const [giftVisible, setGiftVisible] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
    const [orderProductNo, setOrderProductNo] = useState(null);
    const [cartNotify, setCartNotify] = useState(false);

    // hsValidation
    const hsValidator = createRef(null);
    const hsValidation = useCallback(
        async (validation) => await hsValidator.current.validation(validation),
        [hsValidator],
    );

    const getOrderSheetNo = useCallback(async (productNo, selectedOption) => {
        try {
            const { data } = await postOrderSheets({
                productCoupons: null,
                trackingKey: null,
                cartNos: null,
                channelType: null,
                products: selectedOption.map((p) => ({
                    channelType: null,
                    orderCnt: p.buyCnt,
                    optionInputs: null,
                    optionNo: p.optionNo,
                    productNo: p.productNo,
                })),
            });
            return data;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const getHistoryInfo = useCallback(
        (pathname) => ({
            pathname,
            state: { next: history.location.pathname },
        }),
        [history.location.pathname],
    );

    const _getOrderSheetNo = useCallback(
        async (productNo = orderProductNo, pathname = '/order/sheet') => {
            try {
                const { data } = await getProductOptions(productNo);
                const result = await getOrderSheetNo(productNo, [
                    { ...data.flatOptions[0], buyCnt: 1, productNo },
                ]);

                if (result?.code) {
                    ERROR_CODE_MAPPING_ROUTE[result.code]?.msg
                        ? openAlert(
                              ERROR_CODE_MAPPING_ROUTE[result.code]?.msg,
                              () => () =>
                                  history.push(
                                      getHistoryInfo(
                                          ERROR_CODE_MAPPING_ROUTE[result.code]
                                              ?.route,
                                      ),
                                  ),
                          )
                        : openAlert(result?.message);
                } else {
                    history.push({
                        pathname,
                        search: '?' + qs.stringify(result),
                    });
                }
            } catch (e) {
                e?.message && openAlert(e.message);
            }
        },
        [getHistoryInfo, history, openAlert, orderProductNo, getOrderSheetNo],
    );

    // 주문하기
    const order = useCallback(
        async (productNo, pathname = '/order/sheet') => {
            if (!isLogin) {
                const GUEST_ERROR = 'O8001';
                openAlert(
                    ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.msg,
                    () => () =>
                        history.push(
                            getHistoryInfo(
                                ERROR_CODE_MAPPING_ROUTE[GUEST_ERROR]?.route,
                            ),
                        ),
                );
                return;
            }

            _getOrderSheetNo(productNo, pathname);
        },
        [_getOrderSheetNo, getHistoryInfo, history, isLogin, openAlert],
    );

    // 바로구매
    const goOrder = useCallback(
        async (productNo, hsCode) => {
            const succeed = await hsValidation(!!hsCode);
            if (!succeed) return;

            if (isLogin) {
                _getOrderSheetNo(productNo);
                return;
            }

            setOrderProductNo(productNo);
            setOrderVisible(true);
        },
        [_getOrderSheetNo, hsValidation, isLogin],
    );

    // 장바구니 담기
    const addToCart = useCallback(async (productNo) => {
        const { data } = await getProductOptions(productNo);

        const { status } = await postCart([
            {
                productNo: productNo,
                optionNo: data.flatOptions[0].optionNo,
                orderCnt: 1,
                channelType: null,
                optionInputs: [
                    {
                        inputLabel: data.flatOptions[0].label,
                        inputValue: data.flatOptions[0].value,
                    },
                ],
            },
        ]);

        if (status === SUCCESS) {
            setCartNotify(true);
        } else {
            alert('장바구니 담기에 실패하였습니다.');
        }
    }, []);

    // 선물하기
    const giftProduct = useCallback(
        (productNo) => {
            isLogin ? order(productNo, '/gift/sheet') : setGiftVisible(true);
        },
        [isLogin, order],
    );

    useEffect(() => {
        if (!filterLabel || filterLabel === '전체') {
            setSection(filterProductsByGrade(event, isMemberGrade));
            return;
        }
        const newSection = event.section
            .find(({ label }) => label === filterLabel)
            .products?.filter(({ hsCode }) => isMemberGrade === !!hsCode);
        newSection && setSection(newSection);
    }, [filterLabel, event, isMemberGrade, filterProductsByGrade]);

    useEffect(() => {
        if (!grade) return;

        const newSection =
            !filterLabel || filterLabel === '전체'
                ? filterProductsByGrade(event, isMemberGrade)
                : event.section
                      .find(({ label }) => label === filterLabel)
                      .products?.filter(
                          ({ hsCode }) => isMemberGrade === !!hsCode,
                      );
        if (grade === '전체') {
            newSection && setSection(newSection);
            return;
        }
        const newGradeSection = newSection.filter(
            ({ stickerLabels }) =>
                stickerLabels.length > 0 && stickerLabels[0] === grade,
        );
        newGradeSection && setSection(newGradeSection);
    }, [grade, filterLabel, event, isMemberGrade, filterProductsByGrade]);

    return (
        <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            {giftVisible && (
                <Notification
                    setNotificationVisible={setGiftVisible}
                    type='gift'
                />
            )}
            {orderVisible && (
                <Notification
                    setNotificationVisible={setOrderVisible}
                    type='order'
                    unusableIcon={true}
                    goOrder={_getOrderSheetNo}
                    popupType='popCont'
                />
            )}
            {cartNotify && (
                <Notification
                    setNotificationVisible={setCartNotify}
                    type='cart'
                />
            )}
            {sectionImage ? (
                event.section.map(({ imageUrl, products }, index) => {
                    return (
                        <Fragment key={`${products.productNo}-${index}`}>
                            {imageUrl && (
                                <SectionImage onlyMo={onlyMo}>
                                    <img
                                        src={imageUrl}
                                        alt=''
                                        style={{ width: '100%' }}
                                    />
                                </SectionImage>
                            )}

                            <div className='event_tablist type1'>
                                <div className='employee_prd'>
                                    <div className='event_prd_list'>
                                        {products.length > 0 &&
                                            products.map((product) => {
                                                return (
                                                    <SectionMap
                                                        product={product}
                                                        gift={gift}
                                                        giftProduct={
                                                            giftProduct
                                                        }
                                                        addToCart={addToCart}
                                                        hsValidator={
                                                            hsValidator
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                    {index === event.section.length - 1 && (
                                        <div className='button_wrap'>
                                            <Link
                                                to='/event/list'
                                                className='button button_positive'
                                            >
                                                목록
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    );
                })
            ) : (
                <div className='event_tablist type1'>
                    <div className='employee_prd'>
                        <div className='event_prd_list'>
                            {section.length > 0 &&
                                section.map((v) => {
                                    return (
                                        <SectionMap
                                            product={v}
                                            gift={gift}
                                            giftProduct={giftProduct}
                                            addToCart={addToCart}
                                            hsValidator={hsValidator}
                                        />
                                    );
                                })}
                        </div>
                        <div className='button_wrap'>
                            <Link
                                to='/event/list'
                                className='button button_positive'
                            >
                                목록
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const SectionImage = styled.div`
    position: relative;
    max-width: ${({ onlyMo }) => (onlyMo ? '760px' : '1200px')};
    margin: 0 auto;
    padding-top: 40px;
`;

export default EventProducts;
