import React from 'react';
import { shallow } from 'enzyme';

import CurrencyInput from 'react-currency-input';

import Input from '../index';

describe('<Input />', () => {
  it('should render a CurrencyInput', () => {
    const renderedComponent = shallow(
      <Input value={0} onInputChange={() => {}} />,
    );
    expect(renderedComponent.find(CurrencyInput)).toHaveLength(1);
  });

  it('should call onChange ', () => {
    const onChangeSpy = jest.fn();
    const renderedComponent = shallow(
      <Input value={0} onInputChange={onChangeSpy} />,
    );
    const selectWrapper = renderedComponent.find(CurrencyInput);
    selectWrapper.simulate('change', 1);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should call onChange with negative value ', () => {
    const onChangeSpy = jest.fn();
    const renderedComponent = shallow(
      <Input value={0} onInputChange={onChangeSpy} />,
    );
    const selectWrapper = renderedComponent.find(CurrencyInput);
    selectWrapper.simulate('change', -1);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
