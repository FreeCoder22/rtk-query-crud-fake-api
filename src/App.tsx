import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDelete from './components/product/ProductDelete';
import ProductDetail from './components/product/ProductDetail';
import ProductForm from './components/product/ProductForm';
import ProductList from './components/product/ProductList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/delete/:id" element={<ProductDelete />} />
      </Routes>
    </Router>
  );
};

export default App;