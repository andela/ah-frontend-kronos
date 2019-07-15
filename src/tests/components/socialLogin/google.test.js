import React from 'react';
import { shallow } from 'enzyme';

import { GoogleOption } from '../../../components/social/google';

describe('Google Login', () => {
  const props = {
    LoginGoogle: jest.fn(),
  };

  const setUp = () => {
    const googleButton = shallow(<GoogleOption {...props} />);
    return googleButton;
  };
  const wrapper = setUp();

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should work as expected', () => {
    const response = {
      tokenId: 'auth_token',
    };
    wrapper.instance().responseGoogle(response);
    expect(props.LoginGoogle).toBeCalled();
  });
});
