/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import ViewArticleRating from './ViewArticleRating';
import articleRatingAction from '../../../actions/articles/rating/rateArticleAction';
import articleRatingUpdateAction from '../../../actions/articles/rating/updateRatingAction';
import { toastFailure } from '../../../utils/toast';


export class RateArticleComponentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleSlug: props.articleSlug,
      newRating: 0,
      isRating: false,
    };
  }

  handleRating = async (rating) => {
    const { articleSlug } = this.state;
    const ratingS = {
      rating,
    };
    const { rateArticle, updateArticle } = this.props;

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === null || isLoggedIn === false) {
      toast.dismiss();
      toastFailure('Signin to rate articles.', 'A');
      this.setState({
        isRating: false,
        newRating: 0,
      });
      return;
    }
    rateArticle(articleSlug, ratingS);

    const { ratingsReducer } = this.props;
    const { isUpdatingRating } = ratingsReducer;

    if (isUpdatingRating) {
      await updateArticle(articleSlug, ratingS);
    }
  };

  handleMouseOver = (star) => {
    this.setState({
      isRating: true,
      newRating: star,
    });
  }

  handleMouseOut = () => {
    this.setState({
      isRating: false,
      newRating: 0,
    });
  }

  render() {
    const { isRating, newRating } = this.state;
    if (isRating) {
      return (
        <ViewArticleRating
          rating={newRating}
          handleMouseOut={this.handleMouseOut}
          handleRating={this.handleRating}
          handleMouseOver={this.handleMouseOver}
        />
      );
    }
    const { articleRating } = this.props;
    const { ratingsReducer } = this.props;
    const { rating } = ratingsReducer;

    let theArticleRating;
    if (rating) {
      theArticleRating = parseInt(rating, 10);
    } else {
      theArticleRating = articleRating;
    }

    const loggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));

    return (
      loggedIn
        ? (
          <ViewArticleRating
            rating={theArticleRating}
            handleMouseOut={this.handleMouseOut}
            handleRating={this.handleRating}
            handleMouseOver={this.handleMouseOver}
          />
        )
        : <ViewArticleRating rating={theArticleRating} />
    );
  }
}

RateArticleComponentContainer.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  rateArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  articleRating: PropTypes.number,
  ratingsReducer: PropTypes.object,
};

RateArticleComponentContainer.defaultProps = {
  ratingsReducer: {},
  articleRating: 0,
};

export const mapStateToProps = state => ({
  ratingsReducer: state.rateArticlesReducer,
});


export default connect(
  mapStateToProps,
  {
    rateArticle: articleRatingAction,
    updateArticle: articleRatingUpdateAction,
  },
)(RateArticleComponentContainer);
