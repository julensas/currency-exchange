import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import BasePocket from 'components/BasePocket';
import RatePocket from 'components/RatePocket';
import { ExchangePage, mapDispatchToProps } from '../index';
import { FETCH_RATES } from '../constants';

const exchangeSpy = jest.fn();
const fetchRatesSpy = jest.fn();
const clearStateSpy = jest.fn();

const defaultProps = {
  actions: {
    fetchRates: fetchRatesSpy,
    clearState: clearStateSpy,
    exchange: exchangeSpy,
  },
  exchange: {
    isLoading: false,
    isError: false,
    latest: { rates: { EUR: 1.234 }, base: 'USD' },
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
    ],
  },
};

describe('<ExchangePage />', () => {
  it('should render 2 BasePocket and 1 RatePocket', () => {
    const renderedComponent = shallow(<ExchangePage {...defaultProps} />);
    expect(renderedComponent.find(BasePocket)).toHaveLength(2);
    expect(renderedComponent.find(RatePocket)).toHaveLength(1);
  });

  it('should call fetchRates on mount', () => {
    mount(
      <IntlProvider locale="en">
        <ExchangePage {...defaultProps} />
      </IntlProvider>,
    );
    expect(fetchRatesSpy).toHaveBeenCalled();
  });

  it('should call clearState after unmount', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <ExchangePage {...defaultProps} />
      </IntlProvider>,
    );
    renderedComponent.unmount();
    expect(clearStateSpy).toHaveBeenCalled();
  });

  it('should update value on input change', () => {
    const renderedComponent = shallow(<ExchangePage {...defaultProps} />);
    renderedComponent.instance().onInputChange(-20);
    expect(renderedComponent.state('value')).toEqual(-20);
  });

  it('should update slide index after slide', () => {
    const renderedComponent = shallow(<ExchangePage {...defaultProps} />);
    renderedComponent.instance().onRateAfterSlide(3);
    expect(renderedComponent.state('rateSlideIndex')).toEqual(3);
  });

  it('should call exchange when button is clicked', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <ExchangePage {...defaultProps} />
      </IntlProvider>,
    );
    renderedComponent.setState({ value: -10 });
    renderedComponent.update();
    const button = renderedComponent.find('[type="submit"]');
    button.simulate('submit');
    expect(exchangeSpy).toHaveBeenCalled();
  });

  it('should call fetchRates onAfterSlide', () => {
    const renderedComponent = shallow(<ExchangePage {...defaultProps} />);
    renderedComponent.instance().onAfterSlide(1);
    expect(fetchRatesSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('fetchRates', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.actions.fetchRates).toBeDefined();
      });

      it('should dispatch FETCH_RATES when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.actions.fetchRates();
        expect(dispatch).toHaveBeenCalledWith({ type: FETCH_RATES });
      });
    });
  });
});
