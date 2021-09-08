import { useState, useEffect, useRef } from 'react';

// components
import LayerPopup from '../common/LayerPopup';

// api
import { getAddresses } from '../../api/manage';

// utils
import { setObjectState } from '../../utils/state';

// stylesheet
import '../../assets/scss/partials/popup/findAddress.scss';

const getDefaultPage = () => ({
  current: 1,
  size: 10,
});

// 주소 찾기 팝업
const FindAddress = ({ setVisible, setShipping }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const [noSearch, setNoSearch] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(getDefaultPage());

  const [pageTotal, setPageTotal] = useState(0);

  const result = useRef();

  const close = () => setVisible(false);

  const submit = event => {
    event.preventDefault();
    setPage(getDefaultPage());
  };

  function fetchAddresses () {
    if (!searchKeyword) {
      return;
    }

    getAddresses({
      keyword: searchKeyword,
      pageNumber: page.current,
      pageSize: page.size,
    }).then(({ data }) => {
      setItems(data.items);
      updatePagination(data.totalCount);
    }).then(() => {
      noSearch && setNoSearch(false);
      result.current.scrollTop = 0;
    });
  }

  useEffect(fetchAddresses, [page]);

  const onPrev = () => {
    setCurrentPage(page.current - 1);
  };

  const onNext = () => {
    setCurrentPage(page.current + 1);
  };

  const setCurrentPage = number => setObjectState('current', number)(setPage);

  const updatePagination = itemCount => setPageTotal(
    Math.ceil(itemCount / page.size));

  return (
    <>
      <LayerPopup className="find_address" onClose={close}>
        <p className="pop_tit">우편번호 찾기</p>
        <form className="search_container" onSubmit={submit}>
          <input
            type="text"
            placeholder="도로명,지번,건물명 입력"
            className="search_input"
            name="searchKeyword"
            value={searchKeyword}
            onChange={({ target }) => setSearchKeyword(target.value)}
          />
          <button type="submit"
                  className="search_button button button_negative">검색
          </button>
        </form>

        {noSearch
          ? <SearchTip />
          : <>
            <div className="result" ref={result}>
              {items?.length >= 1 ?
                <ul className="addresses">
                  {items.map(({ zipCode, address, jibunAddress }, i) => (
                    <li key={i + '_' + zipCode}>
                      <button>
                        <div className="address">
                          <div className="road">
                              <span className="badge">
                                  도로명
                              </span>
                            <p>
                              {address}
                            </p>
                          </div>
                          <div className='ground'>
                            <span className="badge">
                                지번
                            </span>
                            <p>
                              {jibunAddress}
                            </p>
                          </div>
                        </div>
                        <span className="zip_code">
                        {zipCode}
                      </span>
                      </button>
                    </li>
                  ))}
                </ul>
                : <NoResult />
              }
            </div>
            {pageTotal > 1 &&
            <div className="page">
              <button className="prev" onClick={onPrev}
                      disabled={page.current === 1}>이전
              </button>
              <div className="count">
                <span>{page.current}</span>/<span>{pageTotal}</span>
              </div>
              <button className="next" onClick={onNext}
                      disabled={page.current === pageTotal}>다음
              </button>
            </div>
            }
          </>
        }
      </LayerPopup>
    </>
  );
};

function SearchTip () {
  return (
    <div className="tip">
      <p className="tit">
        TIP
      </p>
      <p>
        아래와 같이 검색하면 더욱 정확한 결과가 검색됩니다.
      </p>
      <dl>
        <dt>
          도로명 + 건물번호
        </dt>
        <dd>
          예) 영동대로 513, 제주 첨단로 242
        </dd>
      </dl>
      <dl>
        <dt>
          지역명(동/리) + 번지
        </dt>
        <dd>
          예) 삼성동 25, 제주 영평동 2181
        </dd>
      </dl>
      <dl>
        <dt>
          지역명(동/리) + 건물명(아파트명)
        </dt>
        <dd>
          예) 분당 주공, 삼성동 코엑스
        </dd>
      </dl>
    </div>
  );
}

function NoResult () {
  return (
    <div className="no_result">
      <p><strong>검색된 결과가 없습니다.</strong></p>
      <p>검색어에 잘못된 철자가 없는지, 정확한 주소인지 다시 한번 확인해 주세요.</p>
      <div className="tip">
        <p className="tit">
          TIP
        </p>
        <p>지번주소(동/읍/면), 도로명, 건물명(아파트)을 확인해주세요.</p>
        <p>일부 신축건물, 신도시의 경우 일시적으로 검색이 되지 않을 수 있습니다.</p>
        <p>도로명 주소를 모르실 경우 <a href="https://www.juso.go.kr"
                             target="_blank">www.juso.go.kr</a> 에서 확인
          가능합니다.</p>
        <p>동명으로 검색시 법정동명으로 검색하셔야 합니다.</p>
        <p>(행정동명으로는 검색이 되지 않습니다.)</p>
      </div>
    </div>
  );
}

export default FindAddress;
