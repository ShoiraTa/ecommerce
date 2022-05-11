import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductListingCard from './ProductListingCard';
import Minicart from '../Cart/Minicart';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
  pricesReducer: state.pricesReducer,
  pdpReducer: state.pdpReducer,
  currentCategory: state.headerReducer.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
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

  setPopup = () => {
    this.setState({
      ...this.state,
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    const { headerReducer, pricesReducer, pdpReducer } = this.props;
    const { showPopup } = this.state;
    const { currentCategory } = headerReducer;
    const { currentCurrency } = pricesReducer;
    const { products } = pdpReducer;
    // console.log(this.props);
    return (
      <section className="container-sm" style={{ position: showPopup ? 'fixed' : null }}>
        <div className="products-listing-wrapper">
          <h1>{currentCategory}</h1>
          {showPopup && <Minicart setPopup={this.setPopup} />}

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
                    setPopup={this.setPopup}
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
