import { clearState } from '../actions';
import * as C from '../constants';

describe('ExchangePage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: C.CLEAR_STATE,
      };
      expect(clearState()).toEqual(expected);
    });
  });
});
