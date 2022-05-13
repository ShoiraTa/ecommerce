import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDescriptionPage from './components/Pages/PDP/ProductDescriptionPage';
import ProductListingPage from './components/Pages/PLP/ProductListingPage';
import Navbar from './components/Navbar';
import Cart from './components/Pages/Cart/Cart';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:category" element={<ProductListingPage />} />
          <Route path="/:category/:productId" element={<ProductDescriptionPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
