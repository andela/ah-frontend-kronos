/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import TextField from '../common/TextField';
import '../../assets/css/Article.css';
import * as articleActions from '../../actions/articles/articleAction';
import { storage } from '../../firebase';

export class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      image: '',
      progress: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title, description, body, image,
    } = this.state;
    const { actions } = this.props;
    const newarticle = {
      title, description, body, image,
    };
    actions.saveArticle(newarticle);
    this.handleClearForm();
  }

  handleImageUpload = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({
            progress,
          });
        },
        (error) => {
          this.setState({
            progress: `Image upload failed! ${error}`,
          });
        },
        () => {
          storage.ref('images').child(file.name).getDownloadURL().then((url) => {
            this.setState({
              image: url,
              progress: 'Image uploaded sucessfully! 100',
            });
          });
        });
    }
  }

  handleClearForm() {
    this.setState({
      title: '',
      description: '',
      body: '',
      image: '',
    });
  }

  render() {
    const {
      title,
      description,
      body,
      progress,
    } = this.state;
    const { article } = this.props;
    return (
      <section className="create-article-section">
        <h3 className="text-center">Create an article</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            value={title}
            placeholder="Type article title here...."
            className="form-control"
            handleChange={this.handleChange}
          />
          <label>Add Image</label>
          <div className="form-group">
            <input
              type="file"
              onChange={this.handleImageUpload}
            />
          </div>
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
          <label>Description</label>
          <TextField
            rows="3"
            name="description"
            value={description}
            placeholder="Type article description here..."
            className="form-control"
            handleChange={this.handleChange}
          />
          <label>Body</label>
          <TextField
            rows="17"
            name="body"
            value={body}
            placeholder="Type article body here..."
            className="form-control"
            handleChange={this.handleChange}
          />
          <div className="tag-div">
            <input type="text" />
            <input type="button" value="Add Tag" />
            <ul className="tags">
              <li><a href="#html" className="tag">HTML</a></li>
              <li><a href="#css" className="tag">CSS</a></li>
              <li><a href="#javascript" className="tag">JavaScript</a></li>
            </ul>
          </div>
          <div className="form-group">
            <Link to="/articles" className="btn btn-danger">
              Cancel
            </Link>
            <Button className="btn btn-primary" type="submit">
              {article.creating ? 'Creating ... ' : 'Create Article'}
            </Button>
          </div>
        </form>

      </section>
    );
  }
}

CreateArticle.defaultProps = {
  article: {},
};

CreateArticle.propTypes = {
  actions: PropTypes.shape({ saveArticle: PropTypes.func }).isRequired,
  article: PropTypes.shape(),
};

export const mapStateToProps = state => ({
  article: state.article,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(articleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
