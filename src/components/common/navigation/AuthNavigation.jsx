import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/AuthNavigation.css';

const Navigation = () => (
  <nav className="navbar navbar-light navbar-expand-md navbar-fixed-top navigation-clean-button">
    <div className="container">
      <Link to="/" className="navbar-brand"><span>Authors-haven</span></Link>
      <button type="button" data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler">
        <span className="sr-only">Toggle navigation</span>
        <span className="navbar-toggler-icon" />

      </button>
      <div
        className="collapse navbar-collapse"
        id="navcol-1"
      >
        <p className="ml-auto navbar-text actions">
          <Link to="/signup" className="btn btn-light action-buttons">Sign Up</Link>
          <Link to="/login" className="btn btn-light action-buttons">Log In</Link>
        </p>
      </div>
    </div>
  </nav>
);

export default Navigation;
