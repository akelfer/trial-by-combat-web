import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import './Post.css';
import Vote from '../../components/Vote/Vote';


export default class Post extends Component {
  render() {
    return (
      <div className="postHeader">
        <Vote score={this.props.post.score}/>
        <div className="postContent">
          <h4>{this.props.post.title}<span className={this.props.avatar && this.props.avatar.id === this.props.post.avatar_id ? "edit" : "hide"}>[Edit]</span><span className={this.props.avatar && this.props.avatar.id === this.props.post.avatar_id ? "edit" : "hide"}>[Delete]</span></h4>
          <p className="submissionInfo ml-1">Submitted <TimeAgo date={this.props.post.created_at}/> by <span className="author">{this.props.post.author}</span></p>
          <p>{this.props.post.body}</p>
        </div>
      </div>
    )
  }
}