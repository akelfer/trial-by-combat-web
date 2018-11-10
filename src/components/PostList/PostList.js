import React, { Component } from 'react';

import './PostList.css';
import PostTeaser from '../PostTeaser/PostTeaser';
import PostVote from '../PostVote/PostVote';

export default class PostList extends Component {
  displayPosts = () => {
    return this.props.posts.map(post => {
      return (
        <div className="postBlock" key={post.id}>
          <PostVote contentId={post.id} vote={post.vote} score={post.score} page="Home" />
          <PostTeaser post={post} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="postList">
        {this.displayPosts()}
      </div>
    )
  }
}