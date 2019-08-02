/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { fetchFollowing } from '../../actions/profile/followActions';

import '../../assets/scss/Profile.scss';

export const ViewFollowers = (props) => {
  const { followers } = props;
  const followersList = followers.map(follower => (
    <div key={follower.follow}>{follower.follow}</div>
  ));
  // eslint-disable-next-line react/destructuring-assignment
  let followersDisplay;
  if (followers.length === 0) {
    followersDisplay = (
      <div>
        <span className="follow">No followers</span>
      </div>
    );
  } else {
    followersDisplay = (
      <div>
        <span className="follow">Followers</span>
        <span className="followers">{followersList}</span>
      </div>
    );
  }

  return <div>{followersDisplay}</div>;
};
export const mapStateToProps = (state) => {
  const { followers } = state.followReducer;
  return { followers };
};

ViewFollowers.propTypes = {
  fetchFollowing: PropTypes.func,
  followers: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

ViewFollowers.defaultProps = {
  fetchFollowing: () => {},
  followers: [],
};

export default connect(
  mapStateToProps,
  { fetchFollowing },
)(ViewFollowers);
