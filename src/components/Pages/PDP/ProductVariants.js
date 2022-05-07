import React, { Component } from 'react';
import Attributes from './Attributes';

class ProductVariants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttrtibutes: [],
    };
  }

  filterDescription = (desc) => {
    return desc.replace(/<\/?p[^>]*>/g, '');
  };

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

  render() {
    const { brand, name, attributes, description, id, price, addProductToCart } = this.props;
    return (
      <div className="pdp-desc">
        <div className="pdp-desc-header">
          <h1 className="desc-brand">{brand}</h1>
          <h3 className="desc-product-name">{name}</h3>
        </div>
        <Attributes
          attributes={attributes}
          setAttributes={this.setAttributes}
          selectedAttrtibutes={this.state.selectedAttrtibutes}
        />
        <div className="desc-price">
          <h3 className="desc-h5">PRICE</h3>
          <div className="desc-priceBox">
            {price && price.symbol}
            {price && price.amount}
          </div>
        </div>
        <div className="desc-add-cart">
          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addProductToCart({ selectedAttrtibutes: this.state.selectedAttrtibutes, id })}
          >
            ADD TO CART
          </button>
        </div>
        <div className="desc-product-desc">
          <p>{description && this.filterDescription(description)}</p>
        </div>
      </div>
    );
  }
}

export default ProductVariants;
