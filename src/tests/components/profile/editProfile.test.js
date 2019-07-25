import React from 'react';
import { shallow } from 'enzyme';
import { UpdateProfile, mapStateToProps } from '../../../components/profile/UpdateProfileForm';

// test that UpadteProfile component
describe('<UpadteProfile />', () => {
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
    editProfile: jest.fn(),
    fetchProfile: jest.fn(),
    componentWillReceiveProps: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<UpdateProfile {...props} />);
  });
  it('renders without fail', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('it should map state to props', () => {
    const initialState = {
      profile: {},
    };
    expect(mapStateToProps(initialState)).toEqual({
      profile: undefined,
      loading: undefined,
    });
  });
  it('should change to profile page on edit success', () => {
    const nextProps = {
      editSuccess: true,
      profile: {
        firstname: 'kronos',
        lastname: 'manuel',
        username: 'devfest',
        bio: 'Programing is my style',
        image: '',
      },
    };
    wrapper.setProps({ ...nextProps });
    expect(props.history.length).toBe(undefined);
  });
  it('should handle change', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'first_name',
        value: 'kronosdevs',
      },
    };
    const wrapperInst = wrapper.instance();
    wrapperInst.handleChange(event);
    wrapperInst.handleSubmit(event);
    wrapperInst.validateFormData();
    expect(wrapperInst.state.first_name).toBe('kronosdevs');
  });
});
