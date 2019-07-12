import React from 'react';
import { shallow } from 'enzyme';
import LoginUser from '../../components/auth/login/Login';


describe('<LoginUser />', () => {
  it('should match snapshot', () => {
    const props = {
      loginAction: jest.fn(),
      handleSubmit: jest.fn(),
      onInputChange: jest.fn(),
    };
    const wrapper = shallow(<LoginUser {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
