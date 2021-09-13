import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//css
import "../../assets/scss/category.scss"

//utils
import { useHistory } from "react-router-dom";
import CategoryHeader from '../../components/products/CategoryHeader';
import { useGetCategoryByKey } from '../../context/category.context';

export default function Category({match}) {
  const history = useHistory();

  const category = useGetCategoryByKey('url', match.url);

  console.log(category);

  return (
    <>
      <SEOHelmet title={`제품목록:${category?.label || ''}`} />

      <div className="category">
        <div className="container">
          <div className="content">
            {category &&
              <>
                <CategoryHeader category={category}></CategoryHeader>
                <div className="product__list__wrapper"></div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}