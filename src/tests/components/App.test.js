import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

describe('App Component', () => {
  it('matches the snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
