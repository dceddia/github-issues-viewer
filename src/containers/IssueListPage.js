import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IssueList from '../components/IssueList';
import { getIssues, getRepoDetails } from '../redux/actions';
import Paginate from 'react-paginate';
import './IssueListPage.css';

export class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      pageLinks: {}
    };
  }

  componentDidMount() {
    const {getIssues, getRepoDetails, org, repo} = this.props;
    
    getRepoDetails(org, repo);
    getIssues(org, repo, 1);
  }

  handlePageChange = ({ selected }) => {
    const {getIssues, org, repo} = this.props;

    getIssues(org, repo, selected + 1);
  }

  render() {
    const {org, repo, isLoading, issues, pageCount, openIssuesCount} = this.props;
    
    return (
      <div id="issue-list-page">
        <h1>
          Open issues for <span>{org}</span> / <span>{repo}</span>
        </h1>
        <p>
          {openIssuesCount === -1 ? '--' : openIssuesCount} open issues
        </p>
        {isLoading
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
  repo: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  openIssuesCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

IssueListPage.defaultProps = {
  org: "rails",
  repo: "rails"
};

const selectIssues = issues => 
  issues.currentPageIssues.map(number => issues.issuesByNumber[number]);

const mapStateToProps = ({ issues, repo }) => ({
  issues: selectIssues(issues),
  openIssuesCount: repo.openIssuesCount,
  isLoading: issues.isLoading,
});

const mapDispatch = { getIssues, getRepoDetails };

export default connect(mapStateToProps, mapDispatch)(IssueListPage);
