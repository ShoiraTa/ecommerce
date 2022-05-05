import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/reducers/pdp/pdpReducerActions';
import ProductVariants from './ProductVariants';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const mapStateToProps = (state) => ({
  pdpReducer: state.pdpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
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
    const { getProduct, pdpReducer } = this.props;
    getProduct(productId);
    if (!pdpReducer.loading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
  }

  componentDidUpdate(prevProps) {
    const { pdpReducer } = this.props;
    if (prevProps.pdpReducer.product.gallery !== pdpReducer.product.gallery && !pdpReducer.loading) {
      this.setState({ productImg: pdpReducer.product.gallery[0] });
    }
  }

  render() {
    const { pdpReducer } = this.props;
    const { loading, product } = pdpReducer;
    const { gallery, brand, name, attributes, prices, description } = product;
    const { productImg } = this.state;

    console.log(pdpReducer);
    return loading ? (
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
            prices={prices}
            description={description}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDescriptionPage));
