/*
 *
 * ExchangePage actions
 *
 */

import * as C from './constants';

export function fetchRates() {
  return {
    type: C.FETCH_RATES,
  };
}

export function clearState() {
  return {
    type: C.FETCH_RATES,
  };
}
