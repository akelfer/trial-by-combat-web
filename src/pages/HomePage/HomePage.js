import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setPosts } from '../../redux/actions';

import './HomePage.css';
import PostAPI from '../../api/PostAPI';
import PostList from '../../components/PostList/PostList';
import Dashboard from '../../components/Dashboard/Dashboard';

class HomePage extends Component {
  componentDidMount() {
    if (!this.props.posts) {
      PostAPI.fetchPosts()
        .then(posts => {
          this.props.dispatch(setPosts(posts))
      })
    }
  }

  render() {
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