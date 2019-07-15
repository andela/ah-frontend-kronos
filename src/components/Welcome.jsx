import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import testAction from '../actions/auth/registrationAction';
import '../assets/scss/App.scss';

export class Welcome extends React.Component {
  componentDidMount() {
    const { sampleTest } = this.props;
    sampleTest();
  }

  render() {
    return <h1 className="app">Welcome to Authors Haven</h1>;
  }
}
export const mapStateToProps = state => ({
  test: state.test,
});

Welcome.propTypes = {
  sampleTest: PropTypes.func,
};

Welcome.defaultProps = {
  sampleTest: () => {},
};

export default connect(
  mapStateToProps,
  { sampleTest: testAction },
)(Welcome);
