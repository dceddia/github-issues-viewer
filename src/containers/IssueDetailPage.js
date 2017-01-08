import React, { Component, PropTypes } from 'react';
import { getIssue } from '../redux/actions';
import { connect } from 'react-redux';
import UserWithAvatar from '../components/UserWithAvatar';
import IssueLabels from '../components/IssueLabels';
import ReactMarkdown from 'react-markdown';
import './IssueDetailPage.css';

const IssueState = ({ issue: {state} }) => (
  <span className={`issue-detail__state issue-detail__state--${state}`}>
    {state}
  </span>
);

const IssueNumber = ({ issue }) => (
  <span className="issue-detail__number">
    #{issue.number}
  </span>
);

function insertMentionLinks(markdown) {
  return markdown.replace(/\B(@(\w+))/g, `[$1](https://github.com/$2)`);
}

class IssueDetailPage extends Component {
  componentDidMount() {
    // Fetch the issue if we weren't given one
    if(!this.props.issue) {
      this.props.getIssue();
    }
  }

  renderContent() {
    const {issue} = this.props;

    return (
      <div className="issue-detail">
        <h1 className="issue-detail__title">{issue.title}</h1>
        <div className="issue-detail__meta">
          <IssueNumber issue={issue}/>
          <IssueState issue={issue}/>
          <UserWithAvatar user={issue.user} orientation="horizontal"/>
        </div>
        <IssueLabels labels={issue.labels}/>
        <hr className="divider--short"/>
        <div className="issue-detail__summary">
          <ReactMarkdown source={insertMentionLinks(issue.body)}/>
        </div>
        <hr className="divider--short"/>
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
