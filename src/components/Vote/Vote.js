import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Vote.css';
import VoteAPI from '../../api/VoteAPI';
import Upvote from '../../assets/up.png';
import UpvoteColor from '../../assets/upColor.png';
import Downvote from '../../assets/down.png';
import DownvoteColor from '../../assets/downColor.png';

class Vote extends Component {
  state = {
    direction: this.props.vote && this.props.vote.direction,
    score: this.props.score,
    fetchedWithVotes: false
  }

  componentDidUpdate() {
    if (this.props.vote && !this.state.fetchedWithVotes) {
      this.setState({ direction: this.props.vote.direction, score: this.props.score, fetchedWithVotes: true })
    }
  }

  handleUpvote = () => {
    if (this.props.avatar) {
      let voteObj = {direction: 1, content_type: this.props.contentType, content_id: this.props.contentId, avatar_id: this.props.avatar.id}
    
      if (this.state.direction === 1) {
        voteObj['direction'] = 0

        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            this.setState({ direction: 0, score: this.state.score - 1 })
          })
      } else {
        VoteAPI.castVote(voteObj)
          .then(updatedVote => {           
            this.state.direction === -1 ? this.setState({ direction: 1, score: this.state.score + 2 }) : this.setState({ direction: 1, score: this.state.score + 1 })
        })
      }
    } else {
      alert('Only active avatars can vote!')
    }
  }
  
  handleDownvote = () => {
    if (this.props.avatar) {
      let voteObj = {direction: -1, content_type: this.props.contentType, content_id: this.props.contentId, avatar_id: this.props.avatar.id}
    
      if (this.state.direction === -1) {
        voteObj['direction'] = 0

        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            this.setState({ direction: 0, score: this.state.score + 1 })
          })
      } else {
        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            this.state.direction === 1 ? this.setState({ direction: -1, score: this.state.score - 2 }) : this.setState({ direction: - 1, score: this.state.score - 1 })
        })
      }      
    } else {
      alert('Only active avatars can vote!')
    }
  }

  render() {
    if (this.props.vote) {
      return (
        <div className="vote">
          <img onClick={this.handleUpvote} src={this.state.direction === 1 ? UpvoteColor : Upvote } alt="upvote"/>
          <div className={`score${this.state.direction}`}>{this.state.score > 0 ? this.state.score : 0}</div>
          <img onClick={this.handleDownvote} src={this.state.direction === -1 ? DownvoteColor : Downvote } alt="downvote"/>
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

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Vote);