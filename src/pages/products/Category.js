import { useState } from 'react';

import SEO from 'components/SEO';
import CategoryHeader from 'components/products/CategoryHeader';
import ProductList from 'components/products/ProductList';
import {
    getCategoryByKey,
    useCategoryState,
    useGetCategoryByKey,
} from 'context/category.context';
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
            <SEO data={{ title: `제품목록:${category?.label || ''}` }} />

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
                                />
                                <ProductList category={currentCategory} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
