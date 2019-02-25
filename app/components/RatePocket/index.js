/**
 *
 * RatePocket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Currency from 'components/Currency';
import Input from 'components/Input';
import style from './style.scss';

/* eslint-disable react/prefer-stateless-function */
class RatePocket extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.value !== nextProps.value &&
        nextProps['aria-hidden'] === 'false') ||
      (this.props['aria-hidden'] !== nextProps['aria-hidden'] &&
        nextProps['aria-hidden'] === 'false') ||
      this.props.base !== nextProps.base ||
      (this.props.isLoading || nextProps.isLoading)
    );
  }

  onChange = val => {
    this.props.onInputChange(val, this.props.currency);
  };

  render() {
    const { currency, value, rate, baseCurrencySymbol, isLoading } = this.props;
    return (
      <div className={style.ratePocket}>
        {isLoading ? (
          <span className={style.rate}>....</span>
        ) : (
          <span className={style.rate}>
            {`1${baseCurrencySymbol} = ${rate}${currency.symbol}`}
          </span>
        )}
        <Currency currency={currency.code} />
        <Input
          name="rate"
          value={Math.abs(value)}
          onInputChange={this.onChange}
        />
      </div>
    );
  }
}

RatePocket.propTypes = {
  currency: PropTypes.object.isRequired,
  base: PropTypes.string.isRequired,
  baseCurrencySymbol: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rate: PropTypes.number,
  onInputChange: PropTypes.func.isRequired,
  'aria-hidden': PropTypes.string,
};

export default RatePocket;
