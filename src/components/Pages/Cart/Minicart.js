import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
import { toggleMinicart } from '../../../redux/reducers/cart/cartReducerActions';
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
      const { toggleMinicart } = this.props;
      return toggleMinicart && toggleMinicart();
    }
    return null;
  }

  render() {
    const { toggleMinicart, cartReducer } = this.props;
    const { minicartIsOpen } = cartReducer;
    return (
      minicartIsOpen && (
        <div aria-hidden="true" className="minicart__wrapper">
          <div className="minicart__background">
            <div className="minicart" ref={this.ref}>
              <Cart page="minicart" toggleMinicart={toggleMinicart} />
            </div>
          </div>
        </div>
      )
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  toggleMinicart: () => dispatch(toggleMinicart()),
});

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer,
});
export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
