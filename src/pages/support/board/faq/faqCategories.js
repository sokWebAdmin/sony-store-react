import { useBoardDispatch, useBoardState } from "../../../../context/board.context";

export default function FaqCategories() {
  const dispatch = useBoardDispatch();
  const { config, currentCategoryNo } = useBoardState();

  const onClickCategory = (event, categoryNo) => {
    event.preventDefault();
    dispatch({
      type: 'SELECT_CATEGORY',
      data: { categoryNo }
    })
  }

  return (
    <div className="category_center">
      <div className="category_slide_tab swiper-container">
        <ul className="swiper-wrapper">
          {
            config.faq.categories.map(({
                                         categoryNo,
                                         label
                                       }) => {
              return (
                <li
                  key={categoryNo}
                  className={`swiper-slide ${categoryNo === currentCategoryNo ? 'on' : ''}`}
                  data-view-category={categoryNo}
                  onClick={ event => onClickCategory(event, categoryNo) }
                >
                  <a href={ `#${label}` } className="btn"><span>{ label }</span></a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}  