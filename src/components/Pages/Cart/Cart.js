import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductVariants from '../PDP/ProductVariants';
import { addProductToCart, updateQty, getTotal } from '../../../redux/reducers/cart/cartReducerActions';

const mapStateToProps = (state) => ({
  pdpReducer: state.pdpReducer,
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  updateQty: (id, action) => dispatch(updateQty(id, action)),
  getTotal: (label) => dispatch(getTotal(label)),
});

class Cart extends Component {
  componentDidMount() {
    const { pricesReducer, getTotal } = this.props;
    getTotal(pricesReducer.currentCurrency.symbol);
  }

  componentDidUpdate(prevProps) {
    const { pricesReducer, getTotal, cartReducer } = this.props;
    if (
      prevProps.pricesReducer.currentCurrency.label !== pricesReducer.currentCurrency.label ||
      prevProps.cartReducer.totalQty !== cartReducer.totalQty
    ) {
      getTotal(pricesReducer.currentCurrency.symbol);
    }
  }

  render() {
    const { cartReducer, updateQty, addProductToCart } = this.props;
    const { total, products, totalQty, tax } = cartReducer;
    return (
      <div className="container">
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <div className="cart-products-wrapper">
            {products &&
              products.map((item) => {
                const { product } = item;
                const { selected } = item;
                return (
                  <div key={product.id + selected.selectedAttrtibutes[0].selected} className="product-wrapper">
                    <ProductVariants
                      productId={product.id}
                      product={product}
                      page="cart"
                      updateQty={updateQty}
                      qty={selected.qty}
                      cartSelectedAttributes={selected.selectedAttrtibutes}
                      addProductToCart={addProductToCart}
                    />
                  </div>
                );
              })}
          </div>
          {total.total ? (
            <div className="cart-total">
              <h4>
                Tax {tax}%:&nbsp;
                <strong>
                  {((total.total / (100 + tax)) * tax).toFixed(2)}
                  {total.symbol}
                </strong>
              </h4>
              <h4>
                Quantity:&nbsp;<strong>{totalQty}</strong>
              </h4>
              <h4>
                Total:&nbsp;
                <strong className="cart-total-item">
                  {total.symbol}&nbsp;
                  {total.total.toFixed(2)}
                </strong>
              </h4>
              <button type="button" className="cart-order-btn">
                ORDER
              </button>
            </div>
          ) : (
            <h3>Your cart is empty. Start adding products!</h3>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
