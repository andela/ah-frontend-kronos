import React from 'react';
import { shallow } from 'enzyme';

import { FacebookOption } from '../../../components/social/facebook';

describe('Facebook Login', () => {
  const props = {
    LoginFacebook: jest.fn(),
  };

  const setUp = () => {
    const facebookButton = shallow(<FacebookOption {...props} />);
    return facebookButton;
  };
  const wrapper = setUp();

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should work as expected', () => {
    const response = {
      token: 'auth_token',
    };
    wrapper.instance().responseFacebook(response);
    expect(props.LoginFacebook).toBeCalled();
  });
});
