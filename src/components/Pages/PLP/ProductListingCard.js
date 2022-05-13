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

  setHoverCart = () => {
    this.setState({
      ...this.state,
      hoverCart: !this.state.hoverCart,
    });
  };

  addProduct = (e, product, id) => {
    e.preventDefault();
    const { addProductToCart } = this.props;
    let selectedAttrtibutes = [];
    product.attributes.forEach((attr) => {
      selectedAttrtibutes = [...selectedAttrtibutes, { label: attr.id, selected: attr.items[0].value }];
    });

    addProductToCart({ selectedAttrtibutes, id, selectedId: id + 0, qty: 1 });
    this.props.toggleMinicart();
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
    const { product, currentCategory } = this.props;
    const { hoverCart, hoverAddBtn, price } = this.state;
    return (
      <div className={`listing-card-wrapper ${!product.inStock ? 'listing-card-out' : ''}`}>
        <Link
          to={!product.inStock || hoverAddBtn === true ? '#' : `/${currentCategory}/${product.id}`}
          className={product.inStock ? '' : 'cursor-default'}
          onMouseEnter={() => this.setHoverCart()}
          onMouseLeave={() => this.setHoverCart()}
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
                onClick={(e) => this.addProduct(e, product, product.id)}
              >
                {greenRound}
              </button>
            )}
            <h3>
              {product.brand}
              &nbsp;
              {product.name}
            </h3>
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
