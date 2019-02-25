import React from 'react';
import { shallow, mount } from 'enzyme';
import Carousel from 'nuka-carousel';
import Button from 'components/Button';
import ExchangeCarousel from '../index';

const availableCurrencies = [
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
];

describe('<ExchangeCarousel />', () => {
  it('should render a carousel', () => {
    const renderedComponent = shallow(
      <ExchangeCarousel availableCurrencies={availableCurrencies} />,
    );
    expect(renderedComponent.find(Carousel)).toHaveLength(1);
  });
  it('should render custom button', () => {
    const renderedComponent = mount(
      <ExchangeCarousel availableCurrencies={availableCurrencies}>
        <div>1</div>
      </ExchangeCarousel>,
    );
    expect(renderedComponent.find(Button)).toHaveLength(1);
  });
});
