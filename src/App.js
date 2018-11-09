import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';
import AppNav from './components/AppNav/AppNav';
import PostPage from './pages/PostPage/PostPage';
import HomePage from './pages/HomePage/HomePage';
import PostForm from './components/PostForm/PostForm';

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppNav handleSignOut={this.handleSignOut}/>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/posts/:post_id" component={PostPage} />
          <Route exact path="/create-post" component={PostForm} />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(App);