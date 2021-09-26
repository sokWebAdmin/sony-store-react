export default function Newest({ newest, setNewest }) {
  return (
    <div className="itemsort__drawer">
      <ul className="itemsort__items">
        <li className={`itemsort__item ${newest && 'itemsort__item--active'}`}>
          <a 
            href="#none" 
            className="itemsort__item__link" 
            onClick={
              e => {
                e.preventDefault();
                setNewest(true);
              }
            }
          >최신순</a>
        </li>
        <li className={`itemsort__item ${!newest && 'itemsort__item--active'}`}>
          <a 
            href="#none" 
            className="itemsort__item__link" 
            onClick={
              e => {
                e.preventDefault();
                setNewest(false);
              }
            }
          >오래된순</a>
        </li>
      </ul>
    </div>
  )
}