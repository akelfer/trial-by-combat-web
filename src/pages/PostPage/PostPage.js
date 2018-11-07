import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import './PostPage.css';
import PostApi from '../../api/PostApi';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';
import Vote from '../../components/Vote/Vote';

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
        <div className="postHeader">
          <Vote score={this.state.post.score}/>
          <div className="postContent">
            <h4>{this.state.post.title}</h4>
            <p className="submissionInfo ml-1">Submitted <TimeAgo date={this.state.post.created_at}/> by <span className="author">{this.state.post.author}</span></p>
            <p>{this.state.post.body}</p>
          </div>
        </div>
        <hr />
        <CommentForm avatar={this.props.avatar} postId={this.props.match.params.post_id} handleNewComment={this.handleNewComment}/>
        {this.displayComments()}
      </div>
    )
  }
}