import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import './Comment.css';

export default class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <p className="submissionInfo m-1"><span className="author">{this.props.comment.author}</span><span className="ml-2">{this.props.comment.score > 0 ? this.props.comment.score : 0} points</span><TimeAgo date={this.props.comment.created_at} className="ml-2" /></p>      
        <h5>{this.props.comment.body}</h5>
      </div>
    )
  }
}