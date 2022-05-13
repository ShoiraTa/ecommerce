import React, { Component } from 'react';
import Cart from './Cart';
import './minicart.css';

class Minicart extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      return this.props.onClickOutside && this.props.onClickOutside();
    }
    return null;
  }

  render() {
    const { toggleMinicart } = this.props;
    if (!this.props.show) return null;
    return (
      <div aria-hidden="true" className="minicart-wrapper">
        <div className="minicart" ref={this.ref}>
          <Cart page="minicart" toggleMinicart={toggleMinicart} />
        </div>
      </div>
    );
  }
}

export default Minicart;
