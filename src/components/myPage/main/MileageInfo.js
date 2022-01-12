import React, { useState, useMemo, useEffect, useCallback } from 'react';

import MileageList from 'components/myPage/main/MileageList';
import DateBox from 'components/myPage/DateBox';
import { getMileageHistories } from 'api/sony/mileage';
import { toCurrencyString } from 'utils/unit';
import { getStrDate } from 'utils/dateFormat';

const MileageInfo = ({ availablemileage, totalExpireMileage, profile }) => {
    const [pageIdx, setPageIdx] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [list, setList] = useState([]);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    const changeDateTime = (startDate, endDate) => {
        const strDate = (date) => getStrDate(date).replace(/\-/g, '');

        setStartDateTime(strDate(startDate));
        setEndDateTime(strDate(endDate));

        return { start: strDate(startDate), end: strDate(endDate) };
    };

    const fetchMH = useCallback(
        async (startDateTime, endDateTime, pageIdx) => {
            const request = {
                customerid: profile.memberId,
                rowsPerPage: 10,
                pageIdx,
                startDateTime,
                endDateTime,
            };
            const { data } = await getMileageHistories(request);
            return data;
        },
        [profile.memberId],
    );

    const hasMore = useMemo(
        () => totalCount > list.length * pageIdx,
        [totalCount, list, pageIdx],
    );

    const search = useCallback(
        async ({ startDate, endDate, more }) => {
            const { start, end } = changeDateTime(startDate, endDate);

            if (!more) {
                setPageIdx(1);
            }
            const data = await fetchMH(start, end, pageIdx);
            const newList = data.body;
            more ? setList((prev) => [...prev, ...newList]) : setList(newList);
            setTotalCount(data.paginationInfo.totalCount);
        },
        [fetchMH, pageIdx],
    );

    const more = () => setPageIdx(pageIdx + 1);

    useEffect(() => {
        if (pageIdx !== 1) {
            search({
                startDate: startDateTime,
                endDate: endDateTime,
                more: true,
            });
        }
    }, [pageIdx, search, startDateTime, endDateTime]);

    return (
        <div className='cont history_mileage'>
            <h3 className='cont_tit' id='mileage-tit'>
                마일리지
            </h3>
            <div className='history_inner'>
                <div className='my_mileage'>
                    <p className='txt'>
                        {`사용 가능 `}
                        <span className='mileage_val'>
                            {toCurrencyString(availablemileage)}
                        </span>
                        <span className='extinction'>
                            (
                            <strong className='val_txt'>
                                <span className='val'>
                                    {totalExpireMileage}
                                </span>
                                M
                            </strong>
                            {` 당월 소멸 예정`})
                        </span>
                    </p>
                </div>
                <div className='mileage_inquiry'>
                    <DateBox
                        search={search}
                        firstSearch={true}
                        style={{ paddingBottom: '24px' }}
                    />
                    <div className='history_list'>
                        {list.length > 0 ? (
                            <div className='col_table_wrap mileage_table on'>
                                {/* 데이터가 있는 경우 class : on */}
                                <div className='col_table'>
                                    <div className='col_table_head'>
                                        <div className='col_table_row'>
                                            <div className='col_table_cell'>
                                                날짜
                                            </div>
                                            <div className='col_table_cell'>
                                                내역
                                            </div>
                                            <div className='col_table_cell'>
                                                주문번호
                                            </div>
                                            <div className='col_table_cell'>
                                                마일리지
                                            </div>
                                            <div className='col_table_cell'>
                                                유효기간
                                            </div>
                                        </div>
                                    </div>
                                    <MileageList list={list} />
                                </div>
                                {hasMore && (
                                    <div className='btn_article'>
                                        <span
                                            className='more_btn'
                                            onClick={more}
                                        >
                                            더보기
                                        </span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='no_data on'>
                                {' '}
                                {/* 데이터가 없을 경우 class : on */}
                                <span>내역이 없습니다.</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='guide_list'>
                    <p className='tit'>[멤버십 마일리지 안내]</p>
                    <ul className='list_dot'>
                        <li>
                            구매 시 결제금액의 2%가 적립됩니다. (일부 품목
                            마일리지 적립대상 제외)
                        </li>
                        <li>
                            <strong>VIP회원</strong>(누적 구매 금액{' '}
                            <strong>200만원</strong> 이상부터 적용)은 구매 시
                            결제금액의 4%가 적립됩니다. (2년 간 혜택 유지)
                        </li>
                        <li>
                            마일리지 적립은 <strong>제품 구매일 당일</strong>
                            에만 적립 가능합니다. (온라인 소니스토어 배송 완료
                            후 7일 이내에 적립)
                        </li>
                        <li>
                            <strong>5,000 마일리지 이상</strong>이면 현금처럼
                            사용하실 수 있습니다.
                        </li>
                        <li>
                            적립하신 마일리지는 소니스토어 온라인 및 직영점에서
                            제품 구매 시, 소니 공식 서비스 센터에서의 제품 수리
                            및 콘텐츠 이용 시 사용 가능합니다.
                        </li>
                        <li>
                            최근 1년 간의 멤버십 마일리지 내역만 조회
                            가능합니다. (날짜 직접 검색을 통해서 확인 가능)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MileageInfo;
