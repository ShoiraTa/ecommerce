import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { greenRound } from '../../../assets/svgIcons';

class ProductListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {
        amount: 0,
        label: '',
        symbol: '',
      },
      hoverCart: false,
      hoverAddBtn: false,
    };
  }

  componentDidMount() {
    this.setPrice();
  }

  componentDidUpdate(prevProps) {
    const { currentCurrency } = this.props;
    if (prevProps.currentCurrency !== currentCurrency) {
      this.setPrice();
    }
  }

  setHover = (area) => {
    this.setState({
      ...this.state,
      [area]: !this.state[area],
    });
  };

  setPrice = () => {
    const { prices, currentCurrency } = this.props;
    const price = prices.filter((price) => price.currency.label === currentCurrency.label);
    this.setState({
      ...this.state,
      price: { amount: price[0].amount, label: price[0].currency.label, symbol: price[0].currency.symbol },
    });
  };

  render() {
    const { product, currentCategory, setPopup } = this.props;
    const { hoverCart, hoverAddBtn, price } = this.state;
    return (
      <div className={`listing-card-wrapper ${!product.inStock ? 'listing-card-out' : ''}`}>
        <Link
          to={!product.inStock || hoverAddBtn === true ? '#' : `/${currentCategory}/${product.id}`}
          className={product.inStock ? '' : 'cursor-default'}
          onMouseEnter={() => this.setHover('hoverCart')}
          onMouseLeave={() => this.setHover('hoverCart')}
        >
          <div className="listing-card-img-container">
            <div className="listing-card-img" style={{ backgroundImage: `url(${product.gallery[0]})` }} />
            {!product.inStock && (
              <div className="listing-card-outofstock">
                <p>OUT OF STOCK</p>
              </div>
            )}
          </div>
          <div className="listing-card-desc">
            {hoverCart && product.inStock && (
              <button
                className="listing-card-add-btn"
                type="button"
                onMouseEnter={() => this.setHover('hoverAddBtn')}
                onMouseLeave={() => this.setHover('hoverAddBtn')}
                onClick={() => setPopup()}
              >
                {greenRound}{' '}
              </button>
            )}
            <h3>{product.name}</h3>
            <h4>
              {price.symbol}
              &nbsp;
              {price.amount}
            </h4>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductListingCard;
