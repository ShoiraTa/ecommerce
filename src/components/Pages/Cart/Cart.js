import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductVariants from '../PDP/ProductVariants';
import { addProductToCart, updateQty, getTotal } from '../../../redux/reducers/cart/cartReducerActions';
import './cart.css';

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
    const { cartReducer, updateQty, addProductToCart, page, toggleMinicart } = this.props;
    const { total, products, totalQty, tax } = cartReducer;
    return (
      <div className="container">
        <div className="inner-container">
          <div className="cart">
            {page === 'minicart' ? (
              <h1>
                <strong>My Bag,</strong> <span>{totalQty}&nbsp;items</span>
              </h1>
            ) : (
              <h1>CART</h1>
            )}
            <div className="cart__products">
              {products &&
                products.map((item) => {
                  const { product, selected } = item;
                  return (
                    <div key={selected.selectedId} className="cart__product">
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
              <div className="cart__total-wrapper">
                {total.total ? (
                  <>
                    <div className="cart__total">
                      <div className="cart__total-item">
                        <h4>Tax {tax}%:</h4>
                        <strong>
                          {((total.total / (100 + tax)) * tax).toFixed(2)}
                          {total.symbol}
                        </strong>
                      </div>
                      <div className="cart__total-item">
                        <h4>Quantity:</h4>
                        <strong>{totalQty}</strong>
                      </div>
                      <div className="cart__total-item">
                        <h4>Total:</h4>
                        <strong>
                          {total.symbol}&nbsp;
                          {total.total.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                    <button type="button" className="cart__order-btn">
                      ORDER
                    </button>
                  </>
                ) : (
                  <h3>Your cart is empty. Start adding products!</h3>
                )}
              </div>
            )}

            {page === 'minicart' && (
              <div>
                <div className="minicart__total">
                  <p>Total</p>
                  <p>
                    {total.symbol && total.symbol}&nbsp;
                    {total.total && total.total.toFixed(2)}
                  </p>
                </div>
                <div className="minicart__btn">
                  <Link to="/cart">
                    <button className="btn mincart__view-btn" type="button" onClick={toggleMinicart}>
                      VIEW BAG
                    </button>
                  </Link>
                  <Link to="/cart">
                    <button className="btn minicart__checkout-btn" type="button">
                      CHECK OUT
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
