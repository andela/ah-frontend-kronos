import React from 'react';
import { shallow } from 'enzyme';

import { ViewProfile, mapStateToProps } from '../../../components/profile/ViewProfileForm';

// test that ViewProfile component
describe('<ViewProfile />', () => {
  let wrapper;
  const props = {
    profile: {
      profile: {
        firstname: 'kronos',
        lastname: 'manuel',
        username: 'devfest',
        bio: 'Programing is my style',
        image: '',
      },
    },
    fetchProfile: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<ViewProfile {...props} />);
  });
  it('renders without fail', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('it should map state to props', () => {
    const initialState = {
      profile: {
        firstname: 'kronos',
        lastname: 'manuel',
        username: 'devfest',
        bio: 'Programing is my style',
        image: '',
      },
    };
    expect(mapStateToProps(initialState)).toEqual({
      profile: undefined,
      loading: undefined,
    });
  });
});
