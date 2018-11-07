import React, { Component } from 'react';

import './Vote.css';
import Upvote from '../../assets/up.png';
import UpvoteColor from '../../assets/upColor.png';
import Downvote from '../../assets/down.png';
import DownvoteColor from '../../assets/downColor.png';

export default class Vote extends Component {
  state = {
    direction: 0
  }

  render() {
    return (
      <div className="vote">
        <img onClick={() => this.setState({ direction: 1 })} src={this.state.direction === 1 ? UpvoteColor : Upvote} alt="upvote"/>
        <div className={this.props.score > 0 ? "up score" : "score"}>{this.props.score > 0 ? this.props.score : 0}</div>
        <img onClick={() => this.setState({ direction: -1 })} src={this.state.direction === -1 ? DownvoteColor : Downvote} alt="downvote"/>
      </div>
    )
  }
}
