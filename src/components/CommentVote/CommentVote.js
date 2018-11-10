import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPost } from '../../redux/actions';
import './CommentVote.css';
import VoteAPI from '../../api/VoteAPI';
import Upvote from '../../assets/up.png';
import UpvoteColor from '../../assets/upColor.png';
import Downvote from '../../assets/down.png';
import DownvoteColor from '../../assets/downColor.png';

class CommentVote extends Component {
  state = {
    direction: this.props.vote ? this.props.vote.direction : 0,
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
      let voteObj = {direction: 1, content_type: 'Comment', content_id: this.props.contentId, avatar_id: this.props.avatar.id}

      if (this.state.direction === 1) {
        voteObj['direction'] = 0

        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            let updatedComments = [...this.props.comments]
            let commentIndex = updatedComments.findIndex(comment => comment.id === updatedVote.content_id)
            updatedComments[commentIndex].vote = updatedVote
            updatedComments[commentIndex].score -= 1

            this.props.dispatch(setPost(this.props.post, updatedComments))
            this.setState({ direction: 0, score: this.state.score - 1 })
          })
      } else {
        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            let updatedComments = [...this.props.comments]
            let commentIndex = updatedComments.findIndex(comment => comment.id === updatedVote.content_id)
            updatedComments[commentIndex].vote = updatedVote
            this.state.direction === -1 ? updatedComments[commentIndex].score += 2 : updatedComments[commentIndex].score += 1

            this.props.dispatch(setPost(this.props.post, updatedComments))
            this.state.direction === -1 ? this.setState({ direction: 1, score: this.state.score + 2 }) : this.setState({ direction: 1, score: this.state.score + 1 })
        })
      }
    } else {
      alert('Only active avatars can vote!')
    }
  }
  
  handleDownvote = () => {
    if (this.props.avatar) {
      let voteObj = {direction: -1, content_type: 'Comment', content_id: this.props.contentId, avatar_id: this.props.avatar.id}
    
      if (this.state.direction === -1) {
        voteObj['direction'] = 0

        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            let updatedComments = [...this.props.comments]
            let commentIndex = updatedComments.findIndex(comment => comment.id === updatedVote.content_id)
            updatedComments[commentIndex].vote = updatedVote
            updatedComments[commentIndex].score += 1

            this.props.dispatch(setPost(this.props.post, updatedComments))
            this.setState({ direction: 0, score: this.state.score + 1 })
          })
      } else {
        VoteAPI.castVote(voteObj)
          .then(updatedVote => {
            let updatedComments = [...this.props.comments]
            let commentIndex = updatedComments.findIndex(comment => comment.id === updatedVote.content_id)
            updatedComments[commentIndex].vote = updatedVote
            this.state.direction === 1 ? updatedComments[commentIndex].score -= 2 : updatedComments[commentIndex].score -= 1

            this.props.dispatch(setPost(this.props.post, updatedComments))
            this.state.direction === 1 ? this.setState({ direction: -1, score: this.state.score - 2 }) : this.setState({ direction: - 1, score: this.state.score - 1 })
        })
      }      
    } else {
      alert('Only active avatars can vote!')
    }
  }

  render() {
    console.log(this.props)
    if (this.props.vote) {
      return (
        <div className="commentVote">
          <img onClick={this.handleUpvote} src={this.state.direction === 1 ? UpvoteColor : Upvote } alt="upvote"/>
          <img onClick={this.handleDownvote} src={this.state.direction === -1 ? DownvoteColor : Downvote } alt="downvote"/>
        </div>
      )
    } else {
      return (
        <div className="commentVote">
          <img onClick={this.handleUpvote} src={Upvote} alt="upvote"/>
          <img onClick={this.handleDownvote} src={Downvote} alt="downvote"/>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CommentVote);