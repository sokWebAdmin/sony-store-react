import React from 'react';
import dayjs from 'dayjs';
import { toCurrencyString } from 'utils/unit';
import { getMileageDetail } from 'utils/mileage';

const MileageList = ({ list }) => {
    return (
        <div className='col_table_body'>
            {list.map((item, index) => (
                <div className='col_table_row' key={index}>
                    <div className='col_table_cell order_date'>
                        <p className='txt'>
                            {item.sysRegDtime
                                ? dayjs(item.sysRegDtime).format('YYYY.MM.DD')
                                : '-'}
                        </p>
                    </div>
                    <div className='col_table_cell order_details'>
                        <p className='txt'>{getMileageDetail(item.type)}</p>
                    </div>
                    <div className='col_table_cell order_number'>
                        {item.mappingKey && item.mappingKey !== 'null' && (
                            <span className='txt'>{item.mappingKey}</span>
                        )}
                    </div>
                    <div
                        className={
                            ['11', '20', 11, 20].includes(item.type)
                                ? 'col_table_cell order_mileage down'
                                : 'col_table_cell order_mileage up'
                        }
                    >
                        <p className='txt'>
                            {['11', '20', 11, 20].includes(item.type)
                                ? '- '
                                : '+ '}{' '}
                            {item?.amount
                                ? toCurrencyString(item.amount).replace('-', '')
                                : 'N'}
                        </p>
                    </div>
                    <div className='col_table_cell order_expiration'>
                        <p className='txt'>
                            {item.expiredDate
                                ? dayjs(item.expiredDateTime).format(
                                      'YYYY.MM.DD',
                                  )
                                : '-'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MileageList;
