/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followAuthorAction, unfollowAuthorAction } from '../../actions/profile/followActions';

class FollowButton extends Component {
  state = {
    following: localStorage.getItem('following'),
  };

  onClickerHander = (event) => {
    // eslint-disable-next-line no-unused-expressions
    event ? event.preventDefault() : '';
    return (follow, followUser, username) => {
      this.setState({ following: follow });
      localStorage.setItem('following', follow);
      followUser(username);
    };
  };

  render() {
    const {
      isFollowing, followUser, unfollowUser, username,
    } = this.props;

    return (
      <>
        {isFollowing ? (
          <div>
            <button
              type="button"
              className="follow"
              onClick={() => this.onClickerHander()('follow', unfollowUser, username)}
            >
              {this.state.following}
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="follow"
              onClick={() => this.onClickerHander()('unfollow', followUser, username)}
            >
              {this.state.following}
            </button>
          </div>
        )}
        <div />
      </>
    );
  }
}
FollowButton.propTypes = {
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  username: PropTypes.string,
};
FollowButton.defaultProps = {
  followUser: () => {},
  unfollowUser: () => {},
  username: '',
};
export const mapStateToProps = (state) => {
  const { isFollowing } = state.followReducer;
  return { isFollowing };
};

export default connect(
  mapStateToProps,
  { followUser: followAuthorAction, unfollowUser: unfollowAuthorAction },
)(FollowButton);
