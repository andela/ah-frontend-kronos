import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import fetchArticles from '../../actions/articles/articlesActions';
import Loading from '../common/Loading';
import Pagination from './pagination';

import '../../assets/scss/Landing.scss';
import ViewArticleRating from './rating/ViewArticleRating';

export class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalNumberOfPages: 1,
    };
  }

  componentDidMount() {
    const { allArticles } = this.props;
    allArticles();
  }

  componentWillReceiveProps(nextProps) {
    const { count } = nextProps;
    this.setState({
      totalNumberOfPages: Math.ceil(count / 5),
    });
  }

  handlePagination = (url, pageChange) => {
    const { allArticles } = this.props;
    const { currentPage, totalNumberOfPages } = this.state;
    const pageNumber = currentPage;
    if ((currentPage + pageChange) > totalNumberOfPages) {
      this.setState({
        currentPage: totalNumberOfPages,
      });
    } else if ((currentPage + pageChange) < 1) {
      this.setState({
        currentPage: 1,
      });
    } else {
      this.setState({
        currentPage: pageNumber + pageChange,
      });
      allArticles(url);
    }
  }

  render() {
    const {
      articles, isFetching,
    } = this.props;

    const articlesList = articles.map(article => (
      <div className="col-sm-6 item" key={article.slug}>
        <div className="row article">
          <div className="col-md-12 col-lg-5">
            <Link to={`/${article.slug}`}>
              <img className="img-article" alt="article_image" src={article.image} />
            </Link>
          </div>
          <div className="col">
            <Link to={`/${article.slug}`}>
              <h5 className="name">{article.title}</h5>
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
              <i className="far fa-thumbs-up">{article.likes_count}</i>
              <span />
              <i className="far fa-thumbs-down">{article.dislikes_count}</i>
              <br />
              <div className="ratings-stars"><ViewArticleRating rating={article.rating} /></div>
            </div>
          </div>
        </div>
      </div>
    ));
    const {
      next, previous,
    } = this.props;
    const { currentPage, totalNumberOfPages } = this.state;
    if (isFetching) {
      return <Loading className="article-loader" />;
    }
    return (
      <React.Fragment>
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
        <Pagination
          next={next}
          previous={previous}
          currentPage={currentPage}
          totalNumberOfPages={totalNumberOfPages}
          handlePagination={this.handlePagination}
        />
      </React.Fragment>
    );
  }
}

Articles.defaultProps = {
  isFetching: false,
  next: null,
  previous: null,
};

Articles.propTypes = {
  allArticles: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  next: PropTypes.string,
  count: PropTypes.number.isRequired,
  previous: PropTypes.string,
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

export const mapStateToProps = (state) => {
  const {
    articles, isFetching, next, previous, count,
  } = state.articlesReducer;
  return {
    articles, isFetching, next, previous, count,
  };
};

export default connect(
  mapStateToProps,
  { allArticles: fetchArticles },
)(Articles);
