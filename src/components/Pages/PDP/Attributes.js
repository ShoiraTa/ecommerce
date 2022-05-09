import React, { Component } from 'react';

class Attributes extends Component {
  setSelectedClass = () => {};

  render() {
    const { attributes, selectedAttrtibutes } = this.props;
    // console.log(attributes, selectedAttrtibutes);
    return (
      <div>
        {attributes &&
          attributes.map((attribute) => {
            return (
              <div key={attribute.id}>
                <div>
                  <h5 className="variants-h5">{attribute.name}</h5>
                </div>
                <div className="sizes-container">
                  {attribute.items.map((attr) => (
                    <div
                      key={attr.displayValue}
                      className={
                        selectedAttrtibutes.some(
                          (a) => a.selected === attr.value && a.label === attribute.name && attribute.name
                        )
                          ? 'selected-text-box'
                          : ''
                      }
                    >
                      <button
                        onClick={() => this.props.setAttributes({ label: attribute.name, selected: attr.value })}
                        type="button"
                        className={attribute.name === 'Color' ? 'color-box' : 'text-box'}
                        style={{
                          backgroundColor: attribute.name === 'Color' ? `${attr.value}` : '',
                          border: attr.id === 'White' ? '1px solid #1D1F22' : null,
                        }}
                      >
                        <div className={attribute.name === 'Color' ? 'selected-color-border' : ''} />
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
