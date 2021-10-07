import { React, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function ResultTop({ handleSearch, allCount, initalKeyword }) {
  const history = useHistory();
  const [keyword, setKeyword] = useState(initalKeyword);
  const searchKeyword = useRef(initalKeyword);

  const clickHandler = (event, k = keyword) => {
    event?.preventDefault();
    
    history.replace(`/search-result/${k}`)
    handleSearch(k);
    searchKeyword.current = k;
  }

  const handleKeywordChange = ({ target }) => setKeyword(target.value);

  useEffect(() => {
    if(keyword === initalKeyword) return;
    searchKeyword.current = initalKeyword;
    setKeyword(initalKeyword);
  }, [initalKeyword])
  
  return (
    <div className="searchResult">
      <div className="searchResult__form">
        <form onSubmit={clickHandler}>
          <label htmlFor="search-input">검색결과</label>
          <input 
            type="text" 
            id="search-input" 
            className="input-txt"  
            onChange={handleKeywordChange}
            value={ keyword }
          />
          <button 
            type="button" 
            className="btn_search" 
            title="검색" 
            onClick={clickHandler}>검색</button>
        </form>
      </div>
      <div className="result-message">
        <p>
          <strong>‘{searchKeyword.current}’</strong>에 대한 검색결과는 총 <strong>{allCount}</strong>건 입니다.
        </p>
      </div>
    </div>
  )
}