import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/plp/plpReducerActions';
import ProductListingCard from './ProductListingCard';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
  plpReducer: state.plpReducer,
  currentCategory: state.headerReducer.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
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
    const { headerReducer, plpReducer } = this.props;
    const { currentCategory, currentCurrency } = headerReducer;
    const { products } = plpReducer;
    return (
      <section className="container-sm">
        <div className="products-listing-wrapper">
          <h1>{currentCategory}</h1>
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
