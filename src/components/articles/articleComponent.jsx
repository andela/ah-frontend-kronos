import React, { Component } from 'react';
import '../../assets/scss/article.scss';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getSingleArticle from '../../actions/articles/articleActions';
import Loading from '../common/Loading';
import { deleteArticle } from '../../actions/articles/articleAction';

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getSingleArticle } = this.props;
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    getSingleArticle(slug);
    this.setState({
      slug,
    });
  }

  handleSubmit() {
    const { slug } = this.state;
    // eslint-disable-next-line no-shadow
    const { deleteArticle } = this.props;
    deleteArticle(slug);
  }


  render() {
    const { article, isFetching } = this.props;

    const createdAt = new Date(article.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    if (isFetching) {
      return <Loading className="article-loader" />;
    }
    return (
      <div className="article-dual-column">
        <div className="container">
          <div className="row row-img">
            <div className="col-md-10 offset-md-1">
              <div className="intro">
                <h1 className="text-center">{article.title}</h1>
              </div>
            </div>
          </div>
          <section>
            <div className="row article-row">
              <div className="col-md-10 col-lg-7 offset-md-1 offset-lg-0">
                <div className="article-details">
                  <span />
                  <span>{article.author.username}</span>
                  <span className="date">{createdAt}</span>

                  <span>
                    {article.read_time}
                    {' '}
read
                  </span>
                </div>

                <div className="text">
                  <img alt="" src={article.image} className="img-fluid" />

                  <p>{article.body}</p>
                </div>
                <p className="article-icons">
                  <i className="far fa-bookmark" />
                  <i className="fa fa-heart" />
                  <i className="far fa-thumbs-up">{article.likes_count}</i>
                  { sessionStorage.getItem('username') === article.author.username
                    ? (
                      <React.Fragment>
                        <Link
                          to={{
                            pathname: '/update-article',
                            state: {
                              articleData: {
                                title: article.title,
                                description: article.description,
                                body: article.body,
                                slug: article.slug,
                                image: article.image,
                              },
                            },
                          }}
                          className="fa fa-edit"
                        />
                        <Link
                          to={{
                            state: {
                              articleData: {
                                title: article.title,
                                description: article.description,
                                body: article.body,
                                slug: article.slug,
                                image: article.image,
                              },
                            },
                          }}
                          className="fa fa-trash"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        />
                      </React.Fragment>
                    ) : null
                }
                </p>
                <ul className="tags">
                  <li className="tag">Tag1</li>
                  <li className="tag">Tag2</li>
                  <li className="tag">Tag3</li>
                </ul>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {article.title}
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete this article?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={this.handleSubmit}
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
Article.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({}),
  isFetching: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
Article.defaultProps = {
  article: {},
  deleteArticle: () => {},
};
export const mapStateToProps = (state) => {
  const { article, isFetching } = state.singleArticleReducer;
  return { article, isFetching };
};

export default connect(
  mapStateToProps,
  { getSingleArticle, deleteArticle },
)(Article);
