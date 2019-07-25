import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

import Footer from '../../components/common/Footer/Footer';

describe('<Footer />', () => {
  const wrapper = shallow(<Footer />);

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
