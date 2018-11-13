import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import ChallengeAPI from '../../api/ChallengeAPI';
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import MessagesArea from '../MessagesArea/MessagesArea';
import Cable from '../Cable/Cable';

export default class ChallengeList extends Component {
  state = {
    challenges: [],
    activeChallenge: null
  }

  componentDidMount() {
    ChallengeAPI.fetchChallenges()
      .then(challenges => this.setState({ challenges: challenges }))
  }

  handleClick = id => {
    this.setState({ activeChallenge: id })
  }

  handleReceivedChallenge = response => { 
    console.log(response)

    const { challenge } = response
    
    this.setState({ challenges: [...this.state.challenges, challenge] })
  }

  handleReceivedMessage = response => {
    console.log(response)

    const { message } = response
    const challenges = [...this.state.challenges]
    const challenge = challenges.find(challenge => challenge.id === message.challenge_id)
    challenge.messages = [...challenge.messages, message]

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
        <ChallengeForm />
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