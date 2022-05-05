import React, { Component } from 'react';

class ProductVariants extends Component {
  render() {
    const { brand, name, attributes, description } = this.props;
    console.log(attributes);
    return (
      <div className="pdp-desc">
        <div className="pdp-desc-header">
          <h1 className="desc-brand">{brand}</h1>
          <h3 className="desc-product-name">{name}</h3>
        </div>
        <div>
          <h5 className="desc-h5">SIZE:</h5>
          <div className="sizes-container">
            {attributes[0] &&
              attributes[0].items.map((attr) => (
                <button type="button" className="size-box" key={attr.displayValue}>
                  {attr.displayValue}
                </button>
              ))}
          </div>
        </div>
        <div>
          <h5 className="desc-h5">COLOR: </h5>
        </div>
        <div className="desc-price">price</div>
        <div className="desc-add-cart">
          <button type="button" className="add-cart-btn">
            ADD TO CART
          </button>
        </div>
        <div className="desc-product-desc">
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default ProductVariants;
