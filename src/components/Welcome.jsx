import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import testAction from '../actions/auth/registrationAction';

export class Welcome extends React.Component {
  componentDidMount() {
    const { sampleTest } = this.props;
    sampleTest();
  }

  render() {
    return <h1 className="app">Authors Haven</h1>;
  }
}

export const mapStateToProps = state => ({
  test: state.test,
});

Welcome.propTypes = {
  sampleTest: PropTypes.func,
};

Welcome.defaultProps = {
  sampleTest: () => { },
};

export default connect(
  mapStateToProps,
  { sampleTest: testAction },
)(Welcome);
