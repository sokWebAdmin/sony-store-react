import PropTypes from 'prop-types';

const Newest = ({ newest, setNewest }) => (
    <div className='itemsort__drawer'>
        <ul className='itemsort__items'>
            <li
                className={`itemsort__item ${
                    newest && 'itemsort__item--active'
                }`}
            >
                <a
                    href='#none'
                    className='itemsort__item__link'
                    onClick={() => setNewest(true)}
                >
                    최신순
                </a>
            </li>
            <li
                className={`itemsort__item ${
                    !newest && 'itemsort__item--active'
                }`}
            >
                <a
                    href='#none'
                    className='itemsort__item__link'
                    onClick={() => setNewest(false)}
                >
                    오래된순
                </a>
            </li>
        </ul>
    </div>
);

Newest.propTypes = {
    newest: PropTypes.bool.isRequired,
    setNewest: PropTypes.func.isRequired,
};

export default Newest;
