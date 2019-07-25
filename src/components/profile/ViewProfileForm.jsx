/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import React from 'react';

import { fetchProfile } from '../../actions/profile/ProfileAction';
import Loading from '../common/Loading';

import '../../assets/scss/Profile.scss';

export class ViewProfile extends React.Component {
  componentDidMount() {
    const { viewProfile } = this.props;
    viewProfile();
  }

  render() {
    /* eslint-disable camelcase */
    const {
      profile: {
        first_name, last_name, username, date_of_birth, bio, image,
      },
    } = this.props;
    const { loading } = this.props;
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="view-profile-form">
          <div className="container profile profile-view" id="profile">
            {loading ? <Loading className="profile-loader" />
              : (
                <form>
                  <div className="form-row profile-row">
                    <div className="col-md-4 relative">
                      {(!image || image === 'url') ? (
                        <img
                          alt="profileimage"
                          className="avatar-bg center"
                          src="https://vignette.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png/revision/latest?cb=20190122015011"
                        />
                      )
                        : (<img className="avatar-bg center" alt="profileimage" src={image} />)}
                    </div>
                    <div className="col-md-8">
                      <h1>Profile </h1>
                      <hr />
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 htmlFor="firstname" className="profile-label">Firstname </h5>
                            <p type="text" name="firstname">
                              {first_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 htmlFor="lastname" className="profile-label">Lastname </h5>
                            <p type="text" name="lastname">
                              {last_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 htmlFor="username" className="profile-label">Username </h5>
                            <p type="text" name="username">
                              {username}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 htmlFor="date" className="profile-label">Date of Birth </h5>
                            <p type="date" name="date">
                              {date_of_birth}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-sm-12 col-md-12">
                          <h5 htmlFor="bio" className="profile-label">Bio </h5>
                          <p type="text" name="bio">
                            {bio}
                          </p>
                        </div>
                      </div>
                      <div className="form-row" />
                      <hr />
                    </div>
                  </div>
                </form>
              )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export const mapStateToProps = ({ profile }) => ({
  profile: profile.profile,
  loading: profile.isLoading,
});

ViewProfile.propTypes = {
  viewProfile: PropTypes.func,
}.isRequired;

ViewProfile.defaultProps = {
  viewProfile: () => {},
};

export default connect(
  mapStateToProps,
  { viewProfile: fetchProfile },
)(ViewProfile);
