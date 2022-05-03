import React, { Component } from 'react';

class ProductListingCard extends Component {
  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <div className="listing-card-wrapper">
        <div className="listing-card-img-container">
          <div className="listing-card-img" style={{ backgroundImage: `url(${product.gallery[0]})` }} />
        </div>
        <div className="listing-card-desc">
          <h3>{product.name}</h3>
          <h4>$ 13</h4>
        </div>
      </div>
    );
  }
}

export default ProductListingCard;
