/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import style from './style.scss';

class Input extends React.Component {
  onChange = val => this.props.onInputChange(val > 0 ? val * -1 : val);

  render() {
    const { value } = this.props;
    return (
      <CurrencyInput
        value={value}
        thousandSeparator=""
        inputType="tel"
        onChange={this.onChange}
        allowNegative
        className={style.input}
      />
    );
  }
}

Input.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default Input;
