import { React, useRef, useState } from "react";
import { useHistory } from "react-router";

export default function ResultTop({ handleSearch, allCount, initalKeyword }) {
  const history = useHistory();
  console.log(history);
  const [keyword, setKeyword] = useState(initalKeyword);
  const searchKeyword = useRef(initalKeyword);

  const handleKeywordChange = ({ target }) => setKeyword(target.value);
  
  return (
    <div className="searchResult">
      <div className="searchResult__form">
        <form>
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
            onClick={e => {
              e.preventDefault();
              handleSearch(keyword);
              searchKeyword.current = keyword;
            }}>검색</button>
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