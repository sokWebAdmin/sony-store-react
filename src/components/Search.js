import React, {useState, useEffect} from "react";

//images
import search from "../assets/images/common/ic_search.svg";
import close from "../assets/images/common/ic_close.svg";

//utils
import { useHistory } from "react-router-dom";
import { getProductsFavoriteKeywords } from "../api/product";
import Alert from "./common/Alert";
import { useAlert } from "../hooks";

export default function Search({ setSearchOpen }) {
  
  const history = useHistory();

  const [keyword, setKeyword] = useState('');
  const [favoriteKeywords, setFavoriteKeywords] = useState([]);
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

  useEffect(() => fetchFavoriteKeywords(), []);

  const searchHandler = (e, keyword) => {
    e?.preventDefault();
    if (keyword) {
      history.push(`/search-result/${keyword}`)
      setSearchOpen(false);
    } else {
      openAlert('검색어를 입력해주세요.')
    }
  };

  return (
    <>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
        {/* 검색 */}
      <div className="search" style={{display:"block"}}>
        <h2 className="sr-only">통합검색</h2>
        <div className="search__inner">
          <div className="search__field">
            {/* <form action="get" role="search">  */}
            <fieldset>
              <legend>검색</legend>
              <input type="text" id="search__input" className="search__field__input" placeholder="검색어를 입력해 주세요." title="검색어 입력" maxLength="40" value={keyword} onChange={(e)=>{
                setKeyword(e.target.value);
              }} />
              <button className="btn search__btn__submit" onClick={ e => searchHandler(e, keyword) }><img src={search} alt="검색" /></button>
            </fieldset>
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
              <ul className="search__recomm__list">
                <li className="search__recomm__item">
                  <a >
                    <div className="search__recomm__pic">
                      <img src="/images/_tmp/item640x640_01.png" alt="상품명1" />
                      <span className="badge__text badge__text__new">NEW</span>

                      {/* <span className="badge__text badge__text__best">BEST</span>
                      <span className="badge__text badge__text__event">EVENT</span>
                      <span className="badge__text badge__text__hot">HOT</span> */}

                    </div>
                    <div className="search__recomm__wrapper">
                      <span className="search__recomm__name ellipsis">WH-1000XM4</span>
                      <p className="search__recomm__desc ellipsis2">끄지마세요, 벗지마세요, 편하게 대화를 시작하세요!</p>
                    </div>
                  </a>
                </li>
                <li className="search__recomm__item">
                  <a >
                    <div className="search__recomm__pic">
                      <img src="/images/_tmp/item640x640_02.png" alt="상품명2" />
                      <span className="badge__text badge__text__best">BEST</span>
                    </div>
                    <div className="search__recomm__wrapper">
                      <span className="search__recomm__name ellipsis">microSDXC SR-64HXA Class 10 High Sound Quality Model with SD Card Adapter</span>
                      <p className="search__recomm__desc ellipsis2">일렉트로닉 노이즈 억제, 맑고 깨끗한 사운드를 실현</p>
                    </div>
                  </a>
                </li>
                <li className="search__recomm__item">
                  <a >
                    <div className="search__recomm__pic">
                      <img src="/images/_tmp/item640x640_03.png" alt="상품명3" />
                      <span className="badge__text badge__text__event">EVENT</span>
                    </div>
                    <div className="search__recomm__wrapper">
                      <span className="search__recomm__name ellipsis">WH-1000XM4</span>
                      <p className="search__recomm__desc ellipsis2">모든 위대함은, 아주 작은 것들로부터. 원핸드 컴팩트 풀프레임 카메라, 독보적인 존재감, 예뻐지는 데일리 카메라</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button className="btn search__btn__close" onClick={()=>{
            setSearchOpen(false)
        }}><img src={close} alt="검색창 닫기" /></button>
      </div>
      {/* 검색 */}

    </>
  );
}