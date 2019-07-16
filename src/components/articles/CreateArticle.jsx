/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/css/Article.css';
import Input from '../Input';
import TextField from '../common/TextField';
import Button from '../Button';
import AuthNavigation from '../navigation/AuthNavigation';
import articleActions from '../../store/actions/articles/articleAction';


class CreateArticle extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { title, description, body } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(`Title ${title} Description ${description} Body ${body}`);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body } = this.state;
    const newarticle = { title, description, body };
    console.log(`Article to submit ${JSON.stringify(newarticle)}`);
    const { actions } = this.props;
    actions.createArticle(newarticle);
  }


  render() {
    const { title, description, body } = this.state;
    return (
      <section className="create-article-section">
        <AuthNavigation />
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
            <Button className="btn btn-danger">Cancel</Button>
            <Button className="btn btn-primary" type="button">Save Article</Button>
          </div>
        </form>

      </section>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(articleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
