import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductListingCard from './ProductListingCard';
import { addProductToCart } from '../../../redux/reducers/cart/cartReducerActions';
import './plp.css';

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
    const { headerReducer, pricesReducer, pdpReducer, addProductToCart, cartReducer } = this.props;
    const { minicartIsOpen } = cartReducer;
    const { currentCategory } = headerReducer;
    const { currentCurrency } = pricesReducer;
    const { products } = pdpReducer;
    return (
      <section className={minicartIsOpen ? 'container-sm minicart-open' : 'container'}>
        <div className="inner-container">
          <div className="products">
            <h1>{currentCategory}</h1>
            <div>
              <div className="products__grid">
                {products?.map((product) => {
                  return (
                    <ProductListingCard
                      key={product.id}
                      prices={product.prices}
                      product={product}
                      currentCategory={currentCategory}
                      currentCurrency={currentCurrency}
                      addProductToCart={addProductToCart}
                      cartReducer={cartReducer}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
