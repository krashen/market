import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => {
    return (
        <div className='categories-container'>
            {categories.map((category)=>(
                <CategoryItem id={category.id} category={category} />
            ))}          
        </div>
    );
}

export default Directory