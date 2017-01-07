import React, { Component, PropTypes } from 'react';
import { getIssue } from '../redux/actions';
import { connect } from 'react-redux';

class IssueDetailPage extends Component {
  componentDidMount() {
    // Fetch the issue if we weren't given one
    if(!this.props.issue) {
      this.props.getIssue();
    }
  }

  renderContent() {
    return (
      <div>
        Viewing issue: {this.props.params.issueId}
        {this.props.issue.title}
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        Loading issue {this.props.params.issueId}...
      </div>
    );
  }

  render() {
    const {issue} = this.props;

    return (
      <div>
        {issue && this.renderContent()}
        {!issue && this.renderLoading()}
      </div>
    );
  }
}

IssueDetailPage.propTypes = {
  params: PropTypes.shape({
    issueId: PropTypes.string.isRequired
  }).isRequired
};

const mapState = ({ issues }, ownProps) => {
  return {
    issue: issues.issuesByNumber[ownProps.params.issueId]
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  getIssue: () => dispatch(getIssue('rails', 'rails', ownProps.params.issueId))
});

export default connect(mapState, mapDispatch)(IssueDetailPage);
