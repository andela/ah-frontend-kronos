import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reportArticleAction from '../../../actions/articles/reportAction';
import ReportArticle from './reportArticle';

export class ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTheReportForm: false,
      showLoader: false,
      reason: '',
    };
  }

  openReportForm = () => {
    this.setState({
      openTheReportForm: true,
    });
  }

  closeTheReportForm = () => {
    this.setState({
      openTheReportForm: false,
    });
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmission = async (e) => {
    e.preventDefault();
    this.showLoaderFunc(true);
    const { reason } = this.state;
    const report = {
      reason,
    };

    const { articleSlug, reportArticle } = this.props;
    await reportArticle(articleSlug, report);
    await this.showLoaderFunc(false);
    await this.closeTheReportForm();
  }

  showLoaderFunc = status => (
    status ? this.setState({ showLoader: true })
      : this.setState({ showLoader: false })
  )

  render() {
    const { openTheReportForm, showLoader } = this.state;
    const loggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    const loggedInEnabler = loggedIn ? (<button type="button" onClick={this.openReportForm} className="report-article"> Report abuse</button>)
      : <div />;

    return (
      openTheReportForm
        ? (
          <ReportArticle
            showLoader={showLoader}
            handleFormSubmission={this.handleFormSubmission}
            closeTheReportForm={this.closeTheReportForm}
            onInputChange={this.onInputChange}
          />
        )
        : loggedInEnabler
    );
  }
}


ReportComponent.propTypes = {
  reportArticle: PropTypes.func,
  articleSlug: PropTypes.string,
};

ReportComponent.defaultProps = {
  articleSlug: '',
  reportArticle: () => {},
};


export default connect(null, { reportArticle: reportArticleAction })(ReportComponent);
