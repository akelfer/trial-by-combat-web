import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import ChallengeAPI from '../../api/ChallengeAPI';
import MessagesArea from '../MessagesArea/MessagesArea';
import Cable from '../Cable/Cable';

class ChallengeList extends Component {
  state = {
    challenges: [],
    activeChallenge: null,
    fetchedWithAvatar: false
  }

  componentDidMount() {
    if (this.props.avatar) {
      ChallengeAPI.fetchChallenges(this.props.avatar.id)
      .then(challenges => {
        console.log(challenges)
        this.setState({ challenges: challenges })
      })
    }
  }

  componentDidUpdate() {
    if (this.props.avatar && !this.state.fetchedWithAvatar) {
      ChallengeAPI.fetchChallenges(this.props.avatar.id)
        .then(challenges => this.setState({ challenges: challenges, fetchedWithAvatar: true }))
    }
  }

  handleClick = id => {
    this.setState({ activeChallenge: id })
  }

  handleReceivedChallenge = response => { 
    this.setState({ challenges: [...this.state.challenges, response.challenge] })
  }

  handleReceivedMessage = response => {
    const challenges = [...this.state.challenges]
    const challenge = challenges.find(challenge => challenge.id === response.message.challenge_id)
    challenge.messages = [...challenge.messages, {...response.message, speaker: response.speaker}]

    this.setState({ challenges: challenges })
  }

  render() {
    const { challenges, activeChallenge } = this.state
    return (
      <div className="challengeList ml-3">
        <ActionCable channel={{channel: 'ChallengesChannel'}} onReceived={this.handleReceivedChallenge} />
        {this.state.challenges.length ? <Cable challenges={challenges} handleReceivedMessage={this.handleReceivedMessage} /> : null }
        <h5>Challenges: </h5>
        <ul>{mapChallenges(challenges, this.handleClick)}</ul>
        {activeChallenge ? <MessagesArea challenge={findActiveChallenge(challenges, activeChallenge)} /> : null}
      </div>
    )
  }
}

const findActiveChallenge = (challenges, activeChallenge) => {
  return challenges.find(challenge => challenge.id === activeChallenge)
}

const mapChallenges = (challenges, handleClick) => {
  return challenges.map(challenge => {
    return <li key={challenge.id} onClick={() => handleClick(challenge.id)}>{challenge.title}</li>
  })
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ChallengeList);