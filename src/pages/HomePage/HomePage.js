import React, { Component } from 'react';

import './HomePage.css';
import PostApi from '../../api/PostApi';
import PostList from '../../components/PostList/PostList';
import Dashboard from '../../components/Dashboard/Dashboard';

export default class HomePage extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    PostApi.fetchPosts().then(posts => {
      this.setState({ posts: posts })
    })
  }

  render() {
    return (
      <div className="homePage">
        <PostList posts={this.state.posts}/>
        <Dashboard user={this.props.user} avatar={this.props.avatar} handleNewAvatar={this.props.handleNewAvatar}/>
      </div>
    )
  }
}