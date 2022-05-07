import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductVariants from './ProductVariants';
import { getProductPrice } from '../../../redux/reducers/global/pricesReducerActions';
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
  getProductPrice: (id) => dispatch(getProductPrice(id)),
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
    const { getProduct, pricesReducer, getProductPrice } = this.props;
    getProduct(productId);
    getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props.params;
    const { pdpReducer, pricesReducer, getProductPrice } = this.props;
    if (prevProps.pdpReducer.product.gallery !== pdpReducer.product.gallery && !pdpReducer.productLoading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
    if (prevProps.pricesReducer.currentCurrency.label !== pricesReducer.currentCurrency.label) {
      getProductPrice({ id: productId, currency: pricesReducer.currentCurrency.label });
    }
  }

  render() {
    const { pdpReducer, pricesReducer, addProductToCart } = this.props;
    const { productLoading, product } = pdpReducer;
    const { gallery, brand, name, attributes, description, id, prices } = product;
    const { productImg } = this.state;
    // console.log(this.props.cartReducer.products);
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
          <ProductVariants
            brand={brand}
            name={name}
            attributes={attributes}
            description={description}
            price={pricesReducer.productPrice}
            addProductToCart={addProductToCart}
            id={id}
            prices={prices}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDescriptionPage));
