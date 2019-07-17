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

export class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      image: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    actions.registerArticle(newarticle);
    this.handleClearForm();
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
      image,
    } = this.state;
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
          <label>Image URL</label>
          <Input
            type="url"
            name="image"
            value={image}
            placeholder="https://example.com"
            className="form-control"
            handleChange={this.handleChange}
            required={false}
          />
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
            <input type="submit" value="Add Tag" />
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
            <Button className="btn btn-primary" type="button">Create Article</Button>
          </div>
        </form>

      </section>
    );
  }
}

CreateArticle.propTypes = {
  actions: PropTypes.shape({ registerArticle: PropTypes.func }).isRequired,
};

export const mapStateToProps = state => ({
  article: state.article,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(articleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
