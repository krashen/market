import ProductCard from '../product-card/product-card.component';
import { NavigationContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
    return (
        <NavigationContainer>
            <h2><Title to={title}>{title.toUpperCase()}</Title></h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4 )
                        .map(((product) => {
                            return <ProductCard key={product.id} product={product} />
                        }))
                }
            </Preview>
        </NavigationContainer>
        
    )
}

export default CategoryPreview