import React from 'react'
import {shallow} from "enzyme";
import App from './App'

describe('<App>', () => {
  it('says hello', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('p').childAt(0).text()).toEqual('Hello')
  });
});
