/*
 *
 * ExchangePage actions
 *
 */

import * as C from './constants';

export function fetchRates(base) {
  return {
    type: C.FETCH_RATES,
    payload: base,
  };
}

export function exchange(fromCode, price, toCode, amount) {
  return {
    type: C.EXCHANGE,
    payload: {
      fromCode,
      price,
      toCode,
      amount,
    },
  };
}

export function clearState() {
  return {
    type: C.CLEAR_STATE,
  };
}
