import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the exchangePage state domain
 */

const selectExchangePageDomain = state =>
  state.get('exchangePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExchangePage
 */

const makeSelectExchangePage = () =>
  createSelector(selectExchangePageDomain, substate => substate.toJS());

export default makeSelectExchangePage;
export { selectExchangePageDomain };
