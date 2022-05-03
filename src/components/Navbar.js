import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartSvg, smallArrowDown, greenCartSvg, smallArrowUp } from '../assets/svgIcons';
import { setCurrency } from '../redux/reducers/header/headerReducerActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'women',
      dropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { active, dropdownOpen } = this.state;
    const { symbol } = this.props.headerReducer;
    return (
      <header className="container">
        <nav>
          <ul>
            <li className="nav-left-group">
              <ul>
                <li>
                  <Link
                    to="/women"
                    className={active === 'women' ? 'nav-link-active' : 'c-text'}
                    onClick={() => this.setState({ active: 'women' })}
                  >
                    WOMEN
                  </Link>
                </li>
                <li>
                  <Link
                    to="/men"
                    className={active === 'men' ? 'nav-link-active' : 'c-text'}
                    onClick={() => this.setState({ active: 'men' })}
                  >
                    MEN
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kids"
                    className={active === 'kids' ? 'nav-link-active' : 'c-text'}
                    onClick={() => this.setState({ active: 'kids' })}
                  >
                    KIDS
                  </Link>
                </li>
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
                      {symbol}
                    </span>
                    {dropdownOpen ? smallArrowUp : smallArrowDown}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown">
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            this.props.setCurrency('USD', '$');
                            this.toggleDropdown();
                          }}
                        >
                          $ USD
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="b-gray"
                          onClick={() => {
                            this.props.setCurrency('EUR', '€');
                            this.toggleDropdown();
                          }}
                        >
                          € EUR
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            this.props.setCurrency('JPY', '¥');
                            this.toggleDropdown();
                          }}
                        >
                          ¥ JPY
                        </button>
                      </li>
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

const mapStateToProps = (state) => ({
  headerReducer: state.headerReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency, symbol) => dispatch(setCurrency(currency, symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
