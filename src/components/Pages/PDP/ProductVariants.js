import React, { Component } from 'react';
import Attributes from '../../Attributes';

class ProductVariants extends Component {
  filterDescription = (desc) => {
    console.log(desc);
    return desc.replace(/<\/?p[^>]*>/g, '');
  };

  render() {
    const { brand, name, attributes, description, price } = this.props;
    return (
      <div className="pdp-desc">
        <div className="pdp-desc-header">
          <h1 className="desc-brand">{brand}</h1>
          <h3 className="desc-product-name">{name}</h3>
        </div>
        <Attributes attributes={attributes} />
        <div className="desc-price">
          <h3 className="desc-h5">PRICE</h3>
          <div className="desc-priceBox">
            {price && price.symbol}
            {price && price.amount}
          </div>
        </div>
        <div className="desc-add-cart">
          <button type="button" className="add-cart-btn">
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
