import React, { Component, PropTypes } from 'react';
import { getIssue, getComments } from '../redux/actions';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { insertMentionLinks } from '../utils/stringUtils';
import UserWithAvatar from '../components/UserWithAvatar';
import IssueLabels from '../components/IssueLabels';
import IssueComments from '../components/IssueComments';
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

export class IssueDetailPage extends Component {
  componentDidMount() {
    // Fetch the issue if we weren't given one
    if(!this.props.issue) {
      this.props.getIssue();
    } else {
      // If we have the issue already, get its comments
      this.props.getComments(this.props.issue);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.issue !== this.props.issue) {
      this.props.getComments(newProps.issue);
    }
  }

  renderComments() {
    const {issue, comments, commentsError} = this.props;

    // Return early if there's an error
    if(commentsError) {
      return (
        <div className="issue-detail--comments-error">
          There was a problem fetching the comments.
        </div>
      );
    }

    // The issue has no comments
    if(issue.comments === 0) {
      return <div className="issue-detail--no-comments">No comments</div>;
    }

    // The issue has comments, but they're not loaded yet
    if(!comments || comments.length === 0) {
      return <div className="issue-detail--comments-loading">Comments loading...</div>
    }

    // Comments are loaded
    return <IssueComments comments={comments}/>;
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
          <ReactMarkdown className="markdown" source={insertMentionLinks(issue.body)}/>
        </div>
        <hr className="divider--short"/>
        {this.renderComments()}
      </div>
    );
  }

  renderLoading() {
    return (
        <div className="issue-detail--loading">
          <p>Loading issue #{this.props.params.issueId}...</p>
        </div>
    );
  }

  render() {
    const {issue, issueError, params} = this.props;

    if(issueError) {
      return (
        <div className="issue-detail--error">
          <h1>There was a problem loading issue #{params.issueId}</h1>
          <p>{issueError.toString()}</p>
        </div>
      );
    }

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
  }).isRequired,
  issue: PropTypes.object,
  issueError: PropTypes.object,
  comments: PropTypes.array,
  commentsError: PropTypes.object,
  getIssue: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
};

const mapState = ({ issues, commentsByIssue }, ownProps) => {
  const issueNum = ownProps.params.issueId;
  return {
    issue: issues.issuesByNumber[issueNum],
    issueError: issues.error,
    comments: commentsByIssue[issueNum],
    commentsError: commentsByIssue['error']
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const {org, repo, issueId} = ownProps.params;
  return {
    getIssue: () => dispatch(getIssue(org, repo, issueId)),
    getComments: (issue) => {
      return dispatch(getComments(issue));
    }
  };
};

export default connect(mapState, mapDispatch)(IssueDetailPage);
