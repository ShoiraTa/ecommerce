import React, { Component } from 'react';
import Cart from './Cart';
import './cart.css';

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
      return this.props.toggleMinicart && this.props.toggleMinicart();
    }
    return null;
  }

  render() {
    const { show, toggleMinicart } = this.props;
    console.log(this.props);
    if (!show) return null;
    return (
      <div aria-hidden="true" className="minicart__wrapper">
        <div className="minicart__background">
          <div className="minicart" ref={this.ref}>
            <Cart page="minicart" toggleMinicart={toggleMinicart} />
          </div>
        </div>
      </div>
    );
  }
}

export default Minicart;
