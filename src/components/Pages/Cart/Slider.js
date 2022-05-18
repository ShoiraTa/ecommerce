import React, { Component } from 'react';
import { sliderPrev, sliderNext } from '../../../assets/svgIcons';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: {
        imageIdx: 0,
      },
    };
  }

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
        slider: {
          imageIdx: slider.imageIdx && slider.imageIdx - 1,
        },
      });
    }
  };

  render() {
    const { gallery, page, productName } = this.props;
    const { slider } = this.state;

    return (
      <>
        <img className="cart__images-wrapper" src={`${gallery[slider.imageIdx]}`} alt={productName} />
        {page === 'cart' && gallery.length > 1 && (
          <div>
            <button type="button" className="cart-slider__prev" onClick={() => this.setSlider(gallery.length, 'prev')}>
              {sliderPrev}
            </button>
            <button type="button" className="cart-slider__next" onClick={() => this.setSlider(gallery.length, 'next')}>
              {sliderNext}
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Slider;
