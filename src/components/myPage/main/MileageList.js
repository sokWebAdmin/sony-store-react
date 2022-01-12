import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toCurrencyString } from 'utils/unit';
import { getMileageDetail } from 'utils/mileage';

const MileageList = ({ list }) => {
    const mileages = useMemo(
        () =>
            list.map(
                ({
                    sysRegDtime,
                    expiredDateTime,
                    amount,
                    mappingKey,
                    extraData,
                    type,
                }) => ({
                    regiDate: sysRegDtime
                        ? sysRegDtime.substr(0, 10).replace(/-/g, '.')
                        : '-',
                    expiredDate: expiredDateTime
                        ? expiredDateTime.substr(0, 10).replace(/-/g, '.')
                        : '-',
                    extraData,
                    mappingKey,
                    detail: getMileageDetail(type),
                    amount: amount,
                    isMinus: ['11', '20', 11, 20].includes(type),
                    amountClassList: ['11', '20', 11, 20].includes(type)
                        ? 'col_table_cell order_mileage down'
                        : 'col_table_cell order_mileage up',
                }),
            ),
        [list],
    );

    return (
        <div className='col_table_body'>
            {mileages.map((item, idx) => (
                <div className='col_table_row' key={idx}>
                    <div className='col_table_cell order_date'>
                        <p className='txt'>{item.regiDate}</p>
                    </div>
                    <div className='col_table_cell order_details'>
                        <p className='txt'>{item.detail}</p>
                    </div>
                    <div className='col_table_cell order_number'>
                        {item.mappingKey && item.mappingKey !== 'null' && (
                            <Link
                                to={`/my-page/order-detail?orderNo=${item.mappingKey}`}
                                className='txt'
                            >
                                {item.mappingKey}
                            </Link>
                        )}
                    </div>
                    <div className={item.amountClassList}>
                        <p className='txt'>
                            {item.isMinus ? '- ' : '+ '}{' '}
                            {item?.amount
                                ? toCurrencyString(item.amount).replace('-', '')
                                : 'N'}
                        </p>
                    </div>
                    <div className='col_table_cell order_expiration'>
                        <p className='txt'>{item.expiredDate}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MileageList;
