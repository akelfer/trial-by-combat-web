import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPosts, setPost } from '../../redux/actions';
import './HomePage.css';
import PostAPI from '../../api/PostAPI';
import PostList from '../../components/PostList/PostList';
import Dashboard from '../../components/Dashboard/Dashboard';

class HomePage extends Component {
  state = {
    fetchedWithVotes: false
  }

  componentDidMount() {
    if (this.props.avatar) {
      PostAPI.fetchPosts(this.props.avatar.id)
        .then(posts => {
          this.props.dispatch(setPosts(posts))
      })
    } else {
      PostAPI.fetchPosts(null)
        .then(posts => {
          this.props.dispatch(setPosts(posts))
      })
    }
    this.props.dispatch(setPost({}, this.props.comments))
  }

  componentDidUpdate() {
    if (this.props.avatar && !this.state.fetchedWithVotes) {
      PostAPI.fetchPosts(this.props.avatar.id)
        .then(posts => {
          this.props.dispatch(setPosts(posts))
          this.setState({ fetchedWithVotes: true })
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