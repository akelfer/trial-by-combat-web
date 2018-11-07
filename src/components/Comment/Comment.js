import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import './Comment.css';

export default class Comment extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="comment">
        <p className="submissionInfo m-1"><span className="author">{this.props.comment.author}</span><span className="ml-2">{this.props.comment.score > 0 ? this.props.comment.score : 0} points</span><TimeAgo date={this.props.comment.created_at} className="ml-2" /><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"}>[Edit]</span><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"}>[Delete]</span></p>      
        <h5>{this.props.comment.body}</h5>
      </div>
    )
  }
}