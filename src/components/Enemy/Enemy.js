import React, { Component } from 'react';
import ChallengeAPI from '../../api/ChallengeAPI';

import './Enemy.css';

export default class Enemy extends Component {
  handleClick = enemy => {
    const challengeObj = {title: `You challenged ${enemy.name} to a battle for honor!,You have been challenged by ${this.props.avatar.name} to a battle for honor!`, avatar_id: this.props.avatar.id, target_id: enemy.id}

    if (window.confirm(`Are you sure you want to challenge ${enemy.name}?`)) {
      ChallengeAPI.createChallenge(challengeObj)
    }
  }
  
  render() {
    return (
      <div>
        <div className="enemy m-3"><span className="enemyName" onClick={() => this.handleClick(this.props.enemy)}>{this.props.enemy.name}</span> ({this.props.enemy.reputation})</div>
      </div>
    )
  }
}