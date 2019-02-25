import { fromJS } from 'immutable';

import { selectExchangePageDomain } from '../selectors';

describe('selectExchange', () => {
  it('should select the exchange page state', () => {
    const excnageState = fromJS({
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
    const mockedState = fromJS({
      exchangePage: excnageState,
    });
    expect(selectExchangePageDomain(mockedState)).toEqual(excnageState);
  });
});
