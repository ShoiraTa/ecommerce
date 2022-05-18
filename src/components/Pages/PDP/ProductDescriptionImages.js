import React, { Component } from 'react';

class ProductDescriptionImages extends Component {
  render() {
    const { gallery, productImg, setImage, productName } = this.props;
    return (
      <div className="pdp__images">
        <div>
          <div className="pdp__variant-img-wrapper">
            {gallery &&
              gallery.map((image) => (
                <img
                  className="pdp__variant-img"
                  src={`${image}`}
                  alt={productName}
                  onClick={() => setImage(image)}
                  key={image}
                  aria-hidden="true"
                />
              ))}
          </div>
        </div>
        <div>
          <img className="pdp__main-img" src={`${productImg}`} alt={productName} />
        </div>
      </div>
    );
  }
}

export default ProductDescriptionImages;
