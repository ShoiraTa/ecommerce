import React, { Component } from 'react';

class ProductDescriptionImages extends Component {
  render() {
    const { gallery, productImg, setImage } = this.props;
    return (
      <div className="pdp__images">
        <div>
          <div className="pdp__variant-img-wrapper">
            {gallery &&
              gallery.map((image) => (
                <div
                  aria-hidden="true"
                  key={image}
                  className="pdp__variant-img"
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => setImage(image)}
                />
              ))}
          </div>
        </div>
        <div>
          <div className="pdp__main-img" style={{ backgroundImage: `url(${productImg})` }} />
        </div>
      </div>
    );
  }
}

export default ProductDescriptionImages;
