import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setPost } from '../../redux/actions';

import './PostPage.css';
import PostAPI from '../../api/PostAPI';
import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';

class PostPage extends Component {
  componentDidMount() {
    PostAPI.fetchPost(this.props.match.params.post_id).then(data => {
      console.log(data)
      this.props.dispatch(setPost(data))
    })
  }

  displayComments = () => {
    console.log(this.props.comments)
    return this.props.comments.map(comment => {
      return <Comment key={comment.id} comment={comment} avatar={this.props.avatar} handleDeletedComment={this.handleDeletedComment} handleUpdatedComment={this.handleUpdatedComment}/>
    })
  }
  
  render() {
    return (
      <div className="post page m-5">
        <Post post={this.props.post} avatar={this.props.avatar} history={this.props.history} handleUpdatedPost={this.handleUpdatedPost}/>
        <hr />
        <CommentForm avatar={this.props.avatar} postId={this.props.match.params.post_id} handleNewComment={this.handleNewComment}/>
        {this.displayComments()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(PostPage);