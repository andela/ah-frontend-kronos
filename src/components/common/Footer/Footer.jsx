/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../../assets/scss/Footer.scss';


const Footer = () => (
  <React.Fragment>
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 item text">
              <ul>
                <li><a href="#" className="a-text">About</a></li>
                <li><a href="#" className="a-text">Authors</a></li>
                <li><a href="#" className="a-text">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-6 item text">
              <h3>
                    Authors-haven
              </h3>
              <p>
                    Praesent sed lobortis mi.
                    Suspendisse vel placerat ligula. Vivamus ac sem lacus.
                    Ut vehicula rhoncus elementum. Etiam quis tristique lectus.
                    Aliquam in arcu eget velit pulvinar dictum vel in justo.
              </p>
            </div>
            <div className="col-md-3 item social">
              <a href="#"><i className="fab fa-facebook-square social-fab" /></a>
              <a href="#"><i className="fab fa-twitter social-fab" /></a>
              <a href="#"><i className="fab fa-instagram social-fab" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </React.Fragment>
);

export default Footer;
