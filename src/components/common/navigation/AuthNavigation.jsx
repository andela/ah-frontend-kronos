/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/AuthNavigation.css';
import { connect } from 'react-redux';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloggedIn: false,
    };
  }

  componentWillMount() {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn) {
      this.setState({
        isloggedIn: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loggedIn } = nextProps;
    this.setState({
      isloggedIn: loggedIn.logged_in,
    });
  }

  render() {
    const { isloggedIn } = this.state;

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
            <p className="ml-auto navbar-text actions">
              {isloggedIn ? (
                <React.Fragment>
                  <Link to="/create-article" className="btn btn-light action-buttons">
                    Create Article
                  </Link>
                  <Link
                    to={{
                      pathname: '/update-article',
                      state: {
                        articleData: {
                          title: 'title',
                          description: 'description',
                          body: 'body',
                          slug: 'a',
                          image: 'image',
                        },
                      },
                    }}
                    className="btn btn-light action-buttons"
                  >
                    Edit Article
                  </Link>
                  <Link to="/logout" className="btn btn-light action-buttons">
                    Logout
                  </Link>
                  <Link
                    to={{
                      pathname: '/delete-article',
                      state: {
                        articleData: {
                          title: 'My new title',
                          description: 'description',
                          body: 'body',
                          slug: 'a-1',
                          image: 'image',
                        },
                      },
                    }}
                    className="btn btn-light action-buttons"
                  >
                    Delete Article
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="/signup" className="btn btn-light action-buttons">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-light action-buttons">
                    Log In
                  </Link>
                </React.Fragment>
              )}
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.socialLoginReducer,
});

export default connect(mapStateToProps)(Navigation);
