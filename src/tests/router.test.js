import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

import Routes from '../Routes';


describe('<Routes />', () => {
  const wrapper = shallow(<Routes />);
  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
