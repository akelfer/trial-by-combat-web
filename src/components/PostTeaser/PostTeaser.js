import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import './PostTeaser.css';


export default class PostTeaser extends Component {
  render() {
    return (
      <div className="postTeaser">
        <Link to={`/posts/${this.props.post.id}`} className="postLink"><h5>{this.props.post.title}</h5></Link>
        <p className="submissionInfo">Submitted <TimeAgo date={this.props.post.created_at}/> by <span className="author">{this.props.post.author}</span></p>
      </div>
    )
  }
}