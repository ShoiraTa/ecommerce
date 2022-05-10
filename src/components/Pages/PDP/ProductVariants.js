import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';
import Attributes from './Attributes';
import { plusSquare, minusSquare } from '../../../assets/svgIcons';
import Slider from '../Cart/Slider';

const mapStateToProps = (state) => ({
  pricesReducer: state.pricesReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProductPrice: (id) => dispatch(getProductPrice(id)),
});

class ProductVariants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttrtibutes: [],
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    const { pricesReducer, getProductPrice } = this.props;
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
    const existingProduct =
      this.state.selectedAttrtibutes &&
      this.state.selectedAttrtibutes.filter((selectedAttrtibutes) => selectedAttrtibutes.label === attr.label);

    if (existingProduct.length === 1) {
      this.setState((prevState) => ({
        selectedAttrtibutes: prevState.selectedAttrtibutes.map((selectedAttrtibutes) =>
          selectedAttrtibutes.label === attr.label
            ? { ...selectedAttrtibutes, selected: attr.selected }
            : selectedAttrtibutes
        ),
      }));
    } else {
      this.setState({ selectedAttrtibutes: [...this.state.selectedAttrtibutes, attr] });
    }
  };

  filterDescription = (desc) => {
    return desc.replace(/<\/?p[^>]*>/g, '');
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
    const {
      brand,
      name,
      attributes,
      description,
      id,
      addProductToCart,
      page,
      gallery,
      qty,
      updateQty,
      cartSelectedAttributes,
    } = this.props;

    // console.log(pricesReducer.productPrice);
    return (
      <div className="pdp-variants">
        <div className="pdp-variants-wrapper">
          <div className="pdp-variants-header">
            <h1 className="variants-brand">{brand}</h1>
            <h3 className="variants-product-name">{name}</h3>
          </div>
          <Attributes
            attributes={attributes}
            setAttributes={this.setAttributes}
            selectedAttrtibutes={this.state.selectedAttrtibutes}
            cartSelectedAttributes={cartSelectedAttributes}
            page={page}
          />
          <div className="variants-price">
            <h3 className="variants-h5">PRICE</h3>
            <div className="variants-priceBox">{this.setPrice()}</div>
          </div>
          {page === 'pdp' && (
            <div className="variants-add-cart">
              <button
                type="button"
                className="add-cart-btn"
                onClick={() => addProductToCart({ selectedAttrtibutes: this.state.selectedAttrtibutes, id, qty: 1 })}
              >
                ADD TO CART
              </button>
            </div>
          )}
          <div className="variants-product-variants">
            <p>{description && this.filterDescription(description)}</p>
          </div>
        </div>
        {page === 'cart' && (
          <div className="cart-slider">
            <div className="cart-buttons-wrapper">
              <button type="button" onClick={() => updateQty(id, 'substract')}>
                {plusSquare}
              </button>
              <span className="cart-item-qty">{qty}</span>
              <button type="button" onClick={() => updateQty(id, 'add')}>
                {minusSquare}
              </button>
            </div>
            <Slider gallery={gallery} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariants);
