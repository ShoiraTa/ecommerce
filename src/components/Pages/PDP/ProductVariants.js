import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';
import Attributes from './Attributes';
import { plusSquare, minusSquare } from '../../../assets/svgIcons';
import Slider from '../Cart/Slider';

const mapStateToProps = (state) => ({
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProductPrice: (id) => dispatch(getProductPrice(id)),
});

class ProductVariants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttrtibutes: [],
      allAttrSelected: true,
    };
  }

  componentDidMount() {
    const { pricesReducer, getProductPrice, productId } = this.props;
    getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    const { pricesReducer, getProductPrice } = this.props;
    if (prevProps.pricesReducer.currentCurrency.label !== pricesReducer.currentCurrency.label) {
      getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
    }
  }

  setAttributes = (attr) => {
    const { selectedAttrtibutes } = this.state;
    this.setState({ ...this.state, allAttrSelected: true });
    const existingProduct =
      selectedAttrtibutes &&
      selectedAttrtibutes.filter((selectedAttrtibutes) => selectedAttrtibutes.label === attr.label);

    if (existingProduct.length === 1) {
      this.setState((prevState) => ({
        selectedAttrtibutes: prevState.selectedAttrtibutes.map((selectedAttrtibutes) =>
          selectedAttrtibutes.label === attr.label
            ? { ...selectedAttrtibutes, selected: attr.selected }
            : selectedAttrtibutes
        ),
      }));
    } else {
      this.setState({ selectedAttrtibutes: [...selectedAttrtibutes, attr] });
    }
  };

  addProduct = ({ selectedAttrtibutes, id, selectedId }) => {
    const { product, addProductToCart } = this.props;
    if (selectedAttrtibutes.length === product.attributes.length) {
      addProductToCart({ selectedAttrtibutes, id, selectedId, qty: 1 });
    } else this.setState({ ...this.state, allAttrSelected: false });
  };

  setPrice = () => {
    const { productId, pricesReducer } = this.props;
    const { productPrice } = pricesReducer;
    return Object.values(productPrice).map((product) => {
      if (product.id === productId) {
        return (
          <span key={product.amount}>
            {product.symbol}
            {product.amount}
          </span>
        );
      }
      return null;
    });
  };

  render() {
    const { page, qty, updateQty, cartSelectedAttributes, product, cartReducer, selectedId } = this.props;
    const { selectedAttrtibutes, allAttrSelected } = this.state;
    const { brand, name, attributes, description, gallery, id } = product;
    return (
      <div className="pdp-variants">
        <div className="pdp-variants-wrapper">
          <div className="pdp-variants-header">
            <h1 className="variants-brand">{brand}</h1>
            <h3 className="variants-product-name">{name}</h3>
          </div>
          <div>
            {page !== 'pdp' && (
              <div className="variants-price">
                <div className="variants-priceBox">{this.setPrice()}</div>
              </div>
            )}
            <Attributes
              attributes={attributes}
              setAttributes={this.setAttributes}
              selectedAttrtibutes={selectedAttrtibutes}
              cartSelectedAttributes={cartSelectedAttributes}
              page={page}
            />
          </div>

          {page === 'pdp' && (
            <>
              <div className="variants-price" style={{ marginTop: '40px' }}>
                <h3 className="variants-h5">PRICE</h3>
                <div className="variants-priceBox">{this.setPrice()}</div>
              </div>
              <div className="variants-add-cart">
                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={() => this.addProduct({ selectedAttrtibutes, id, selectedId: id + cartReducer.totalQty })}
                >
                  ADD TO CART
                </button>
                {!allAttrSelected && <p className="warning-text">Please select all attributes</p>}
              </div>
              <div className="variants-product-variants">
                <div>{ReactHtmlParser(description)} </div>
              </div>
            </>
          )}
        </div>
        {page !== 'pdp' && (
          <div className="cart-slider">
            <div className="cart-buttons-wrapper">
              <button type="button" onClick={() => updateQty(selectedId, 'add')}>
                {plusSquare}
              </button>
              <span className="cart-item-qty">{qty}</span>
              <button type="button" onClick={() => updateQty(selectedId, 'substract')}>
                {minusSquare}
              </button>
            </div>
            <Slider page={page} gallery={gallery} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariants);
