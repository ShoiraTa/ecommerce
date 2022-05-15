import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartSvg, smallArrowDown, greenCartSvg, smallArrowUp } from '../assets/svgIcons';
import { getCategories, setCategory } from '../redux/reducers/header/headerReducerActions';
import { setCurrency, getCurrencies } from '../redux/reducers/global/pricesReducerActions';
import { toggleMinicart } from '../redux/reducers/cart/cartReducerActions';
import NavbarDropdown from './NavbarDropdown';
import Minicart from './Pages/Cart/Minicart';
import './navbar.css';

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
    const { setCategory, headerReducer, pricesReducer, setCurrency, cartReducer, toggleMinicart } = this.props;
    const { categories, currentCategory } = headerReducer;
    const { currentCurrency, currencies } = pricesReducer;
    return (
      <header className="container">
        <div className="inner-container">
          <nav>
            <ul>
              <li className="nav-left">
                <ul>
                  {categories?.map((category) => {
                    const { name } = category;
                    return (
                      <li key={name}>
                        <Link
                          to={name}
                          className={currentCategory === name ? 'nav-left__link-active' : 'c-text'}
                          onClick={() => setCategory(name)}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-middle">
                <Link type="button" to="/">
                  <i>{greenCartSvg}</i>
                </Link>
              </li>
              <li className="nav-right">
                <ul className="relative">
                  <li className="nav-right__currency-wrapper">
                    <button type="button" onClick={this.toggleDropdown}>
                      <span type="button" className="nav-right__currency">
                        {currentCurrency.symbol}
                      </span>
                      {dropdownOpen ? smallArrowUp : smallArrowDown}
                    </button>
                    {dropdownOpen && (
                      <NavbarDropdown
                        setCurrency={setCurrency}
                        currencies={currencies}
                        toggleDropdown={this.toggleDropdown}
                        show={dropdownOpen}
                        onClickOutside={() => this.toggleDropdown()}
                      />
                    )}
                  </li>
                  <li>
                    <button type="button" className="nav-right__cart-svg" onClick={toggleMinicart}>
                      {cartReducer.totalQty ? <div className="nav-right__total">{cartReducer.totalQty}</div> : null}
                      {cartSvg}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <Minicart />
        </div>
      </header>
    );
  }
}

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
  toggleMinicart: () => dispatch(toggleMinicart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
