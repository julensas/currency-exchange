import React from 'react';
import { shallow } from 'enzyme';
import RatePocket from '../index';
import style from '../style.scss';

const renderComponent = (props = {}) =>
  shallow(
    <RatePocket
      value={-1.33}
      currency={{
        code: 'GBP',
        symbol: '£',
        balance: 1000,
      }}
      rate={1.5}
      isLoading={false}
      aria-hidden="false"
      baseCurrencySymbol="$"
      base="USD"
      {...props}
    />,
  );

describe('<RatePocket />', () => {
  it('should show loading indicator when loading', () => {
    const renderedComponent = renderComponent({ isLoading: true });
    expect(
      renderedComponent.contains(<span className={style.rate}>....</span>),
    ).toEqual(true);
  });

  it('should update if value is changed', () => {
    const renderedComponent = renderComponent({ isLoading: true });
    const shouldUpdate = renderedComponent
      .instance()
      .shouldComponentUpdate({ value: 2 }, {});
    expect(shouldUpdate).toBe(true);
  });

  it('should not update if value is changed but area is hidden', () => {
    const renderedComponent = renderComponent();
    const shouldUpdate = renderedComponent
      .instance()
      .shouldComponentUpdate(
        { value: 2, 'aria-hidden': 'true', base: 'USD', isLoading: false },
        {},
      );
    expect(shouldUpdate).toBe(false);
  });
});
