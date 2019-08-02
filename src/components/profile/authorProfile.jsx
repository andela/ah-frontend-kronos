/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import React from 'react';
import ViewFollowers from './ViewFollowers';
import FollowButton from '../common/FollowButton';
import {
  fetchAuthorProfile,
  followAuthorAction,
  unfollowAuthorAction,
  fetchFollowing,
} from '../../actions/profile/followActions';

import Loading from '../common/Loading';

import '../../assets/scss/Profile.scss';

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      username1: '',
    };
  }

  componentWillMount() {
    const {
      fetchProfileAuthor,
      match: {
        params: { username },
      },
    } = this.props;
    fetchProfileAuthor(username);
  }

  unfollowUser = () => {
    const { username } = this.state;
    unfollowAuthorAction(username);
  };

  followUser = () => {
    const { username } = this.state;
    followAuthorAction(username);
  };

  fetchFollowers = (name) => {
    const { fetchFollowing } = this.props;
    fetchFollowing(name);
  };

  render() {
    const { authorProfile, loading, followers } = this.props;
    let name;
    if (!authorProfile.username) {
      name = 'user';
      return <div>nothing to display</div>;
    }
    name = '';
    if (authorProfile) {
      name = authorProfile.username;
      this.fetchFollowers(name);
    } else {
      name = '';
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="view-profile-form">
          <div className="container profile profile-view" id="profile">
            {name}
            {loading ? (
              <Loading className="profile-loader" />
            ) : (
              <form>
                <div className="form-row profile-row">
                  <div className="col-md-4 relative">
                    {!authorProfile.image || authorProfile.image === 'url' ? (
                      <img
                        alt="profileimage"
                        className="avatar-bg center"
                        src="https://cdn.pixabay.com/photo/2019/06/21/11/46/squirrel-4289250__480.jpg"
                      />
                    ) : (
                      <img
                        className="avatar-bg center"
                        alt="profileimage"
                        src={authorProfile.image}
                      />
                    )}
                    {sessionStorage.getItem('username') !== authorProfile.username ? (
                      <FollowButton
                        username={authorProfile.username}
                        following={authorProfile.following}
                        followUser={this.followUser}
                        unfollowUser={this.unfollowUser}
                      />
                    ) : null}
                  </div>
                  <div className="col-md-8">
                    <h1>Profile </h1>
                    <hr />
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <h5 htmlFor="firstname" className="profile-label">
                            Full Name
                          </h5>
                          <p type="text" name="firstname">
                            {authorProfile.first_name}
                            <span />
                            {authorProfile.last_name}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <h5 htmlFor="username" className="profile-label">
                            Username
                          </h5>
                          <p type="text" name="username">
                            {authorProfile.username}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="form-row">
                      <div className="col-sm-12 col-md-12">
                        <h5 htmlFor="bio" className="profile-label">
                          Bio
                        </h5>
                        <p type="text" name="bio">
                          {authorProfile.bio}
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      {' '}
                      <div className="col-md-6">
                        <ViewFollowers usernamel={name} followers={followers} />
                      </div>
                    </div>
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

export const mapStateToProps = (state) => {
  const { authorProfile } = state.followReducer;
  return { authorProfile };
};

AuthorProfile.propTypes = {
  fetchProfileAuthor: PropTypes.func,
  username: PropTypes.string,
}.isRequired;

AuthorProfile.defaultProps = {
  fetchProfileAuthor: () => {},
  authorProfile: {},
  username: '',
};

export default connect(
  mapStateToProps,
  {
    fetchProfileAuthor: fetchAuthorProfile,
    fetchFollowing,
  },
)(AuthorProfile);
