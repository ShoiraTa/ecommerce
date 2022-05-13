import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductListingCard from './ProductListingCard';
import { addProductToCart } from '../../../redux/reducers/cart/cartReducerActions';
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
});

class ProductListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

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

  toggleMinicart = () => {
    this.setState({
      ...this.state,
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    const { headerReducer, pricesReducer, pdpReducer, addProductToCart, cartReducer } = this.props;
    const { showPopup } = this.state;
    const { currentCategory } = headerReducer;
    const { currentCurrency } = pricesReducer;
    const { products } = pdpReducer;
    // console.log(this.props);
    return (
      <section className={showPopup ? 'container-sm pdp-minicart-open' : 'container-sm'}>
        <div className="products-listing-wrapper">
          <h1>{currentCategory}</h1>
          {showPopup && <Minicart show={this.state.showPopup} onClickOutside={() => this.toggleMinicart()} />}

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
                    toggleMinicart={this.toggleMinicart}
                    showPopup={showPopup}
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
