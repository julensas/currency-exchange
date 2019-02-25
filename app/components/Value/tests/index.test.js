/**
 * Testing our Value component
 */

import React from 'react';
import { mount } from 'enzyme';

import Value from '../index';

const renderComponent = () => mount(<Value value={2} />);

describe('<Value />', () => {
  it('should render an <div>', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('div')).toHaveLength(1);
  });

  it('should render a <div> with specified value symbol', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(2)).toEqual(true);
  });
});
