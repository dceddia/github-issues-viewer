import React, { Component } from 'react';

class IssueDetailPage extends Component {
  render() {
    return (
      <div>
        Viewing issue: {this.props.params.issueId}
      </div>
    );
  }
}

export default IssueDetailPage;
