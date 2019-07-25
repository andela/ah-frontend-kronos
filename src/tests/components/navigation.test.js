
import { shallow } from 'enzyme';
import React from 'react';

import { Navigation } from '../../components/common/navigation/AuthNavigation';

function renderNavigation(args) {
  const defaultProps = {
    nextProps: {
      loggedIn: false,
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<Navigation {...props} />);
}

describe('<Navigation />', () => {
  it('should call componentDidMount and set loggedIn to true', () => {
    const wrapper = renderNavigation();
    const wrapperInstance = wrapper.instance();
    wrapperInstance.componentDidMount();
  });
  it('should render Navigation', () => {
    const wrapper = renderNavigation();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle change', () => {
    const wrapper = renderNavigation();
    const event = {
      preventDefault: jest.fn(),
      image: '',
    };
    const wrapperInst = wrapper.instance();
    wrapperInst.handleClick(event);
    expect(wrapperInst.state.image).toBe(null);
  });
});
