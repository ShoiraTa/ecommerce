import React, { Component } from 'react';

class Attributes extends Component {
  setSelected = (selectedAttrtibutes, cartSelectedAttributes, attribute, attr) => {
    if (cartSelectedAttributes) {
      return cartSelectedAttributes.some(
        (a) => a.selected === attr.value && a.label === attribute.name && attribute.name
      )
        ? 'selected-pdp__attr-box'
        : '';
    }
    if (selectedAttrtibutes.length > 0) {
      return selectedAttrtibutes.some((a) => a.selected === attr.value && a.label === attribute.name && attribute.name)
        ? 'selected-pdp__attr-box'
        : '';
    }

    return null;
  };

  render() {
    const { attributes, selectedAttrtibutes, cartSelectedAttributes, inStock } = this.props;
    console.log(inStock);
    return (
      <div>
        {attributes &&
          attributes.map((attribute, i) => {
            return (
              <div key={attribute.id}>
                <div>
                  <h5 className="pdp-variant__header">{attribute.name}</h5>
                </div>
                <div className={i + 1 === attributes.length ? 'pdp__sizes-container mb-0' : 'pdp__sizes-container'}>
                  {attribute.items.map((attr) => (
                    <div
                      key={attr.displayValue}
                      className={this.setSelected(selectedAttrtibutes, cartSelectedAttributes, attribute, attr)}
                    >
                      <button
                        disabled={!inStock}
                        onClick={() => this.props.setAttributes({ label: attribute.name, selected: attr.value })}
                        type="button"
                        className={attribute.name === 'Color' ? 'pdp__color-box' : 'pdp__attr-box'}
                        style={{
                          backgroundColor: attribute.name === 'Color' ? `${attr.value}` : '',
                          border: attr.id === 'White' ? '1px solid #1D1F22' : null,
                        }}
                      >
                        <div className={attribute.name === 'Color' ? 'selected-pdp__color-border' : ''} />
                        {attribute.name !== 'Color' && attr.value}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Attributes;
