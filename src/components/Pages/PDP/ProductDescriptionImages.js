import React, { Component } from 'react';

class ProductDescriptionImages extends Component {
  render() {
    const { gallery, productImg, setImage } = this.props;
    return (
      <div className="d-flex">
        <div className="pdp-variats">
          <div className="variant-img-container">
            {gallery &&
              gallery.map((image) => (
                <div
                  aria-hidden="true"
                  key={image}
                  className="variant-img"
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => setImage(image)}
                />
              ))}
          </div>
        </div>
        <div className="pdp-image">
          <div className="variant-main-img" style={{ backgroundImage: `url(${productImg})` }} />
        </div>
      </div>
    );
  }
}

export default ProductDescriptionImages;
