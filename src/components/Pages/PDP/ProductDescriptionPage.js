import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductVariants from './ProductVariants';
import ProductDescriptionImages from './ProductDescriptionImages';
import { addProductToCart } from '../../../redux/reducers/cart/cartReducerActions';
import './pdp.css';

function withParams(PureComponent) {
  return (props) => <PureComponent {...props} params={useParams()} />;
}

class ProductDescriptionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productImg: '',
    };
  }

  componentDidMount() {
    const { getProduct, params } = this.props;
    const { productId } = params;
    getProduct(productId);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { pdpReducer } = this.props;
    if (prevProps.pdpReducer.product.gallery !== pdpReducer.product.gallery && !pdpReducer.productLoading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
  }

  render() {
    const { pdpReducer, pricesReducer, addProductToCart, params, cartReducer } = this.props;
    const { productImg } = this.state;
    const { productLoading, product } = pdpReducer;
    const { minicartIsOpen } = cartReducer;
    const { gallery } = product;
    const { productId } = params;

    return !productLoading && pricesReducer.pricesLoading ? (
      <div className="text-center">Loading...</div>
    ) : (
      <section className={minicartIsOpen ? 'container minicart-open' : 'container'}>
        <div className="inner-container">
          <div className="pdp__wrapper">
            <ProductDescriptionImages
              gallery={gallery}
              productImg={productImg}
              setImage={(image) => this.setState({ productImg: image })}
              productName={product.name}
            />
            <ProductVariants product={product} addProductToCart={addProductToCart} productId={productId} page="pdp" />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  pdpReducer: state.pdpReducer,
  pricesReducer: state.pricesReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDescriptionPage));
