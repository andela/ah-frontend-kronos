/* eslint-disable camelcase */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import '../../assets/scss/article.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getSingleArticle from '../../actions/articles/articleActions';
import Loading from '../common/Loading';
import ReportComponent from './report/reportComponent';
import { deleteArticle } from '../../actions/articles/articleAction';
import { likingArticle } from '../../actions/articles/likeDislikeAction';
import { followAuthorAction, unfollowAuthorAction } from '../../actions/profile/followActions';
import FollowButton from '../common/FollowButton';
import RateArticleComponentContainer from './rating/RateArticleComponentContainer';
import { ArticleComment } from '../comment/ArticleComment';
import {
  postComment, fetchComment, editComment, deleteComment,
} from '../../actions/comment/articleCommentAction';

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      hasLiked: 'False',
      likesCount: 0,
      disLikeCount: 0,
    };
  }

  componentDidMount() {
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

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line camelcase
    const {
      article: { user_like_status, likes_count, dislikes_count },
    } = nextProps;
    this.setState({
      hasLiked: user_like_status,
      likesCount: likes_count,
      disLikeCount: dislikes_count,
    });
  }

  handleLikes = (event) => {
    const likeButtonValue = event.target.value;
    const { slug, likesCount, disLikeCount } = this.state;
    const { likingArticle } = this.props;
    const countForLikes = likesCount;
    const countForDisLike = disLikeCount;
    if (likeButtonValue === 'true') {
      this.setState({
        hasLiked: 'True',
        likesCount: countForLikes + 1,
        disLikeCount: countForDisLike !== 0 ? countForDisLike - 1 : countForDisLike,
      });
      return likingArticle(slug, { like_article: true });
    }
    this.setState({
      hasLiked: 'False',
      likesCount: countForLikes !== 0 ? countForLikes - 1 : countForLikes,
      disLikeCount: countForDisLike + 1,
    });
    return likingArticle(slug, { like_article: false });
  };

  unfollowUser = (username) => {
    unfollowAuthorAction(username);
  };

  followUser = (username) => {
    followAuthorAction(username);
  };

  handleSubmit = () => {
    const { slug } = this.state;
    const { deleteArticle } = this.props;
    deleteArticle(slug);
  };

  render() {
    const { hasLiked, likesCount, disLikeCount } = this.state;
    const {
      article, isFetching, comments, createComment,
      getComment, updateComment, removeComment,
      match: { params: { slug } },
    } = this.props;
    const createdAt = new Date(article.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const authorized = sessionStorage.getItem('isLoggedIn');
    if (isFetching) {
      return <Loading className="article-loader" />;
    }


    return (
      <React.Fragment>
        <div className="article-dual-column">
          <div className="container">
            <div className="row row-img">
              <div className="col-md-10 offset-md-1">
                <div className="intro">
                  <h1 className="text-center">{article.title}</h1>
                </div>
              </div>
            </div>
          </div>
          <section>
            <div className="row article-row">
              <div className="col-md-10 col-lg-7 offset-md-1 offset-lg-0">
                <div className="article-details">
                  <div className="display-author">
                    <img alt="" src={article.author.image} className="author-image" />
                    {sessionStorage.getItem('username') !== article.author.username
                    && authorized === 'true' ? (
                      <FollowButton
                        username={article.author.username}
                        following={article.author.following}
                        followUser={this.followUser}
                        unfollowUser={this.unfollowUser}
                      />
                      ) : null}
                    <div className="my-author">
                      <Link to={`/profile/${article.author.username}`}>
                        <span>{article.author.username}</span>
                      </Link>
                      <span className="date">{createdAt}</span>
                    </div>
                  </div>

                  <p>
                    <span className="reading-time">
                      {article.read_time}
                      {' '}
read
                    </span>
                  </p>
                </div>

                <div className="text">
                  <img alt="" src={article.image} className="img-fluid" />
                  <br />
                  <p>{article.body}</p>
                </div>

                <div className="ratings-stars purple-color">
                  { JSON.parse(sessionStorage.getItem('isLoggedIn')) ? 'Rate this article' : 'Log-in to rate this article'}
                </div>
                <div className="ratings-stars"><RateArticleComponentContainer articleSlug={article.slug} articleRating={article.rating} /></div>

                <p className="article-icons">
                  <button type="button" className="fa fa-bookmark" />
                  <button type="button" className="fa fa-heart" />
                  <React.Fragment>
                    <button
                      onClick={this.handleLikes}
                      name="true"
                      value="true"
                      type="button"
                      className="fa fa-thumbs-up"
                      disabled={hasLiked === 'True' || !sessionStorage.getItem('token')}
                    >
                      {likesCount}
                    </button>
                    <button
                      onClick={this.handleLikes}
                      name="false"
                      value="false"
                      type="button"
                      className="fa fa-thumbs-down"
                      disabled={hasLiked === 'False' || !sessionStorage.getItem('token')}
                    >
                      {disLikeCount}
                    </button>
                  </React.Fragment>

                  {sessionStorage.getItem('username') === article.author.username ? (
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
                  ) : null}
                </p>

                <ul className="tags">
                  <li className="tag">Tag1</li>
                  <li className="tag">Tag2</li>
                  <li className="tag">Tag3</li>
                </ul>
                { <ReportComponent articleSlug={article.slug} /> }
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
        <ArticleComment
          slug={slug}
          comments={comments}
          createComment={createComment}
          getComment={getComment}
          updateComment={updateComment}
          removeComment={removeComment}
        />
      </React.Fragment>
    );
  }
}
Article.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({}),
  isFetching: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func,
  likingArticle: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
  comments: PropTypes.shape({}),
  getComment: PropTypes.func,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  removeComment: PropTypes.func,
};

Article.defaultProps = {
  article: {},
  comments: {},
  deleteArticle: () => {},
  likingArticle: () => {},
  getComment: () => {},
  createComment: () => {},
  updateComment: () => {},
  removeComment: () => {},
};

export const mapStateToProps = (state) => {
  const { article, isFetching } = state.singleArticleReducer;
  return { article, isFetching, comments: state.comments };
};

export default connect(
  mapStateToProps,
  {
    getSingleArticle,
    deleteArticle,
    likingArticle,
    createComment: postComment,
    getComment: fetchComment,
    updateComment: editComment,
    removeComment: deleteComment,
  },
)(Article);
