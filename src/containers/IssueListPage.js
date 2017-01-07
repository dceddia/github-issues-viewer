import React, { Component, PropTypes } from 'react';
import IssueList from '../components/IssueList';
import { getIssues, getOpenIssueCount } from '../api';

class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      openIssues: -1,
      pages: {}
    };
  }

  componentDidMount() {
    const {org, repo} = this.props;
    
    // Fetch the number of open issues
    getOpenIssueCount(org, repo).then(openIssues => {
      this.setState({ openIssues });
    });

    // Fetch the issues from page 1
    getIssues(org, repo, 1).then(issueResponse => {
      this.setState({
        pages: issueResponse.pages,
        issues: issueResponse.data,
        loading: false
      });
    });
  }

  render() {
    const {org, repo} = this.props;
    const {openIssues, issues, loading} = this.state;
    
    return (
      <div id="issue-list-page">
        <h1>
          Open issues for <span>{org}</span> / <span>{repo}</span>
        </h1>
        <p>
          {openIssues > -1 ? openIssues : '--'} open issues
        </p>
        {loading
          ? <span>Loading...</span>
          : <IssueList issues={issues}/>
        }
      </div>
    );
  }
}

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

export default IssueListPage;
