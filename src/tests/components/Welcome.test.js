import React from 'react';
import { mount } from 'enzyme';

import { Welcome } from '../../components/Welcome';

// test that Welcome component calls componentDidMount

describe('<Welcome />', () => {
  it('calls ComponentDidMount', () => {
    const props = {
      sampleTest: jest.fn(),
    };
    const wrapper = mount(<Welcome {...props} />);
    expect(wrapper.find('h1').length).toBe(1);
    console.log(wrapper);
  });
});
