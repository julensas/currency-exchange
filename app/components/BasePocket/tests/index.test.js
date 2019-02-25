import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import BasePocket from '../index';
import style from '../style.scss';
import messages from '../messages';

const renderComponent = (props = {}) =>
  shallow(
    <BasePocket
      value={-1.33}
      currency={{
        code: 'GBP',
        symbol: '£',
        balance: 1000,
      }}
      aria-hidden="false"
      onInputChange={() => {}}
      base="USD"
      {...props}
    />,
  );

describe('<BasePocket />', () => {
  it('should display an error if balance is less then value', () => {
    const renderedComponent = renderComponent({ value: 10001 });
    expect(
      renderedComponent.contains(
        <span className={style.error}>
          <FormattedMessage {...messages.error} />
        </span>,
      ),
    ).toEqual(true);
  });

  it('should not update if base is other then displayed currency', () => {
    const renderedComponent = renderComponent();
    const shouldUpdate = renderedComponent
      .instance()
      .shouldComponentUpdate(
        { value: 2, currency: { code: 'TEST', balance: 1000 } },
        {},
      );
    expect(shouldUpdate).toBe(false);
  });

  it('should update if balance is changed', () => {
    const renderedComponent = renderComponent();
    const shouldUpdate = renderedComponent
      .instance()
      .shouldComponentUpdate(
        { value: 2, currency: { code: 'TEST', balance: 222 } },
        {},
      );
    expect(shouldUpdate).toBe(true);
  });
});
