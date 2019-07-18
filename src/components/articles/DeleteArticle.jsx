import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as articleActions from '../../actions/articles/articleAction';

class DeleteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      title: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { articleData } = this.props.location.state;
    this.setState({
      title: articleData.title,
      slug: articleData.slug,
    });
    console.log(`Article object ${JSON.stringify(articleData)}`);
  }

  handleSubmit() {
    const { slug } = this.state;
    console.log(`State to be updaed ${slug}`);
    const { actions } = this.props;
    actions.deleteArticle(slug);
  }

  render() {
    const { title } = this.state;
    return (
      <React.Fragment>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                  Are you sure you want to delete this article?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-danger" data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  article: state.article,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(articleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteArticle);
