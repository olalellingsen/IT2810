import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import AddCustomProduct from './pages/AddCustomProduct'

function App() {
  return (
    <div>
      <Navbar title="KurvKompis" />
      <div className="pt-20 pr-4 pl-4 pb-14 sm:pb-0 lg:px-12 xl:px-24 h-screen darkMode lightMode">
        <Routes>
          <Route path={''} element={<Home />} />
          <Route path={'/Home'} element={<Home />} />
          <Route path={'/AddCustomProduct'} element={<AddCustomProduct />} />
          <Route path={'/ProductsPage'} element={<ProductsPage editable={false} />} />
          <Route path={'/AddProduct'} element={<ProductsPage editable={true} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
