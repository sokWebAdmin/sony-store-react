import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const ViewMore = ({
    totalCount,
    viewMore,
    pageSize,
    reset = false,
    keyword = '',
}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const hide = useMemo(
        () => pageNumber * pageSize > totalCount,
        [pageNumber, pageSize, totalCount],
    );

    const debounceViewMore = debounce(
        (pageNumber) => viewMore(pageNumber, keyword),
        500,
    );

    const handleCountClick = (event) => {
        event.preventDefault();
        debounceViewMore(pageNumber + 1);
        setPageNumber((prev) => (prev += 1));
    };

    useEffect(() => reset && setPageNumber(1), [reset]);

    return (
        <div
            className='btn_article comm_more line'
            style={{ visibility: hide ? 'hidden' : 'visible' }}
        >
            <a
                href='#none'
                className='more_btn'
                title='더보기'
                onClick={handleCountClick}
            >
                더보기
            </a>
        </div>
    );
};

ViewMore.propTypes = {
    totalCount: PropTypes.number.isRequired,
    viewMore: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    reset: PropTypes.bool,
    keyword: PropTypes.string,
};

export default ViewMore;
