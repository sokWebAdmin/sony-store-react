import { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

import LayerPopup from 'components/common/LayerPopup';
import { useLockBodyScroll } from 'hooks/useLockBodyScroll';
import { getAddresses } from 'api/manage';
import { setObjectState } from 'utils/state';
import 'assets/scss/partials/popup/findAddress.scss';

const getDefaultPage = () => ({
    current: 1,
    size: isMobile ? 5 : 10,
});

const FindAddress = ({ setVisible, setAddress }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [noSearch, setNoSearch] = useState(true);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(getDefaultPage());
    const [pageTotal, setPageTotal] = useState(0);

    const result = useRef();

    useLockBodyScroll();

    const close = () => setVisible(false);

    const submit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setPage(getDefaultPage());
    };

    const select = ({ address, jibunAddress, zipCode }) => {
        setAddress({ address, jibunAddress, zipCode });
        close();
    };

    function fetchAddresses() {
        if (!searchKeyword) {
            return;
        }

        getAddresses({
            keyword: searchKeyword,
            pageNumber: page.current,
            pageSize: page.size,
        })
            .then(({ data }) => {
                setItems(data.items);
                updatePagination(data.totalCount);
            })
            .then(() => {
                noSearch && setNoSearch(false);
                result.current.scrollTop = 0;
            });
    }

    useEffect(fetchAddresses, [page]);

    const onPrev = () => setCurrentPage(page.current - 1);

    const onNext = () => setCurrentPage(page.current + 1);

    const setCurrentPage = (number) =>
        setObjectState('current', number)(setPage);

    const updatePagination = (itemCount) =>
        setPageTotal(Math.ceil(itemCount / page.size));

    return (
        <LayerPopup className='find_address' onClose={close}>
            <p className='pop_tit'>???????????? ??????</p>
            <form className='search_container' onSubmit={submit}>
                <input
                    type='text'
                    placeholder='?????????,??????,????????? ??????'
                    className='search_input'
                    name='searchKeyword'
                    value={searchKeyword}
                    onChange={({ target }) => setSearchKeyword(target.value)}
                />
                <button
                    type='submit'
                    className='search_button button button_negative'
                >
                    ??????
                </button>
            </form>

            {noSearch ? (
                <SearchTip />
            ) : (
                <>
                    <div className='result' ref={result}>
                        {items?.length >= 1 ? (
                            <ul className='addresses'>
                                {items.map((item, i) => (
                                    <li key={i + '_' + item.zipCode}>
                                        <button onClick={() => select(item)}>
                                            <div className='address'>
                                                <div className='road'>
                                                    <span className='badge'>
                                                        ?????????
                                                    </span>
                                                    <p>{item.address}</p>
                                                </div>
                                                <div className='ground'>
                                                    <span className='badge'>
                                                        ??????
                                                    </span>
                                                    <p>{item.jibunAddress}</p>
                                                </div>
                                            </div>
                                            <span className='zip_code'>
                                                {item.zipCode}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoResult />
                        )}
                    </div>
                    {pageTotal > 1 && (
                        <div className='page'>
                            <button
                                className='prev'
                                onClick={onPrev}
                                disabled={page.current === 1}
                            >
                                ??????
                            </button>
                            <div className='count'>
                                <span>{page.current}</span>/
                                <span>{pageTotal}</span>
                            </div>
                            <button
                                className='next'
                                onClick={onNext}
                                disabled={page.current === pageTotal}
                            >
                                ??????
                            </button>
                        </div>
                    )}
                </>
            )}
        </LayerPopup>
    );
};

function SearchTip() {
    return (
        <div className='tip'>
            <p className='tit'>TIP</p>
            <p>????????? ?????? ???????????? ?????? ????????? ????????? ???????????????.</p>
            <dl>
                <dt>????????? + ????????????</dt>
                <dd>???) ???????????? 513, ?????? ????????? 242</dd>
            </dl>
            <dl>
                <dt>?????????(???/???) + ??????</dt>
                <dd>???) ????????? 25, ?????? ????????? 2181</dd>
            </dl>
            <dl>
                <dt>?????????(???/???) + ?????????(????????????)</dt>
                <dd>???) ?????? ??????, ????????? ?????????</dd>
            </dl>
        </div>
    );
}

function NoResult() {
    return (
        <div className='no_result'>
            <p>
                <strong>????????? ????????? ????????????.</strong>
            </p>
            <p>
                ???????????? ????????? ????????? ?????????, ????????? ???????????? ?????? ?????? ?????????
                ?????????.
            </p>
            <div className='tip'>
                <p className='tit'>TIP</p>
                <p>
                    ????????????(???/???/???), ?????????, ?????????(?????????)??? ??????????????????.
                </p>
                <p>
                    ?????? ????????????, ???????????? ?????? ??????????????? ????????? ?????? ?????? ???
                    ????????????.
                </p>
                <p>
                    ????????? ????????? ????????? ??????{' '}
                    <a
                        href={window.anchorProtocol + 'www.juso.go.kr'}
                        onClick={window.openBrowser}
                        target='_blank'
                    >
                        www.juso.go.kr
                    </a>{' '}
                    ?????? ?????? ???????????????.
                </p>
                <p>???????????? ????????? ?????????????????? ??????????????? ?????????.</p>
                <p>(????????????????????? ????????? ?????? ????????????.)</p>
            </div>
        </div>
    );
}

export default FindAddress;
