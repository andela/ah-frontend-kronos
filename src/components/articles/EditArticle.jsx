/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Button from '../common/Button';
import TextField from '../common/TextField';
import '../../assets/css/Article.css';
import * as articleActions from '../../actions/articles/articleAction';

export class EditArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      image: '',
      slug: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { articleData } = this.props.location.state;
    this.setState({
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      slug: articleData.slug,
      image: articleData.image,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title, description, body, image, slug,
    } = this.state;
    const { actions } = this.props;
    const newarticle = {
      title,
      description,
      body,
      image,
    };
    actions.updateArticle(newarticle, slug);
    this.handleClearForm();
  };

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
      title, description, body, image, slug,
    } = this.state;
    return (
      <section className="create-article-section">
        <h3 className="text-center">Edit an article</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            value={title}
            placeholder="Type article title here...."
            className="form-control"
            handleChange={this.handleChange}
            required={false}
          />
          <label>Slug</label>
          <Input
            type="text"
            name="slug"
            value={slug}
            placeholder="Type article slug here...."
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
            required={false}
          />
          <label>Body</label>
          <TextField
            rows="17"
            name="body"
            value={body}
            placeholder="Type article body here..."
            className="form-control"
            handleChange={this.handleChange}
            required={false}
          />
          <div className="form-group">
            <Link to={slug} className="btn btn-danger">
              Cancel
            </Link>
            <Button className="btn btn-primary" type="submit">
              Update Article
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

EditArticle.defaultProps = {
  location: {},
};

EditArticle.propTypes = {
  actions: PropTypes.shape({ registerArticle: PropTypes.func }).isRequired,
  location: PropTypes.shape(),
};

export const mapStateToProps = state => ({
  article: state.article,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(articleActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditArticle);
