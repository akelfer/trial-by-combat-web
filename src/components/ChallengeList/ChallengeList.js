import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import './ChallengeList.css';
import ChallengeAPI from '../../api/ChallengeAPI';
import Cable from '../Cable/Cable';
import ChallengeModal from '../ChallengeModal/ChallengeModal';

class ChallengeList extends Component {
  state = {
    challenges: [],
    activeChallenge: null,
    fetchedWithAvatar: false,
    modal: false
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
    this.handleToggleModal()

    this.setState({ activeChallenge: id })

    setTimeout(() => {
      document.getElementById("messageInput").focus()
    }, 250)
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

  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  displayChallenges = () => {
    return this.state.challenges.map(challenge => {
      return <li className="challenge" key={challenge.id} onClick={() => this.handleClick(challenge.id)}>{challenge.title}</li>
    })
  }

  render() {
    const { challenges, activeChallenge } = this.state
    return (
      <div className="challengeList ml-3">
        <ActionCable channel={{channel: 'ChallengesChannel'}} onReceived={this.handleReceivedChallenge} />
        {this.state.challenges.length ? <Cable challenges={challenges} handleReceivedMessage={this.handleReceivedMessage} /> : null }
        <h5>Challenges: </h5>
        {this.displayChallenges()}
        <ChallengeModal modal={this.state.modal} handleToggleModal={this.handleToggleModal} challenge={findActiveChallenge(challenges, activeChallenge)} avatar={this.props.avatar}/>
      </div>
    )
  }
}

const findActiveChallenge = (challenges, activeChallenge) => {
  return challenges.find(challenge => challenge.id === activeChallenge)
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ChallengeList);