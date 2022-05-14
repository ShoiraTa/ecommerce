import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductListingCard from './ProductListingCard';
import { addProductToCart, toggleMinicart } from '../../../redux/reducers/cart/cartReducerActions';
import Minicart from '../Cart/Minicart';
import './plp.css';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
  pricesReducer: state.pricesReducer,
  pdpReducer: state.pdpReducer,
  currentCategory: state.headerReducer.currentCategory,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  toggleMinicart: () => dispatch(toggleMinicart()),
});

class ProductListingPage extends Component {
  componentDidMount() {
    const { getCategoryProducts, currentCategory } = this.props;
    getCategoryProducts(currentCategory);
  }

  componentDidUpdate(prevProps) {
    const { currentCategory, getCategoryProducts } = this.props;
    if (prevProps.currentCategory !== currentCategory) {
      getCategoryProducts(currentCategory);
    }
  }

  render() {
    const { headerReducer, pricesReducer, pdpReducer, addProductToCart, cartReducer, toggleMinicart } = this.props;
    const { minicartIsOpen } = cartReducer;
    const { currentCategory } = headerReducer;
    const { currentCurrency } = pricesReducer;
    const { products } = pdpReducer;
    return (
      <section className={minicartIsOpen ? 'container-sm pdp-minicart-open' : 'container-sm'}>
        <div className="products-listing-wrapper">
          <h1>{currentCategory}</h1>
          {minicartIsOpen && <Minicart show={minicartIsOpen} onClickOutside={() => toggleMinicart()} />}

          <div className="products-container">
            <div className="products-grid">
              {products?.map((product) => {
                return (
                  <ProductListingCard
                    key={product.id}
                    prices={product.prices}
                    product={product}
                    currentCategory={currentCategory}
                    currentCurrency={currentCurrency}
                    toggleMinicart={toggleMinicart}
                    minicartIsOpen={minicartIsOpen}
                    addProductToCart={addProductToCart}
                    cartReducer={cartReducer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
