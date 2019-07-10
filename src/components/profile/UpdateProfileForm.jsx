/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { fetchProfile, editProfile } from '../../actions/profile/ProfileAction';
import { storage } from '../../firebase';
import Loading from '../common/Loading';

import '../../assets/scss/Profile.scss';

export class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      image: '',
      dateOfBirth: '',
      bio: '',
      Errorfirstname: '',
      Errorlastname: '',
      ErrordateOfBirth: '',
      Errorbio: '',
      progress: 0,
    };
  }

  componentDidMount() {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    if (profile.username) {
      this.setState({
        firstName: profile.first_name,
        lastName: profile.last_name,
        userName: profile.username,
        image: profile.image,
        dateOfBirth: profile.date_of_birth,
        bio: profile.bio,
      });
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      userName,
      image,
      dateOfBirth,
      bio,
    } = this.state;
    const ProfileData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      image,
      date_of_birth: dateOfBirth,
      bio,
    };
    const { editProfile } = this.props;
    editProfile(ProfileData, this.props);
  }

  validateFormData = () => {
    const {
      firstName, lastName, bio,
    } = this.state;
    this.setState({
      Errorfirstname: firstName.length > 2 && firstName.length < 50 ? null : 'firstname must be atleast 3 characters but not more than 50',
      Errorlastname: lastName.length > 2 && lastName.length < 50 ? null : 'lastname must be atleast 3 characters but not more than 50',
      Errorbio: bio.length < 100 && bio.length > 12 ? null : 'Bio should not be less than 12 words or more than 100 words',
    });
  }

  uploadImage(files) {
    const fileload = storage.ref(`profile/${files[0].name}`).put(files[0]);
    fileload.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({
          progress,
        });
      },
      (error) => {
        this.setState({
          progress: `Failed to upload file! ${error}`,
        });
      },
      () => {
        storage.ref('profile').child(files[0].name).getDownloadURL().then((url) => {
          const image = {
            image: url,
          };
          this.setState({ image: image.image });
        });
      });
  }

  render() {
    const {
      firstName, lastName, userName, dateOfBirth, bio, image,
      Errorfirstname,
      Errorlastname,
      ErrordateOfBirth,
      Errorbio,
      progress,
    } = this.state;
    const { loading } = this.props;
    return (
      <React.Fragment>
        {loading ? <Loading className="profile-loader" />
          : (
            <form className="container profile profile-view view-profile-form" id="profile">
              <div className="form-row profile-row">
                <div className="col-md-4 relative">
                  {(!image || image === 'url') ? (
                    <img
                      alt="profileimage"
                      className="avatar-bg center"
                      src="https://vignette.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png/revision/latest?cb=20190122015011"
                    />
                  )
                    : (<img className="avatar-bg center" name="image" alt="profileimage" src={image} />)}
                  <input
                    type="file"
                    onChange={event => this.uploadImage(event.target.files)}
                    className="upload-button mt-3"
                    id="profile"
                  />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {`${progress}%`}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <h1>Profile </h1>
                  <hr />
                  <div className="form-row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="firstname">
                    First Name
                        <input type="text" className="form-control" placeholder="firstName" value={firstName} name="firstName" required onChange={this.handleChange} onKeyUp={this.validateFormData} />
                      </label>
                      {Errorfirstname && (<p className="Error">{Errorfirstname}</p>)}
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="lastname">
                    Last Name
                        <input type="text" className="form-control" value={lastName} name="lastName" placeholder="LastName" required onChange={this.handleChange} onKeyUp={this.validateFormData} />
                      </label>
                      {Errorlastname && (<p className="Error">{Errorlastname}</p>)}
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="username">
                    User Name
                        <h5 type="text" className="form-control" name="userName" autoComplete="off">{userName}</h5>
                      </label>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="date">
                    Date Of Birth
                        <input type="date" className="form-control" value={dateOfBirth} name="dateOfBirth" autoComplete="off" onChange={this.handleChange} />
                      </label>
                      {ErrordateOfBirth && (<p className="Error">{ErrordateOfBirth}</p>)}
                    </div>
                  </div>
                  <div className="form-row col-sm-12 col-md-12">
                    <label htmlFor="bio">
                    Bio Data
                      <textarea type="text" autoComplete="off" className="form-control" rows="4" cols="80" value={bio} name="bio" placeholder="Talk about Yourself" onChange={this.handleChange} onKeyUp={this.validateFormData} />
                    </label>
                    {Errorbio && (<p className="Error">{Errorbio}</p>)}
                  </div>
                  <hr />
                  <div className="form-row col-md-12 content-right">
                    <button className="btn form-btn" type="submit" onClick={this.handleSubmit}>Update </button>
                    <a className="button-dager" href="/viewProfile" type="cancel">Cancel </a>
                  </div>
                </div>
              </div>
            </form>
          )}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ profile }) => ({
  profile: profile.profile,
  loading: profile.isLoading,
});

UpdateProfile.propTypes = {
  fetchProfile: PropTypes.func,
}.isRequired;

UpdateProfile.defaultProps = {
  fetchProfile: () => {},
};

export default connect(
  mapStateToProps,
  { fetchProfile, editProfile },
)(UpdateProfile);
