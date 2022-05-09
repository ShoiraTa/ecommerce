import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductVariants from '../PDP/ProductVariants';
import { addProductToCart } from '../../../redux/reducers/cart/cartReducerActions';

const mapStateToProps = (state) => ({
  pdpReducer: state.pdpReducer,
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

class Cart extends Component {
  render() {
    const { cartReducer } = this.props;
    console.log(cartReducer.products);
    return (
      <div className="container">
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <div className="cart-products-wrapper">
            {cartReducer.products &&
              cartReducer.products.map((item) => {
                const { product } = item;
                // console.log(product);
                return (
                  <div key={product.id} className="product-wrapper">
                    <ProductVariants
                      brand={product.brand}
                      name={product.name}
                      attributes={product.attributes}
                      description={product.description}
                      productId={product.id}
                      page="cart"
                      gallery={product.gallery}
                      // addProductToCart={addProductToCart}
                      id={product.id}
                      prices={product.prices}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
