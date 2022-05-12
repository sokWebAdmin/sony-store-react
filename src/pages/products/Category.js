import { useState } from 'react';

import {
    getCategoryByKey,
    useCategoryState,
    useGetCategoryByKey,
} from 'context/category.context';
import SEO from 'components/SEO';
import CategoryHeader from 'components/products/CategoryHeader';
import ProductList from 'components/products/ProductList';
import { getSEOData } from 'const/seo';
import 'assets/scss/category.scss';

export default function Category({ match, history }) {
    const category = useGetCategoryByKey('url', match.url);
    const { categories } = useCategoryState();

    if (categories.length > 0 && !category) {
        history.replace('/404');
    }

    const [currentCategory, setCurrentCategory] = useState(null);

    if (category && !currentCategory) {
        setCurrentCategory(category);
    }

    const changeCurrentCategoryByNo = (categoryNo) => {
        const tempCategory = getCategoryByKey(
            [category],
            'categoryNo',
            categoryNo,
        );

        if (tempCategory) {
            setCurrentCategory(tempCategory);
        }
    };

    return (
        <>
            {category && <SEO data={getSEOData(match.url, category.label)} />}

            <div className='category'>
                <div className='container'>
                    <div className='content'>
                        {category && (
                            <>
                                <CategoryHeader
                                    category={category}
                                    changeCurrentCategoryByNo={
                                        changeCurrentCategoryByNo
                                    }
                                ></CategoryHeader>
                                <ProductList
                                    category={currentCategory}
                                ></ProductList>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
