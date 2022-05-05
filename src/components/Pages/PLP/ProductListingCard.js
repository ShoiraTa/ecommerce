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
      hover: false,
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

  setPrice = () => {
    const { prices, currentCurrency } = this.props;
    const price = prices.filter((price) => price.currency.label === currentCurrency.label);
    this.setState({
      ...this.state,
      price: { amount: price[0].amount, label: price[0].currency.label, symbol: price[0].currency.symbol },
    });
  };

  render() {
    const { product, currentCategory } = this.props;
    const { hover, price } = this.state;
    return (
      <div className={`listing-card-wrapper ${!product.inStock ? 'listing-card-out' : ''}`}>
        <Link
          to={!product.inStock ? '#' : `/${currentCategory}/${product.id}`}
          className={product.inStock ? '' : 'cursor-default'}
          onMouseEnter={() => this.setState({ ...this.state, hover: true })}
          onMouseLeave={() => this.setState({ ...this.state, hover: false })}
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
            {hover && product.inStock && <button type="button">{greenRound} </button>}
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
