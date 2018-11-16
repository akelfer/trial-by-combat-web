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
    modal: false,
  }

  componentDidMount() {
    if (this.props.avatar) {
      ChallengeAPI.fetchChallenges(this.props.avatar.id)
      .then(challenges => {
        this.setState({ challenges: challenges })
      })
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.props.avatar && !this.state.fetchedWithAvatar) {
      ChallengeAPI.fetchChallenges(this.props.avatar.id)
        .then(challenges => this.setState({ challenges: challenges, fetchedWithAvatar: true }))
    }

    if (prevState.modal && !this.state.modal) {
      const messageObj = {text: 'has left the arena!', avatar_id: this.props.avatar.id, challenge_id: this.state.activeChallenge}

      ChallengeAPI.createMessage(messageObj)
    }
  }

  handleClick = id => {
    this.setState({ activeChallenge: id, modal: true })
  
    setTimeout(() => {
      const messageObj = {text: 'has entered the arena!', avatar_id: this.props.avatar.id, challenge_id: this.state.activeChallenge}
  
      ChallengeAPI.createMessage(messageObj)

      document.getElementById("messageInput").focus()
    }, 250)
  }

  handleReceivedChallenge = response => { 
    this.setState({ challenges: [...this.state.challenges, response.challenge] })
  }

  handleReceivedMessage = response => {
    if (response.message.text === "THE ARENA WILL CLOSE IN 5 SECONDS!") {
      setTimeout(() => {
        this.setState({ modal: false })
      }, 4500)
    }

    const challenges = [...this.state.challenges]
    const challenge = challenges.find(challenge => challenge.id === response.message.challenge_id)
    challenge.messages = [...challenge.messages, {...response.message, speaker: response.speaker}]

    this.setState({ challenges: challenges })
  }

  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal })

    if (!this.state.modal) {
      const messageObj = {text: 'has left the arena!', avatar_id: this.props.avatar.id, challenge_id: this.state.activeChallenge}
      ChallengeAPI.createMessage(messageObj)
    }
  }

  displayChallenges = () => {
    return this.state.challenges.map(challenge => {
      let title = ''
      if (challenge.avatar_id === this.props.avatar.id) {
        title = challenge.title.split(',')[0]
      } else {
        title = challenge.title.split(',')[1]
      }
      
      return <div className="challenge m-3" key={challenge.id} onClick={() => this.handleClick(challenge.id)}><span className={challenge.avatar_id === this.props.avatar.id ? "challenger" : "challengee"}>{title}</span></div>
    })
  }

  render() {
    const { challenges, activeChallenge } = this.state

    return (
      <div className="challengeList ml-3">
        <ActionCable channel={{channel: 'ChallengesChannel'}} onReceived={this.handleReceivedChallenge} />
        {this.state.challenges.length ? <Cable challenges={challenges} handleReceivedMessage={this.handleReceivedMessage} /> : null }
        <h5>Active Challenges: </h5>
        {this.displayChallenges()}
        <ChallengeModal modal={this.state.modal} handleToggleModal={this.handleToggleModal} challenge={findActiveChallenge(challenges, activeChallenge)} avatar={this.props.avatar} />
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