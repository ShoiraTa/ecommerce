import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDescriptionPage from './components/ProductDescriptionPage';
import ProductListingPage from './components/ProductListingPage';
import Navbar from './components/Navbar';
import './helpers.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/:category" element={<ProductListingPage />} />
          <Route path="/:category/product/:id" element={<ProductDescriptionPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
