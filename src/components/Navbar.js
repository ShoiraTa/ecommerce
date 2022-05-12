import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartSvg, smallArrowDown, greenCartSvg, smallArrowUp } from '../assets/svgIcons';
import { getCategories, setCategory } from '../redux/reducers/header/headerReducerActions';
import { setCurrency, getCurrencies } from '../redux/reducers/global/pricesReducerActions';
import NavbarDropdown from './NavbarDropdown';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (currency, symbol) => dispatch(setCurrency(currency, symbol)),
  setCategory: (category) => dispatch(setCategory(category)),
  getCurrencies: () => dispatch(getCurrencies),
  getCategories: () => dispatch(getCategories),
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    const { getCategories, getCurrencies } = this.props;
    getCategories();
    getCurrencies();
  }

  toggleDropdown = () => {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  render() {
    const { dropdownOpen } = this.state;
    const { setCategory, headerReducer, pricesReducer, setCurrency, cartReducer } = this.props;
    const { categories, currentCategory } = headerReducer;
    const { currentCurrency, currencies } = pricesReducer;
    return (
      <header className="container">
        <nav>
          <ul>
            <li className="nav-left-group">
              <ul>
                {categories?.map((category) => {
                  const { name } = category;
                  return (
                    <li key={name}>
                      <Link
                        to={name}
                        className={currentCategory === name ? 'nav-link-active' : 'c-text'}
                        onClick={() => setCategory(name)}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-middle-group">
              <button type="button">
                <i className="cart-icon">{greenCartSvg}</i>
              </button>
            </li>
            <li className="nav-right-group">
              <ul className="relative">
                <li className="d-flex align-items-center nav-currency-wrapper">
                  <button type="button" onClick={this.toggleDropdown}>
                    <span type="button" className="currency">
                      {currentCurrency.symbol}
                    </span>
                    {dropdownOpen ? smallArrowUp : smallArrowDown}
                  </button>
                  {dropdownOpen && (
                    <NavbarDropdown
                      setCurrency={setCurrency}
                      currencies={currencies}
                      toggleDropdown={this.toggleDropdown}
                      show={this.state.dropdownOpen}
                      onClickOutside={() => this.toggleDropdown()}
                    />
                  )}
                </li>
                <li className="cart-svg-wrapper">
                  <Link to="/cart" className="cart-svg">
                    {cartReducer.totalQty ? <div className="cart-total-icon">{cartReducer.totalQty}</div> : null}
                    {cartSvg}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
