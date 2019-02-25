/**
 *
 * RatePocket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Currency from 'components/Currency';
import Value from 'components/Value';
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
        <Value value={Math.abs(value).toFixed(2)} />
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
  'aria-hidden': PropTypes.string,
};

export default RatePocket;
