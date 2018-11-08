import React, { Component } from 'react';

import './HomePage.css';
import PostAPI from '../../api/PostAPI';
import PostList from '../../components/PostList/PostList';
import Dashboard from '../../components/Dashboard/Dashboard';

export default class HomePage extends Component {
  state = {
    posts: [],
    fetchedVotes: false
  }

  componentDidMount() {
    PostAPI.fetchPosts().then(posts => this.setState({ posts: posts }))
  }

  componentDidUpdate() {
    if (this.props.avatar && this.state.fetchedVotes === false) {
      PostAPI.fetchPostsByAvatar(this.props.avatar.id).then(posts => {
        this.setState({ posts: posts, fetchedVotes: true })
      })
    }
  }

  handleVote = (vote, postIndex) => {
    let updatedPosts = [...this.state.posts]

    updatedPosts[postIndex][vote] = vote

    this.setState({ posts: updatedPosts })
  }

  render() {
    return (
      <div className="homePage">
        <PostList posts={this.state.posts} avatar={this.props.avatar} handleVote={this.handleVote}/>
        <Dashboard user={this.props.user} avatar={this.props.avatar} handleNewAvatar={this.props.handleNewAvatar}/>
      </div>
    )
  }
}