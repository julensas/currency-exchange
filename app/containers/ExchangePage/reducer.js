/*
 *
 * ExchangePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

export const initialState = fromJS({
  isLoading: false,
  isError: false,
  latest: { rates: {} },
  availableCurrencies: [
    {
      code: 'USD',
      symbol: '$',
      balance: 1000,
    },
    {
      code: 'EUR',
      symbol: '€',
      balance: 1000,
    },
    {
      code: 'GBP',
      symbol: '£',
      balance: 1000,
    },
  ],
});

function exchangePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case C.FETCH_RATES:
      return state.set('isLoading', true).set('isError', false);
    case C.FETCH_RATES_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isError', false)
        .set('latest', payload);
    case C.EXCHANGE: {
      const indexFrom = state
        .get('availableCurrencies')
        .findIndex(c => c.get('code') === payload.fromCode);
      const indexTo = state
        .get('availableCurrencies')
        .findIndex(c => c.get('code') === payload.toCode);
      return state
        .updateIn(['availableCurrencies', indexFrom], currency =>
          currency.update('balance', balance => balance + payload.price),
        )
        .updateIn(['availableCurrencies', indexTo], currency =>
          currency.update('balance', balance => balance + payload.amount),
        );
    }
    case C.FETCH_RATES_FAIL:
      return state.set('isLoading', false).set('isError', true);
    case C.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default exchangePageReducer;
