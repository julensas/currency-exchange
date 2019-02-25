/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  onClick = () => {
    const { index, goToSlide } = this.props;
    goToSlide(index);
  };

  render() {
    const { label } = this.props;
    return (
      <button type="button" onClick={this.onClick}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  goToSlide: PropTypes.func.isRequired,
};

export default Button;
