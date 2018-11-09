import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setPosts } from '../../redux/actions';

import './HomePage.css';
import PostAPI from '../../api/PostAPI';
import PostList from '../../components/PostList/PostList';
import Dashboard from '../../components/Dashboard/Dashboard';

class HomePage extends Component {
  state = {
    fetchedVotes: false
  }

  componentDidMount() {
    PostAPI.fetchPosts().then(posts => {
      this.props.dispatch(setPosts(posts))
    })
  }

  componentDidUpdate() {
    if (this.props.avatar && this.state.fetchedVotes === false) {
      PostAPI.fetchPostsByAvatar(this.props.avatar.id).then(posts => {
        this.props.dispatch(setPosts(posts))
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
    console.log(this.props)
    return (
      <div className="homePage">
        <PostList posts={this.props.posts} avatar={this.props.avatar} handleVote={this.handleVote}/>
        <Dashboard user={this.props.user} avatar={this.props.avatar} handleNewAvatar={this.props.handleNewAvatar}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(HomePage);