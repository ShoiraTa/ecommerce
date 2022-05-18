import React, { Component } from 'react';

class NavbarDropdown extends Component {
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
    const { currencies, setCurrency, toggleDropdown } = this.props;
    if (!this.props.show) return null;
    return (
      <div className="dropdown">
        <div ref={this.ref}>
          <ul className="dropdown__menu">
            {currencies.map((currency, i) => {
              return (
                <li key={currency.label}>
                  <button
                    type="button"
                    className={i % 2 === 1 ? 'b-gray' : ''}
                    onClick={() => {
                      setCurrency(currency.label, currency.symbol);
                      toggleDropdown();
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
        </div>
      </div>
    );
  }
}

export default NavbarDropdown;
