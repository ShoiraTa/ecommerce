import React, { Component } from 'react';
import Cart from './Cart';

class Minicart extends Component {
  render() {
    const { setPopup } = this.props;
    return (
      <div aria-hidden="true" className="minicart-wrapper" onClick={setPopup} onKeyDown={setPopup}>
        <div className="minicart">
          <Cart page="minicart" onClick={(e) => e.stopPropagation()} />
        </div>
      </div>
    );
  }
}

export default Minicart;
