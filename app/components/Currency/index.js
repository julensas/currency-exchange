/**
 *
 * Currency
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function Currency({ currency }) {
  return <div className={style.currency}>{currency}</div>;
}

Currency.propTypes = {
  currency: PropTypes.string.isRequired,
};

export default Currency;
