import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryProducts } from '../../../redux/reducers/plp/plpReducerActions';
import ProductListingCard from './ProductListingCard';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
  plpReducer: state.plpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
});

class ProductListingPage extends Component {
  componentDidMount() {
    const { getCategoryProducts } = this.props;
    getCategoryProducts(this.props.headerReducer.currentCategory);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.headerReducer.currentCategory !== this.props.headerReducer.currentCategory) {
      const { getCategoryProducts } = this.props;
      getCategoryProducts(this.props.headerReducer.currentCategory);
    }
  }

  render() {
    const { currentCategory } = this.props.headerReducer;
    const { products } = this.props.plpReducer;
    return (
      <section className="container-sm">
        <div className="products-listing-wrapper">
          <h1>{currentCategory}</h1>
          <div className="products-wrapper">
            {products?.map((product) => (
              <ProductListingCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
