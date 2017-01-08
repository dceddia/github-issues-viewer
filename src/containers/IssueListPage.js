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

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {getIssues, getRepoDetails, org, repo} = this.props;
    
    const currentPage = Math.max(1,
      (parseInt(this.props.location.query.page, 10) || 1)
    );
    
    getRepoDetails(org, repo);
    getIssues(org, repo, currentPage);
  }

  handlePageChange = ({ selected }) => {
    const {getIssues, org, repo} = this.props;
    const newPage = selected + 1;

    getIssues(org, repo, newPage);
    this.context.router.replace({
      query: { page: newPage }
    });
  }

  render() {
    const {org, repo, isLoading, issues, pageCount, openIssuesCount} = this.props;
    const currentPage = Math.min(
        pageCount,
        Math.max(1,
          (parseInt(this.props.location.query.page, 10) || 1)
    )) - 1;

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
            forcePage={currentPage}
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
  isLoading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired
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
  pageCount: issues.pageCount
});

const mapDispatch = { getIssues, getRepoDetails };

export default connect(mapStateToProps, mapDispatch)(IssueListPage);
