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
    console.log(this.props.prices);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCurrency !== this.props.currentCurrency) {
      this.setPrice();
    }
  }

  setPrice = () => {
    const price = this.props.prices.filter((price) => price.currency.label === this.props.currentCurrency.label);
    console.log(price[0]);
    this.setState({
      ...this.state,
      price: { amount: price[0].amount, label: price[0].currency.label, symbol: price[0].currency.symbol },
    });
  };

  render() {
    const { product, currentCategory } = this.props;

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
            {this.state.hover && product.inStock && <button type="button">{greenRound} </button>}
            <h3>{product.name}</h3>
            <h4>
              {this.state.price.symbol}
              &nbsp;
              {this.state.price.amount}
            </h4>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductListingCard;
