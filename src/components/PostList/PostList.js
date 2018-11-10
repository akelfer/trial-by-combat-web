import React, { Component } from 'react';

import './PostList.css';
import PostTeaser from '../PostTeaser/PostTeaser';
import Vote from '../Vote/Vote';

export default class PostList extends Component {
  displayPosts = () => {
    return this.props.posts.map((post, index) => {
      return (
        <div className="postBlock" key={post.id}>
          <Vote contentType="Post" contentId={post.id} vote={post.vote} score={post.score} />
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