import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartSvg, smallArrowDown, greenCartSvg, smallArrowUp } from '../assets/svgIcons';
import { setCurrency, getCurrencies, getCategories, setCategory } from '../redux/reducers/header/headerReducerActions';

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
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
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { dropdownOpen } = this.state;
    const { currentCurrency, currencies, categories, currentCategory } = this.props.headerReducer;
    return (
      <header className="container">
        <nav>
          <ul>
            <li className="nav-left-group">
              <ul>
                {categories?.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.name}
                      className={currentCategory === category.name ? 'nav-link-active' : 'c-text'}
                      onClick={() => this.props.setCategory(category.name)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-middle-group">
              <button type="button">
                <i className="cart-icon">{greenCartSvg}</i>
              </button>
            </li>
            <li className="nav-right-group">
              <ul className="relative">
                <li className="d-flex align-items-center">
                  <button type="button" onClick={this.toggleDropdown}>
                    <span type="button" className="currency">
                      {currentCurrency.symbol}
                    </span>
                    {dropdownOpen ? smallArrowUp : smallArrowDown}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown">
                      {currencies.map((currency, i) => {
                        return (
                          <li key={currency.label}>
                            <button
                              type="button"
                              className={i % 2 === 1 ? 'b-gray' : ''}
                              onClick={() => {
                                this.props.setCurrency(currency.label, currency.symbol);
                                this.toggleDropdown();
                              }}
                            >
                              <span>{currency.symbol}</span>
                              &nbsp;&nbsp;
                              <span>{currency.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <li>{cartSvg}</li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
