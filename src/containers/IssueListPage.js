import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IssueList from '../components/IssueList';
import { getOpenIssueCount } from '../api';
import { getIssues } from '../redux/actions';
import Paginate from 'react-paginate';
import './IssueListPage.css';

export class IssueListPage extends Component {
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
    this.props.getIssues(org, repo, page);
  }

  handlePageChange = ({ selected }) => {
    this.fetchIssues(selected + 1);
  }

  render() {
    const {org, repo, isLoading, issues, pageCount, totalIssueCount} = this.props;
    
    return (
      <div id="issue-list-page">
        <h1>
          Open issues for <span>{org}</span> / <span>{repo}</span>
        </h1>
        <p>
          {totalIssueCount === null ? '--' : totalIssueCount} open issues
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
  repo: PropTypes.string.isRequired
};

IssueListPage.defaultProps = {
  org: "rails",
  repo: "rails"
};

const mapStateToProps = ({ issues }) => ({
  issues: issues.issues,
  totalIssueCount: issues.totalIssueCount,
  isLoading: issues.isLoading
});

const mapDispatch = { getIssues };

export default connect(mapStateToProps, mapDispatch)(IssueListPage);
