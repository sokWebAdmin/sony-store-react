import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';

import Alert from 'components/common/Alert';
import { useAlert } from 'hooks';
import { tagColorMap } from 'const/category';
import { getDisplaySectionsSectionNo, loadBanner } from 'api/display';
import { bannerCode } from 'bannerCode';
import search from 'assets/images/common/ic_search.svg';
import close from 'assets/images/common/ic_close.svg';

export default function Search({ setSearchOpen }) {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const [favoriteKeywords, setFavoriteKeywords] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

    const fetchFavoriteKeywords = async () => {
        const { keyword } = bannerCode.search;

        try {
            const { data } = await loadBanner(keyword);

            setFavoriteKeywords(
                _.chain(data)
                    .flatMap(({ accounts }) => accounts)
                    .flatMap(({ banners }) => banners)
                    .take(10)
                    .map(({ name, nameColor, landingUrl }) => ({
                        label: name,
                        labelColor: nameColor,
                        url: landingUrl,
                    }))
                    .value(),
            );
        } catch (e) {
            console.error(e);
        }
    };

    const fetchRecommendedProducts = async () => {
        const { searchBar } = bannerCode.product;

        try {
            const { data } = await getDisplaySectionsSectionNo({
                pathParams: {
                    sectionNo: searchBar,
                },
                params: {
                    by: 'ADMIN_SETTING',
                    soldout: true,
                    pageNumber: 1,
                    pageSize: 4,
                },
            });

            setRecommendedProducts(
                _.chain(data)
                    .take(1)
                    .flatMap(({ products }) => products)
                    .map((p) => ({ img: _.head(p.imageUrls), ...p }))
                    .value(),
            );
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => fetchFavoriteKeywords(), []);
    useEffect(() => fetchRecommendedProducts(), []);

    const searchHandler = (e, keyword) => {
        e?.preventDefault();
        if (keyword) {
            history.replace(
                `/search-result/${encodeURIComponent(
                    keyword.replace('/', '&#47'),
                )}`,
            );
            setSearchOpen(false);
        } else {
            openAlert('???????????? ??????????????????.');
        }
    };

    return (
        <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            <div className='search' style={{ display: 'block' }}>
                <h2 className='sr-only'>????????????</h2>
                <div className='search__inner'>
                    <div className='search__field'>
                        <form onSubmit={(e) => searchHandler(e, keyword)}>
                            {/* <form action="get" role="search">  */}
                            <fieldset>
                                <legend>??????</legend>
                                <input
                                    type='text'
                                    id='search__input'
                                    className='search__field__input'
                                    placeholder='???????????? ????????? ?????????. (???????????? ??????)'
                                    title='????????? ??????'
                                    maxLength='40'
                                    value={keyword}
                                    onChange={(e) => {
                                        setKeyword(e.target.value);
                                    }}
                                />
                                <button
                                    className='btn search__btn__submit'
                                    onClick={(e) => searchHandler(e, keyword)}
                                >
                                    <img src={search} alt='??????' />
                                </button>
                            </fieldset>
                        </form>
                        {/* </form>  */}
                    </div>
                    <div className='search__keyword'>
                        <h3 className='search__title'>?????? ?????????</h3>
                        <div className='search__keyword__list'>
                            {favoriteKeywords.map(
                                ({ label, labelColor, url }, idx) => (
                                    <Link
                                        to={url || `/search-result/${label}`}
                                        key={`${label}${idx}`}
                                        className='search__keyword__item'
                                        onClick={() => setSearchOpen(false)}
                                        style={{ color: labelColor }}
                                    >{`# ${label}`}</Link>
                                ),
                            )}
                        </div>
                    </div>
                    <div className='search__recomm'>
                        <h3 className='search__title'>?????? ??????</h3>
                        <div className='search__recomm__wrapper'>
                            <ul className='search__recomm__list'>
                                {[...recommendedProducts]
                                    .splice(0, 3)
                                    ?.map((rp, idx) => (
                                        <li
                                            key={`${rp.productNo}${idx}`}
                                            className='search__recomm__item'
                                        >
                                            <Link
                                                to={`/product-view/${rp.productNo}`}
                                                onClick={() =>
                                                    setSearchOpen(false)
                                                }
                                            >
                                                <div className='search__recomm__pic'>
                                                    <img
                                                        src={rp.img}
                                                        alt={rp.productName}
                                                    />
                                                    {rp.stickerLabels?.map(
                                                        (l, idx) => (
                                                            <span
                                                                key={`${l}${idx}`}
                                                                className='badge__text'
                                                                style={{
                                                                    color: tagColorMap[
                                                                        l
                                                                    ],
                                                                }}
                                                            >
                                                                {l}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                                <div className='search__recomm__wrapper'>
                                                    <span className='search__recomm__name ellipsis'>
                                                        {rp.productName}
                                                    </span>
                                                    <p className='search__recomm__desc ellipsis2'>
                                                        {rp.productNameEn}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <button
                    className='btn search__btn__close'
                    onClick={() => setSearchOpen(false)}
                >
                    <img src={close} alt='????????? ??????' />
                </button>
            </div>
        </>
    );
}
