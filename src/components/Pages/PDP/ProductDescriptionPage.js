import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductVariants from './ProductVariants';
import ProductDescriptionImages from './ProductDescriptionImages';
import { addProductToCart } from '../../../redux/reducers/cart/cartReducerActions';

function withParams(PureComponent) {
  return (props) => <PureComponent {...props} params={useParams()} />;
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

class ProductDescriptionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productImg: '',
    };
  }

  componentDidMount() {
    const { productId } = this.props.params;
    const { getProduct } = this.props;
    getProduct(productId);
  }

  componentDidUpdate(prevProps) {
    const { pdpReducer } = this.props;
    if (prevProps.pdpReducer.product.gallery !== pdpReducer.product.gallery && !pdpReducer.productLoading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
  }

  render() {
    const { pdpReducer, pricesReducer, addProductToCart, params } = this.props;
    const { productImg } = this.state;
    const { productLoading, product } = pdpReducer;
    const { gallery } = product;
    const { productId } = params;

    return !productLoading && pricesReducer.pricesLoading ? (
      <div className="text-center">Loading...</div>
    ) : (
      <div className="container">
        <div className="pdp-wrapper">
          <ProductDescriptionImages
            gallery={gallery}
            productImg={productImg}
            setImage={(image) => this.setState({ productImg: image })}
          />
          <ProductVariants product={product} addProductToCart={addProductToCart} productId={productId} page="pdp" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDescriptionPage));
