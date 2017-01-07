import React, { Component, PropTypes } from 'react';
import IssueList from '../components/IssueList';
import { getIssues, getOpenIssueCount } from '../api';
import Paginate from 'react-paginate';
import './IssueListPage.css';

class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      openIssues: null,
      pageLinks: {}
    };
  }

  componentDidMount() {
    const {org, repo} = this.props;
    
    // Fetch the number of open issues
    getOpenIssueCount(org, repo)
      .then(openIssues => {
        this.setState({ openIssues });
      })
      .catch(error => {
        this.setState({ openIssues: null });
      });

    this.fetchIssues(1);
  }

  fetchIssues(page) {
    const {org, repo} = this.props;

    getIssues(org, repo, page)
      .then(issueResponse => {
        this.setState({
          pageCount: issueResponse.pageCount,
          pageLinks: issueResponse.pageLinks,
          issues: issueResponse.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          pageCount: 0,
          pageLinks: {},
          issues: [],
          loading: false
        });
      });
  }

  handlePageChange = ({ selected }) => {
    this.fetchIssues(selected + 1);
  }

  render() {
    const {org, repo} = this.props;
    const {openIssues, issues, loading, pageCount} = this.state;
    
    return (
      <div id="issue-list-page">
        <h1>
          Open issues for <span>{org}</span> / <span>{repo}</span>
        </h1>
        <p>
          {openIssues === null ? '--' : openIssues} open issues
        </p>
        {loading
          ? <span>Loading...</span>
          : <IssueList issues={issues}/>
        }
        <div className="issues__pagination">
          <Paginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

IssueListPage.defaultProps = {
  org: "rails",
  repo: "rails"
};

export default IssueListPage;
