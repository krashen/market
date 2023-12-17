
import './categories.styles.scss';

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Hats',
    },
    {
      id: 2,
      title: 'Shoes',
    },
    {
      id: 3,
      title: 'Ties',
    },
    {
      id: 4,
      title: 'Damian',
    },
    {
      id: 5,
      title: 'Corchos',
    },
  ]
  return (
    <div className='categories-container'>
      {categories.map(({title, id})=>(
          <div key={id} className='category-container'>
            <div className='background-image' />
            <div className='category-body-container'>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
      ))}          
    </div>
  );
}

export default App;
