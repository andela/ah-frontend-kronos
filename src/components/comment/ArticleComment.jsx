/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../assets/scss/Comment.scss';

export class ArticleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: '',
      commentBody: '',
      commentUpdate: '',
      btnChange: false,
      outPutBtn: false,
    };
  }

  componentDidMount() {
    const { slug, getComment } = this.props;
    getComment(slug);
  }

  componentWillReceiveProps(nextProps) {
    const { slug, getComment } = nextProps;
    getComment(slug);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleDelete = (commentId) => {
    const { slug, removeComment } = this.props;
    removeComment(slug, commentId);
  }

  handleUpdateButton = (commentId) => {
    const { comments: { comments } } = this.props;
    const [commentChange] = comments.filter(comment => comment.id === commentId);
    this.setState({ btnChange: true, commentId, commentUpdate: commentChange.comment_body });
  }

  handleCancelEdit = () => {
    this.setState({ btnChange: false });
  }

  handleValidation = (event) => {
    event.preventDefault();
    this.setState({ outPutBtn: true });
  }

  handleUpdate = (commentId) => {
    const { slug, updateComment } = this.props;
    const { commentUpdate } = this.state;
    const comment = { comment_body: commentUpdate };
    updateComment(slug, commentId, comment);
    this.setState({ btnChange: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { slug, createComment } = this.props;
    const { commentBody } = this.state;
    const comment = { comment_body: commentBody };
    createComment(slug, comment);
    this.setState({ commentBody: '' });
  }

  render() {
    const { comments: { comments } } = this.props;
    const {
      btnChange, outPutBtn, commentBody, commentUpdate, commentId,
    } = this.state;

    return (
      <React.Fragment>
        <div className="form-comment container">
          <div className="container">
            <div className="container">
              <h5>Comments </h5>
              {comments.map(comment => (
                <div className="card" key={comment.id}>
                  <div className="card-body">
                    <div className="row card-row">
                      <div className="col-md-2">{!comment.author.image || comment.author.image === 'url' ? (<img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img irounded-circle img-fluid fluid" alt="profile" />) : (<img src={comment.author.image} className="rounded-circle img img-fluid fluid" alt="profile" />)}</div>
                      <div className="col-md-10">
                        <p><a className="float-left"><strong className="comment-author">{comment.author.username}</strong></a></p>
                        <div className="clearfix" />
                        {btnChange === true && commentId === comment.id ? (<textarea className="form-control" value={commentUpdate} onChange={this.handleChange} onBlur={this.handleValidation} name="commentUpdate" rows="5" id="comment" />)
                          : (<p type="text" className="text-body">{comment.comment_body}</p>)}
                        <p className="time-text text-secondary">{`Created_at: ${(new Date(comment.created_at).toLocaleString())}`}</p>
                        {sessionStorage.getItem('isLoggedIn') === 'true' ? (
                          <p>
                            {btnChange === true && commentId === comment.id ? (
                              <a className="float-right btn">
                                <i className="fa fa-paper-plane font-btn" onClick={() => this.handleUpdate(comment.id)} />
                                <i className="fa fa-window-close font-btn" onClick={this.handleCancelEdit} />
                              </a>
                            ) : (
                              <a className="float-right btn">
                                <i className="fa fa-edit font-btn" onClick={() => this.handleUpdateButton(comment.id)} />
                                <i className="fa fa-trash font-btn" onClick={() => this.handleDelete(comment.id)} />
                              </a>
                            )}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {sessionStorage.getItem('isLoggedIn') === 'true' ? (
              <div className="container">
                <div className="form-group">
                  <textarea className="form-control" placeholder="Write your comment  here" name="commentBody" value={commentBody} onChange={this.handleChange} onKeyUp={this.handleValidation} rows="5" id="comment" />
                </div>
                {outPutBtn === true ? (
                  <div>
                    <button type="submit" className="btn-primary" onClick={this.handleSubmit}>Submit</button>
                  </div>
                ) : null }
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  comments: state,
});

ArticleComment.propTypes = {
  comments: PropTypes.shape({}).isRequired,
  getComment: PropTypes.func,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  removeComment: PropTypes.func,
  slug: PropTypes.string.isRequired,
};

ArticleComment.defaultProps = {
  getComment: () => {},
  createComment: () => {},
  updateComment: () => {},
  removeComment: () => {},
};

export default connect(
  mapStateToProps,
)(ArticleComment);
