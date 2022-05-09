import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';
import Attributes from './Attributes';
import { plusSquare, minusSquare, sliderPrev, sliderNext } from '../../../assets/svgIcons';

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
      slider: {
        imageIdx: 0,
        prevActive: false,
        nextActive: true,
      },
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

  setSlider = (gallery, action) => {
    const { slider } = this.state;
    const next = gallery > slider.imageIdx + 1;
    if (action === 'next' && next) {
      this.setState({
        ...this.state,
        slider: {
          imageIdx: slider.imageIdx + 1,
        },
      });
    } else if (action === 'prev') {
      this.setState({
        ...this.state,
        slider: { imageIdx: slider.imageIdx && slider.imageIdx - 1 },
      });
    }
  };

  filterDescription = (desc) => {
    return desc.replace(/<\/?p[^>]*>/g, '');
  };

  render() {
    const { brand, name, attributes, description, id, addProductToCart, pricesReducer, page, gallery } = this.props;
    const { slider } = this.state;
    console.log(slider);
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
          />
          <div className="variants-price">
            <h3 className="variants-h5">PRICE</h3>
            <div className="variants-priceBox">
              {pricesReducer.productPrice.amount && pricesReducer.productPrice.symbol}
              {pricesReducer.productPrice.amount && pricesReducer.productPrice.amount}
            </div>
          </div>
          <div className="variants-add-cart">
            {page === 'pdp' && (
              <button
                type="button"
                className="add-cart-btn"
                onClick={() => addProductToCart({ selectedAttrtibutes: this.state.selectedAttrtibutes, id })}
              >
                ADD TO CART
              </button>
            )}
          </div>
          <div className="variants-product-variants">
            <p>{description && this.filterDescription(description)}</p>
          </div>
        </div>
        {page === 'cart' && (
          <div className="cart-slider">
            <div className="cart-buttons-wrapper">
              <button type="button">{plusSquare}</button>
              <span className="cart-item-qty">1</span>
              <button type="button">{minusSquare}</button>
            </div>
            <div className="cart-images-wrapper" style={{ backgroundImage: `url(${gallery[slider.imageIdx]})` }}>
              <div className="slider-buttons-wrapper">
                <button type="button" className="slider-prev" onClick={() => this.setSlider(gallery.length, 'prev')}>
                  {sliderPrev}
                </button>
                <button type="button" className="slider-next" onClick={() => this.setSlider(gallery.length, 'next')}>
                  {sliderNext}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariants);
