import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Category from './Pages/Category';
import ProductList from './Pages/ProductList';
import Products from './Pages/Products';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Category/>} />
        <Route path="/addproduct" element={<Products/>} />
        <Route path="/productlist" element={<ProductList/>} />
      </Routes>
    </Router>
  );
}

export default App;
   