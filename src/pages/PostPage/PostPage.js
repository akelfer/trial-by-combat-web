import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setPost, setPosts } from '../../redux/actions';

import './PostPage.css';
import PostAPI from '../../api/PostAPI';
import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';

class PostPage extends Component {
  state = {
    fetchedWithVotes: false
  }
  componentDidMount() {
    if (this.props.avatar) {
      PostAPI.fetchPost(this.props.match.params.post_id, this.props.avatar.id).then(data => {
        this.props.dispatch(setPost(data.post, data.comments))
        this.setState({ fetchedWithVotes: true })
      })
    } else {
      PostAPI.fetchPost(this.props.match.params.post_id, null).then(data => {
        this.props.dispatch(setPost(data.post, data.comments))
      })
    }
    this.props.dispatch(setPosts([]))
  }

  componentDidUpdate() {
    if (!this.state.fetchedWithVotes && this.props.avatar) {
      PostAPI.fetchPost(this.props.match.params.post_id, this.props.avatar.id).then(data => {
        this.setState({ fetchedWithVotes: true })
        this.props.dispatch(setPost(data.post, data.comments))
      })
    }
  }

  displayComments = () => {
    return this.props.comments.map((comment, index) => {
      return <Comment key={comment.id} comment={comment} avatar={this.props.avatar} index={index}/>
    })
  }
  
  render() {
    return (
      <div className="post page m-5">
        <Post post={this.props.post} fetchedWithVotes={this.state.fetchedWithVotes}/>
        <hr />
        <CommentForm avatar={this.props.avatar} postId={this.props.match.params.post_id} />
        {this.displayComments()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(PostPage);