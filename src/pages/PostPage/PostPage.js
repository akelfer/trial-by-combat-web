import React, { Component } from 'react';

import './PostPage.css';
import PostApi from '../../api/PostApi';
import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';

export default class PostPage extends Component {
  state = {
    post: {},
    comments: []    
  }

  componentDidMount() {
    PostApi.fetchPost(this.props.match.params.post_id).then(data => this.setState({ post: data.post, comments: data.comments }))
  }

  displayComments = () => {
    return this.state.comments.map(comment => {
      return <Comment key={comment.id} comment={comment} avatar={this.props.avatar} handleDeletedComment={this.handleDeletedComment} handleUpdatedComment={this.handleUpdatedComment}/>
    })
  }

  handleUpdatedPost = updatedPost => {
    updatedPost = {...updatedPost, author: this.state.post.author, author_rep: this.state.post.author_rep}
    this.setState({ post: updatedPost })
  }

  handleNewComment = newComment => {
    let updatedComments = [...this.state.comments]

    updatedComments.unshift(newComment)

    this.setState({ comments: updatedComments })
  }

  handleUpdatedComment = updatedComment => {
    let updatedComments = [...this.state.comments]
    let commentIndex = updatedComments.findIndex(comment => comment.id === updatedComment.id)
    
    updatedComments[commentIndex] = updatedComment

    this.setState({ comments: updatedComments })
  }

  handleDeletedComment = deletedComment => {
    let updatedComments = [...this.state.comments]

    updatedComments.splice(updatedComments.indexOf(deletedComment), 1)

    this.setState({ comments: updatedComments })
  }
  
  render() {
    return (
      <div className="post page m-5">
        <Post post={this.state.post} avatar={this.props.avatar} history={this.props.history} handleUpdatedPost={this.handleUpdatedPost}/>
        <hr />
        <CommentForm avatar={this.props.avatar} postId={this.props.match.params.post_id} handleNewComment={this.handleNewComment}/>
        {this.displayComments()}
      </div>
    )
  }
}