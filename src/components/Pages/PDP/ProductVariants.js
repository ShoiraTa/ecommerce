import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';
import Attributes from './Attributes';
import { plusSquare, minusSquare } from '../../../assets/svgIcons';
import Slider from '../Cart/Slider';

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
    const { brand, name, attributes, description, gallery, id, inStock } = product;
    return (
      <div className="pdp-variants">
        <div className="pdp-variants__wrapper">
          <div className="pdp-variants__header">
            <h1 className="pdp-variants__brand">{brand}</h1>
            <h3 className="pdp-variants__name">{name}</h3>
          </div>
          <div>
            {page !== 'pdp' && (
              <div className="pdp-variants__price-wrapper">
                <div className="pdp-variants__price">{this.setPrice()}</div>
              </div>
            )}
            <Attributes
              inStock={inStock}
              attributes={attributes}
              setAttributes={this.setAttributes}
              selectedAttrtibutes={selectedAttrtibutes}
              cartSelectedAttributes={cartSelectedAttributes}
              page={page}
            />
          </div>

          {page === 'pdp' && (
            <>
              <div className="pdp-variants__price-wrapper pdp-variants__price-wrapper-margin">
                <h3 className="pdp-variant__header">PRICE</h3>
                <div className="pdp-variants__price">{this.setPrice()}</div>
              </div>
              <div className="pdp-variants__add">
                {!inStock && <p className="warning-text">Temporarily out of stock.</p>}
                {inStock && (
                  <button
                    type="button"
                    className="pdp-variants__add-btn"
                    disabled={!inStock}
                    onClick={() => this.addProduct({ selectedAttrtibutes, id, selectedId: id + cartReducer.totalQty })}
                  >
                    ADD TO CART
                  </button>
                )}
                {!allAttrSelected && <p className="warning-text">Please select all attributes</p>}
              </div>
              <div className="pdp-variants__product-description">
                <div>{ReactHtmlParser(description)} </div>
              </div>
            </>
          )}
        </div>
        {page !== 'pdp' && (
          <div className="cart-slider">
            <div className="cart-slider__buttons">
              <button type="button" onClick={() => updateQty(selectedId, 'add')}>
                {plusSquare}
              </button>
              <span className="cart-slider__item-qty">{qty}</span>
              <button type="button" onClick={() => updateQty(selectedId, 'substract')}>
                {minusSquare}
              </button>
            </div>
            <Slider page={page} gallery={gallery} productName={name} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProductPrice: (id) => dispatch(getProductPrice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariants);
