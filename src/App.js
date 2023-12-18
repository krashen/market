import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './routes/home/home.component';

const Shop = () => {
    return <h2>Que ondaaaa</h2>
}

const Navigation = () => {
  return (
    <div>
      <h2>Navigation</h2>
      <Outlet />
    </div>
  )
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
  
}

export default App;
