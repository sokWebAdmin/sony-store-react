import React, {useState, useEffect, useContext} from "react";

//images
import search from "../assets/images/common/ic_search.svg";
import close from "../assets/images/common/ic_close.svg";

//utils
import { useHistory } from "react-router-dom";

export default function Search({ setSearchOpen }) {
  
  const history = useHistory();

  const [keyword, setKeyword] = useState('');

  return (
    <>
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
              <button className="btn search__btn__submit" onClick={()=>{
                if(keyword){
                  history.push("/search-result/"+keyword)
                } else{
                  alert("검색어를 입력해주세요.")
                }
                
              }}><img src={search} alt="검색" /></button>
            </fieldset>
             {/* </form>  */}
          </div>
          <div className="search__keyword">
            <h3 className="search__title">인기 검색어</h3>
            <div className="search__keyword__list">
              <a href="#" className="search__keyword__item"># SEL40F25G</a>
              <a href="#" className="search__keyword__item"># SRS-RA5000/MKR2</a>
              <a href="#" className="search__keyword__item"># 카메라의 초격차</a>
              <a href="#" className="search__keyword__item"># 알파 야카데미 8월 강좌</a>
              <a href="#" className="search__keyword__item"># 노이즈캔슬링</a>
              <a href="#" className="search__keyword__item"># 벗지않는 헤드폰</a>
              <a href="#" className="search__keyword__item"># WF-1000XM3SME</a>
              <a href="#" className="search__keyword__item"># 무선 스피커</a>
              <a href="#" className="search__keyword__item"># 하이 레졸루션 오디오</a>
              <a href="#" className="search__keyword__item"># 프리미엄 SD카드</a>
            </div>
          </div>
          <div className="search__recomm">
            <h3 className="search__title">추천 제품</h3>
            <div className="search__recomm__wrapper">
              <ul className="search__recomm__list">
                <li className="search__recomm__item">
                  <a href="#">
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
                  <a href="#">
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
                  <a href="#">
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