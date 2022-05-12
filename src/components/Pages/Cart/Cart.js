import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const { cartReducer, updateQty, addProductToCart, page } = this.props;
    const { total, products, totalQty, tax } = cartReducer;
    return (
      <div className="container">
        <div className="cart-wrapper">
          {page === 'minicart' ? (
            <h1>
              <strong>My Bag,</strong> <span>{totalQty}items</span>
            </h1>
          ) : (
            <h1>CART</h1>
          )}

          <div className="cart-products-wrapper">
            {products &&
              products.map((item) => {
                const { product, selected } = item;
                return (
                  <div key={selected.selectedId} className="product-wrapper">
                    <ProductVariants
                      productId={product.id}
                      product={product}
                      page={page === 'minicart' ? 'minicart' : 'cart'}
                      updateQty={updateQty}
                      qty={selected.qty}
                      cartSelectedAttributes={selected.selectedAttrtibutes}
                      selectedId={selected.selectedId}
                      addProductToCart={addProductToCart}
                    />
                  </div>
                );
              })}
          </div>
          {page !== 'minicart' && (
            <div>
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
          )}

          {page === 'minicart' && (
            <div className="minicart-footer">
              <div className="minicart-total">
                <p>Total</p>
                <p>
                  {total.symbol && total.symbol}&nbsp;
                  {total.total && total.total.toFixed(2)}
                </p>
              </div>
              <div className="minicart-btn">
                <Link to="/cart">
                  <button className="btn view-bag-btn" type="button">
                    {' '}
                    VIEW BAG
                  </button>
                </Link>
                <Link to="/cart">
                  <button className="btn checkout-btn" type="button">
                    {' '}
                    CHECK OUT
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
