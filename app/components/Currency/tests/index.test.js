/**
 * Testing our Currency component
 */

import React from 'react';
import { mount } from 'enzyme';

import Currency from '../index';

const renderComponent = (props = {}) =>
  mount(<Currency currency="$" {...props} />);

describe('<Currency />', () => {
  it('should render an <div>', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('div')).toHaveLength(1);
  });

  it('should render a <div> with specified currency symbol', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains('$')).toEqual(true);
  });
});
