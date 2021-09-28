import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import { getCategoryByKey, useCategoryState } from '../../context/category.context';
import { Link } from 'react-router-dom';

import _ from 'lodash';

const mapClassName = {
  제품: 'sitemap__product',
  기획전: 'sitemap__plan',
  '고객 서비스': 'sitemap__customer',
};

function ProductCategory({ label }) {
  
  const { gnbCategories, categories } = useCategoryState();
  const productCategories = _.chain(gnbCategories)
                             .filter(({ label }) => label === '제품')
                             .flatMap(({ children }) => children)
                             .map(c => getCategoryByKey(categories, 'url', c.route))
                             .groupBy(c => c.label)
                             .value();
  
  const getSubCategory = label => _.first(productCategories[label])?.children;

  return (
    <ul className="product_box">
      {
        getSubCategory(label).map(({ categoryNo, label, url }) => (
          <li key={categoryNo}>
            <Link to={ url }>{ label }</Link>
          </li>
        ))
      }
    </ul>
  )
}

function SiteMapSubCategory({ children, parentLabel }) {
  return (
    <>
    {
      children && children.map((c, idx) => (
        <li key={ `${c.label}${idx}` }>
          {c.route ? <Link to={ c.route }>{ c.label }</Link> : <a href={c.href} target="_blank" rel="noreferrer">{c.label}</a>}
          { parentLabel === '제품' && <ProductCategory label={c.label}/> }
        </li>
      ))
    }
    </>
  )
}

export default function SiteMap() {
  const { gnbCategories } = useCategoryState();
  
  return (
    <>
      <SEOHelmet title={"소니스토어 사이트맵"} />
      <div className="contents">
        <div className="container">
          <div className="content">
            <div className="page">
              <h1 className="page__title">사이트맵</h1>
            </div>
            
            <div className="sitemap">
              {
                gnbCategories.map(({ label, children }, idx) => (
                  <div 
                    key={ `${label}${idx}` } 
                    className={`sitemap__grid ${mapClassName[label]}`}
                  >
                    <h2 className="title">{ label }</h2>
                    <ul>
                      {
                        <SiteMapSubCategory 
                          children={children}
                          parentLabel={label}
                        />
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
