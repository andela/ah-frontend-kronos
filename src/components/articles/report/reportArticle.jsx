import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/scss/Login.scss';
import '../../../assets/scss/SocialLogin.scss';
import '../../../assets/scss/article.scss';
import Loading from '../../common/Loading';

export default function ReportArticle(props) {
  const {
    handleFormSubmission, closeTheReportForm, showLoader, onInputChange,
  } = props;
  return (
    <div className="login-clean">
      <form onSubmit={handleFormSubmission}>
        <div className="illustration">
          <i className="icon ion-ios-navigate" />
        </div>
        <div className="social-apps" />

        {showLoader
          ? <Loading />
          : (
            <div>
              <div className="widewidth form-group">
                <button type="button" className="close-report-form" onClick={closeTheReportForm}> X </button>
                {' '}
                <h2>Report Article</h2>
                <input id="reason" type="text" rows="2" name="reason" onChange={onInputChange} placeholder="Enter your reason here" className="form-control" />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit Abuse Report
                </button>
              </div>
            </div>
          )}
      </form>
    </div>
  );
}

ReportArticle.defaultProps = {
  showLoader: false,
};

ReportArticle.propTypes = {
  closeTheReportForm: PropTypes.func.isRequired,
  handleFormSubmission: PropTypes.func.isRequired,
  showLoader: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
};
