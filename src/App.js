import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import AppNav from './components/AppNav/AppNav';
import PostPage from './pages/PostPage/PostPage';
import HomePage from './pages/HomePage/HomePage';
import PostForm from './components/PostForm/PostForm';

class App extends Component {
  state = {
    user: null,
    avatar: null
  }

  handleSignIn = userData => {
    this.setState({ user: userData.user, avatar: userData.avatar })
  }

  handleSignOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({ user: null })
      window.location.reload();
    })
  }

  handleNewAvatar = newAvatar => {
    this.setState({ avatar: newAvatar })
  }
  
  render() {
    const renderHomePage = () => {
      return <HomePage user={this.state.user} avatar={this.state.avatar} handleNewAvatar={this.handleNewAvatar}/>
    }

    const renderPostPage = props => {
      return <PostPage avatar={this.state.avatar} match={props.match} history={props.history} />
    }

    const renderPostForm = () => {
      return <PostForm avatar={this.state.avatar} />
    }

    return (
      <BrowserRouter>
        <div className="App">
          <AppNav user={this.state.user} handleSignIn={this.handleSignIn} handleSignOut={this.handleSignOut}/>
          <Route exact path="/" render={renderHomePage} />
          <Route exact path="/posts/:post_id" render={renderPostPage} />
          <Route exact path="/create-post" render={renderPostForm} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;