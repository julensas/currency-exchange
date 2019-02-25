/**
 *
 * BasePocket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Currency from 'components/Currency';
import Input from 'components/Input';
import style from './style.scss';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class BasePocket extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.base === nextProps.currency.code &&
        this.props.value !== nextProps.value) ||
      this.props.currency.balance !== nextProps.currency.balance
    );
  }

  render() {
    const { currency, onInputChange, value } = this.props;
    return (
      <div className={style.basePocket}>
        <span className={style.balance}>
          <FormattedMessage
            {...messages.youHave}
            values={{
              amount: `${currency.symbol}${currency.balance.toFixed(2)}`,
            }}
          />
        </span>
        {currency.balance < Math.abs(value) && (
          <span className={style.error}>
            <FormattedMessage {...messages.error} />
          </span>
        )}
        <Currency currency={currency.code} />
        <Input value={value} onInputChange={onInputChange} />
      </div>
    );
  }
}

BasePocket.propTypes = {
  currency: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  base: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default BasePocket;
