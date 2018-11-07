import React, { Component } from 'react';

import PostApi from '../../api/PostApi';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';

export default class Post extends Component {
  state = {
    post: {},
    comments: []
  }

  componentDidMount() {
    PostApi.fetchPost(this.props.match.params.post_id).then(data => this.setState({ post: data.post, comments: data.comments }))
  }

  displayComments = () => {
    return this.state.comments.map(comment => {
      return <Comment key={comment.id} comment={comment} />
    })
  }

  handleNewComment = newComment => {
    let updatedComments = [...this.state.comments]

    updatedComments.unshift(newComment)

    this.setState({ comments: updatedComments })
  }
  
  render() {
    return (
      <div className="post page m-5">
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.body}</p>
        <hr />
        <CommentForm avatar={this.props.avatar} postId={this.props.match.params.post_id} handleNewComment={this.handleNewComment}/>
        {this.displayComments()}
      </div>
    )
  }
}