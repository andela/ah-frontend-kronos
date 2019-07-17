/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchArticles from '../../actions/articles/articlesActions';
import '../../assets/scss/Landing.scss';

export class Articles extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articles } = this.props;
    console.log('component articles', articles);

    const articlesList = articles.map(article => (
      <div className="col-sm-6 item" key={article.slug}>
        <div className="row">
          <div className="col-md-12 col-lg-5">
            <Link to={`/${article.slug}`}>
              <img
                className="img-fluid"
                alt="article_image"
                src="https://cdn.pixabay.com/photo/2019/07/07/14/03/fiat-4322521__480.jpg"
              />
            </Link>
          </div>
          <div className="col">
            <Link to={`/${article.slug}`}>
              <h4 className="name">{article.title}</h4>
            </Link>
            <p className="description">{article.description}</p>
            <div className="article-details">
              <p>
                By:
                {article.author.username}
              </p>
              <span>
                {article.read_time}
                {' '}
Read
              </span>
              <i className="far fa-thumbs-up">45</i>
              <span />
              <i className="far fa-thumbs-down">12</i>
              <br />
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <div className="projects-horizontal">
          <div className="container">
            <div className="intro">
              <h2 className="text-center">Articles</h2>
              <p className="text-center">Browse all articles</p>
            </div>
            <form className="search-form">
              <div className="input-group">
                <input className="form-control" type="text" placeholder="I am looking for.." />
                <div className="input-group-append">
                  <button className="btn btn-light" type="button">
                    Search
                    {' '}
                  </button>
                </div>
              </div>
            </form>

            <div className="row projects">{articlesList}</div>
          </div>
        </div>
      </div>
    );
  }
}
Articles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      slug: PropTypes.string,
      body: PropTypes.string,
      read_time: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        bio: PropTypes.string,

      }),
    }),
  ).isRequired,
};
// Articles.defaultProps = {
//   articles: [],
// };
export const mapStateToProps = state => ({ articles: state.articlesReducer.articles });

export default connect(
  mapStateToProps,
  { fetchArticles },
)(Articles);
