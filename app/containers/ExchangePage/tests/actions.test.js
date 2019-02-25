import { clearState, fetchRates, exchange } from '../actions';
import * as C from '../constants';

describe('ExchangePage actions', () => {
  describe('clearState Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: C.CLEAR_STATE,
      };
      expect(clearState()).toEqual(expected);
    });
  });

  describe('fetchRates Action', () => {
    it('has a type of FETCH_RATES', () => {
      const expected = {
        type: C.FETCH_RATES,
      };
      expect(fetchRates()).toEqual(expected);
    });
  });

  describe('exchange Action', () => {
    it('has a type of FETCH_RATES', () => {
      const expected = {
        type: C.EXCHANGE,
        payload: {
          amount: 10,
          fromCode: 'USD',
          toCode: 'EUR',
          price: -10,
        },
      };
      expect(exchange('USD', -10, 'EUR', 10)).toEqual(expected);
    });
  });
});
