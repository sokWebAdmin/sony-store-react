import React, {useState, useEffect} from "react";
import _ from 'lodash';

//images
import search from "../assets/images/common/ic_search.svg";
import close from "../assets/images/common/ic_close.svg";

//utils
import { Link, useHistory } from "react-router-dom";
import { getProductSearch, getProductsFavoriteKeywords } from "../api/product";
import Alert from "./common/Alert";
import { useAlert } from "../hooks";
// import { loadBanner } from "../api/display";
import { tagColorMap } from "../const/category";

export default function Search({ setSearchOpen }) {
  
  const history = useHistory();

  const [keyword, setKeyword] = useState('');
  const [favoriteKeywords, setFavoriteKeywords] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  } = useAlert();

  const fetchFavoriteKeywords = async () => {
    try {
      const { data } = await getProductsFavoriteKeywords();
      setFavoriteKeywords(data);
    } catch(e) {
      console.error(e)
    }
  };

  const fetchRecommendedProducts = async () => {
    try {
      // @TODO 판매인기순? MD추천순?
      const { data } = await getProductSearch({ 'order.by': 'MD_RECOMMEND' });
      setRecommendedProducts(data.items.map(p => ({ img: _.head(p.imageUrls), ...p })));
      // const { data } = await loadBanner('015');

      // setRecommendedProducts(
      //   () => _.chain(data)
      //    .flatMap(({ accounts }) => accounts)
      //    .flatMap(({ banners }) => banners)
      //    .map(({ landingUrl, ...rest }) => ({
      //       productNo: _.last(landingUrl.split('/')),
      //       landingUrl,
      //       ...rest
      //    }))
      //    .value()
      // )

    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => fetchFavoriteKeywords(), []);
  useEffect(() => fetchRecommendedProducts(), []);

  const searchHandler = (e, keyword) => {
    e?.preventDefault();
    if (keyword) {
      history.replace(`/search-result/${keyword}`)
      setSearchOpen(false);
    } else {
      openAlert('검색어를 입력해주세요.')
    }
  };

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="search" style={{display:"block"}}>
        <h2 className="sr-only">통합검색</h2>
        <div className="search__inner">
          <div className="search__field">
            <form onSubmit={ e => searchHandler(e, keyword) }>
            {/* <form action="get" role="search">  */}
              <fieldset>
                <legend>검색</legend>
                <input type="text" id="search__input" className="search__field__input" placeholder="검색어를 입력해 주세요." title="검색어 입력" maxLength="40" value={keyword} onChange={(e)=>{
                  setKeyword(e.target.value);
                }} />
                <button className="btn search__btn__submit" onClick={ e => searchHandler(e, keyword) }><img src={search} alt="검색" /></button>
              </fieldset>
            </form>
             {/* </form>  */}
          </div>
          <div className="search__keyword">
            <h3 className="search__title">인기 검색어</h3>
            <div className="search__keyword__list">
              {
                favoriteKeywords.map((k, idx) => (
                  <button key={`${k}${idx}`} className="search__keyword__item" onClick={e => searchHandler(e, k)}>{`# ${k}`}</button>
                ))
              }
            </div>
          </div>
          <div className="search__recomm">
            <h3 className="search__title">추천 제품</h3>
            <div className="search__recomm__wrapper">
              <ul className="search__recomm__list" style={{ flexWrap: 'wrap' }}>
                {
                  recommendedProducts?.map((rp, idx) => (
                    <li key={`${rp.productNo}${idx}`} className="search__recomm__item">
                      <Link to={`/product-view/${rp.productNo}`}>
                        <div className="search__recomm__pic">
                          <img src={rp.img} alt={rp.productName} />
                          {
                            rp.stickerLabels?.map((l, idx) => (
                              <span key={`${l}${idx}`} className="badge__text" style={{ color: tagColorMap[l] }}>{l}</span>
                            ))
                          }
                        </div>
                        <div className="search__recomm__wrapper">
                          <span className="search__recomm__name ellipsis">{rp.productName}</span>
                          <p className="search__recomm__desc ellipsis2">{rp.promotionText}</p>
                        </div>
                      </Link>
                    </li>
                  ))
                }
                {
                  // // @TODO 네임은 다 다른데.. 상품번호는 모두 같은거지...
                  // recommendedProducts?.map((rp, idx) => (
                  //   <li key={`${rp.productNo}${idx}`} className="search__recomm__item">
                  //     <Link to={`/product-view/${rp.productNo}`}>
                  //       <div className="search__recomm__pic">
                  //         <img src={rp.imageUrl} alt={rp.name} />

                  //         {/* <span className="badge__text badge__text__best">BEST</span>
                  //         <span className="badge__text badge__text__event">EVENT</span>
                  //         <span className="badge__text badge__text__hot">HOT</span> */}

                  //       </div>
                  //       <div className="search__recomm__wrapper">
                  //         <span className="search__recomm__name ellipsis">{rp.name}</span>
                  //         <p className="search__recomm__desc ellipsis2">{rp.description}</p>
                  //       </div>
                  //     </Link>
                  //   </li>
                  // ))
                }
              </ul>
            </div>
          </div>
        </div>
        <button className="btn search__btn__close" onClick={()=>setSearchOpen(false)}><img src={close} alt="검색창 닫기" /></button>
      </div>
    </>
  );
}