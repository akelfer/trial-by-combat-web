import React, { Component } from 'react';

import './Vote.css';
import VoteAPI from '../../api/VoteAPI';
import Upvote from '../../assets/up.png';
import UpvoteColor from '../../assets/upColor.png';
import Downvote from '../../assets/down.png';
import DownvoteColor from '../../assets/downColor.png';

export default class Vote extends Component {
  handleUpvote = () => {
    if (this.props.avatar) {
      let voteObj = {direction: 1, content_type: this.props.contentType, content_id: this.props.contentId, avatar_id: this.props.avatar.id}
      
      if (this.props.vote && this.props.vote.direction === 1) {
        voteObj['direction'] = 0
      }
      
      VoteAPI.castVote(voteObj).then(vote => {
        this.props.handleVote(vote, this.props.postIndex)
      })
    } else {
      alert('Only active avatars can vote!')
    }
  }
  
  handleDownvote = () => {
    if (this.props.avatar) {
      let voteObj = {direction: -1, content_type: this.props.contentType, content_id: this.props.contentId, avatar_id: this.props.avatar.id}

      if (this.props.vote && this.props.vote.direction === -1) {
        voteObj['direction'] = 0
      }

      VoteAPI.castVote(voteObj).then(vote => {
        this.props.handleVote(vote, this.props.postIndex)
      })
    } else {
      alert('Only active avatars can vote!')
    }
  }

  render() {
    if (this.props.vote) {
      return (
        <div className="vote">
          <img onClick={this.handleUpvote} src={this.props.vote.direction === 1 ? UpvoteColor : Upvote } alt="upvote"/>
          <div className={`score${this.props.vote.direction}`}>{this.props.score > 0 ? this.props.score : 0}</div>
          <img onClick={this.handleDownvote} src={this.props.vote.direction === -1 ? DownvoteColor : Downvote } alt="downvote"/>
        </div>
      )
    } else {
      return (
        <div className="vote">
          <img onClick={this.handleUpvote} src={Upvote} alt="upvote"/>
          <div>{this.props.score > 0 ? this.props.score : 0}</div>
          <img onClick={this.handleDownvote} src={Downvote} alt="downvote"/>
        </div>
      )
    }
  }
}