/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/AuthNavigation.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../../utils/history';
import { fetchProfile } from '../../../actions/profile/ProfileAction';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    const { fetchProfile } = this.props;
    fetchProfile(sessionStorage.getItem('username'));
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    this.setState({
      image: profile.profile.image,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('logged_in', false);
    sessionStorage.removeItem('username');
    this.setState({
      image: null,
    });
    history.push('/login');
  };

  render() {
    const { image } = this.state;
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    return (
      <nav className="navbar navbar-light navbar-expand-md navbar-fixed-top navigation-clean-button">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span>Authors-haven</span>
          </Link>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#navcol-1"
            className="navbar-toggler"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <div className="ml-auto navbar-text actions">
              {
                (loggedIn === 'true')
                  ? (
                    <React.Fragment>
                      <Link to="/create-article" className="btn btn-light action-buttons">
                        Create Article
                      </Link>
                      <Link to="/articles" className="btn btn-light action-buttons">View Articles</Link>
                      <li className="nav-item dropdown show">
                        <a
                          className="dropdown-toggle nav-link"
                          id="navbarDropdownMenuLink-333"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {(image === null) || !image ? (<img className="rounded-circle" src="https://vignette.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png/revision/latest?cb=20190122015011" width="50hv" height="50hv" />)
                            : (<img className="rounded-circle" src={image} width="50hv" height="50hv" />)}
                          {' '}
                          {sessionStorage.getItem('username')}
                        </a>
                        <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                          <a className="dropdown-item" href="/viewProfile">View Profile</a>
                          <a className="dropdown-item" href="/editProfile">Edit Profile</a>
                          <a className="dropdown-item" onClick={this.handleClick} href="/login">Logout</a>
                        </div>
                      </li>
                    </React.Fragment>
                  )
                  : (
                    <React.Fragment>
                      <Link to="/signup" className="btn btn-light action-buttons">Sign Up</Link>
                      <Link to="/login" className="btn btn-light action-buttons">Log In</Link>
                    </React.Fragment>
                  )
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  fetchProfile: () => {},
  profile: {},
};

Navigation.propTypes = {
  fetchProfile: PropTypes.func,
  profile: PropTypes.shape({}),
};

export const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: state.loginReducer.isUserLoggedIn
    ? state.loginReducer.logged_in
    : state.socialLoginReducer.logged_in,
});

export default connect(
  mapStateToProps,
  { fetchProfile },
)(Navigation);
