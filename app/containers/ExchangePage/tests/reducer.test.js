import { fromJS, Map } from 'immutable';

import exchangeReducer from '../reducer';
import { fetchRates, exchange, clearState } from '../actions';
import * as C from '../constants';

describe('exchangeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
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
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(exchangeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the clearState action correctly', () => {
    expect(exchangeReducer(state, clearState())).toEqual(state);
  });

  it('should handle the fetchRates action correctly', () => {
    const expectedResult = state.set('isLoading', true);

    expect(exchangeReducer(state, fetchRates(''))).toEqual(expectedResult);
  });

  it('should handle the fetchRates fail action correctly', () => {
    const expectedResult = state.set('isError', true);

    expect(exchangeReducer(state, { type: C.FETCH_RATES_FAIL })).toEqual(
      expectedResult,
    );
  });

  it('should handle the fetchRates success action correctly', () => {
    const expectedResult = state.set(
      'latest',
      Map({
        base: 'USD',
        rates: Map({ EUR: 1.22 }),
      }),
    );

    expect(
      exchangeReducer(state, {
        type: C.FETCH_RATES_SUCCESS,
        payload: { base: 'USD', rates: { EUR: 1.22 } },
      }),
    ).toEqual(expectedResult);
  });

  it('should handle the exchange action correctly', () => {
    const expectedResult = state
      .setIn(
        ['availableCurrencies', 0],
        Map({
          code: 'USD',
          symbol: '$',
          balance: 900,
        }),
      )
      .setIn(
        ['availableCurrencies', 1],
        Map({
          code: 'EUR',
          symbol: '€',
          balance: 1044,
        }),
      );

    expect(exchangeReducer(state, exchange('USD', -100, 'EUR', 44))).toEqual(
      expectedResult,
    );
  });
});
