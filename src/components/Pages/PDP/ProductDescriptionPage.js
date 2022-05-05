import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductVariants from './ProductVariants';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const mapStateToProps = (state) => ({
  pdpReducer: state.pdpReducer,
  pricesReducer: state.pricesReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
  getProductPrice: (id) => dispatch(getProductPrice(id)),
});

class ProductDescriptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImg: '',
    };
  }

  componentDidMount() {
    const { productId } = this.props.params;
    const { getProduct, pdpReducer, pricesReducer, getProductPrice } = this.props;
    getProduct(productId);
    if (!pdpReducer.pdpLoading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
      getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
    }
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props.params;
    const { pdpReducer, pricesReducer, getProductPrice } = this.props;
    if (prevProps.pdpReducer.product.gallery !== pdpReducer.product.gallery && !pdpReducer.pdpLoading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
    if (prevProps.pricesReducer.currentCurrency.label !== pricesReducer.currentCurrency.label) {
      getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
    }
  }

  render() {
    const { pdpReducer, pricesReducer } = this.props;
    const { pdpLoading, product } = pdpReducer;
    const { gallery, brand, name, attributes, description } = product;
    const { productImg } = this.state;

    return pdpLoading && pricesReducer.pricesLoading ? (
      <div className="text-center">Loading...</div>
    ) : (
      <div className="container">
        <div className="pdp-wrapper">
          <div className="pdp-variats">
            <div className="variant-img-container">
              {gallery &&
                gallery.map((image) => (
                  <div
                    aria-hidden="true"
                    key={image}
                    className="variant-img"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => this.setState({ productImg: image })}
                  />
                ))}
            </div>
          </div>
          <div className="pdp-image">
            <div className="variant-main-img" style={{ backgroundImage: `url(${productImg})` }} />
          </div>
          <ProductVariants
            brand={brand}
            name={name}
            attributes={attributes}
            description={description}
            price={pricesReducer.productPrice}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDescriptionPage));
