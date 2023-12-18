import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const Shop = () => {
    return <h2>Que ondaaaa</h2>
}

const App = () => {

  return (
    <Routes>
      <Route path='/home' element={<Home />}>
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
  
}

export default App;
