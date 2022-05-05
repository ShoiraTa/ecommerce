import React, { Component } from 'react';

class Attributes extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <div>
        {attributes &&
          attributes.map((attribute) => {
            // console.log(attribute);
            return (
              <div key={attribute.id}>
                <div>
                  <h5 className="desc-h5">{attribute.name}</h5>
                </div>
                <div className="sizes-container">
                  {attribute.items.map((attr) => (
                    <button
                      type="button"
                      className={attribute.name === 'Color' ? 'color-box' : 'size-box'}
                      style={{ backgroundColor: attribute.name === 'Color' ? `${attr.value}` : '' }}
                      key={attr.displayValue}
                    >
                      {attribute.name !== 'Color' && attr.value}
                    </button>
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
