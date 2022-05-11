import React, { Component } from 'react';
import { sliderPrev, sliderNext } from '../../../assets/svgIcons';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: {
        imageIdx: 0,
        prevActive: false,
        nextActive: true,
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
        slider: { imageIdx: slider.imageIdx && slider.imageIdx - 1 },
      });
    }
  };

  render() {
    const { gallery, page } = this.props;
    const { slider } = this.state;
    return (
      <div className="cart-images-wrapper" style={{ backgroundImage: `url(${gallery[slider.imageIdx]})` }}>
        {page === 'cart' && (
          <div className="slider-buttons-wrapper">
            <button type="button" className="slider-prev" onClick={() => this.setSlider(gallery.length, 'prev')}>
              {sliderPrev}
            </button>
            <button type="button" className="slider-next" onClick={() => this.setSlider(gallery.length, 'next')}>
              {sliderNext}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Slider;
