import React, { Component } from 'react';
import IssueListPage from '../containers/IssueListPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <IssueListPage org="rails" repo="rails"/>
    );
  }
}

export default App;
