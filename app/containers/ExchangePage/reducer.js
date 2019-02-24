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
  latest: null,
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
    case C.FETCH_RATES_FAIL:
      return state.set('isLoading', false).set('isError', true);
    case C.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default exchangePageReducer;
