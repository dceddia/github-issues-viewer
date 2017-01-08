import React, { Component, PropTypes } from 'react';
import { getIssue, getComments } from '../redux/actions';
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

export function insertMentionLinks(markdown) {
  return markdown.replace(/\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g, `**[$1](https://github.com/$2)**`);
}

function IssueComments({ comments = [] }) {
  return (
    <ul className="issue-detail__comments">
      {comments.map(comment =>
        <li key={comment.id}>
          <Comment comment={comment}/>
        </li>
      )}
    </ul>
  );
}

function Comment({ comment }) {
  return (
    <div className="issue-detail__comment">
      <a href={`https://github.com/${comment.user.login}`}>
        <img className="issue-detail__comment__avatar" src={comment.user.avatar_url} alt=""/>
      </a>
      <div>
        <a href={`https://github.com/${comment.user.login}`}
          className="issue-detail__comment__username">{comment.user.login}</a>
        <ReactMarkdown className="markdown" source={insertMentionLinks(comment.body)}/>
      </div>
    </div>
  );
}

class IssueDetailPage extends Component {
  componentDidMount() {
    // Fetch the issue if we weren't given one
    if(!this.props.issue) {
      this.props.getIssue();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.issue !== this.props.issue) {
      this.props.getComments(newProps.issue);
    }
  }

  renderContent() {
    const {issue, comments} = this.props;

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
        {issue.comments === 0
          ? <div>No comments</div>
          : <IssueComments comments={comments}/>}
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
  }).isRequired,
  issue: PropTypes.object,
  comments: PropTypes.array
};

const mapState = ({ issues, commentsByIssue }, ownProps) => {
  const issueNum = ownProps.params.issueId;
  return {
    issue: issues.issuesByNumber[issueNum],
    comments: commentsByIssue[issueNum]
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  getIssue: () => dispatch(getIssue('rails', 'rails', ownProps.params.issueId)),
  getComments: (issue) => {
    return dispatch(getComments(issue));
  }
});

export default connect(mapState, mapDispatch)(IssueDetailPage);
