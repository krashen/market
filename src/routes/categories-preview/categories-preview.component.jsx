
import { Fragment } from 'react'; 
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';

import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

    return (   
        <Fragment>

            {   categoriesIsLoading? (
                <Spinner />
                ) :
                (Object.keys(categoriesMap).map( (title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                }))
            }
        </Fragment>       
    )
}

export default CategoriesPreview;