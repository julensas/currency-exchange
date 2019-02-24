import { fromJS } from 'immutable';
import exchangePageReducer from '../reducer';

describe('exchangePageReducer', () => {
  it('returns the initial state', () => {
    expect(exchangePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
