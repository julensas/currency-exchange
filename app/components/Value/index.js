/**
 *
 * Value
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

function Value({ value }) {
  return <div className={style.value}>{value}</div>;
}

Value.propTypes = {
  value: PropTypes.any.isRequired,
};

export default Value;
