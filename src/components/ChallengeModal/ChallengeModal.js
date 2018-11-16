import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ChallengeModal.css';
import MessagesArea from '../MessagesArea/MessagesArea';
import MessageForm from '../MessageForm/MessageForm';
import Rock from '../../assets/rock.png';
import Paper from '../../assets/paper.png';
import Scissors from '../../assets/scissors.png';
import ChallengeAPI from '../../api/ChallengeAPI';

class ChallengeModal extends Component {
  state = {
    rpsChoice: null
  }

  componentDidUpdate() {
    if (this.props.challenge) {
      if (this.props.challenge.avatar_id === this.props.avatar.id && this.props.challenge.avatar_throw && !this.state.rpsChoice) {
        this.setState({ rpsChoice: this.props.challenge.avatar_throw })
      } else if (this.props.challenge.target_id === this.props.avatar.id && this.props.challenge.target_throw && !this.state.rpsChoice) {
        this.setState({ rpsChoice: this.props.challenge.target_throw })
      }
    }
  }

  handleClick = choice => {
    const challenge = this.props.challenge

    if (!this.state.rpsChoice) {
      if (this.props.avatar.id === challenge.avatar_id) {
        ChallengeAPI.throwRPS(challenge.id, {avatar_throw: choice})
          .then(response => {

            this.setState({ rpsChoice: choice})

            const messageObj = {text: 'has made a selection! [RPS]', avatar_id: this.props.avatar.id, challenge_id: challenge.id}
            ChallengeAPI.createMessage(messageObj)

            if (response.winner) {
              if (response.winner.name === 'Admin') {
                const messageObj = {text: 'THE MATCH HAS ENDED IN A DRAW!', avatar_id: 1, challenge_id: challenge.id}
                setTimeout(() => ChallengeAPI.createMessage(messageObj), 500)
              } else {
                const messageObj = {text: `${response.winner.name} HAS WON THE MATCH!`, avatar_id: 1, challenge_id: challenge.id}
                setTimeout(() => ChallengeAPI.createMessage(messageObj), 500)
              }

              const messageObj = {text: 'THE ARENA WILL CLOSE IN 5 SECONDS!', avatar_id: 1, challenge_id: challenge.id}
              setTimeout(() => {
                ChallengeAPI.createMessage(messageObj)
              }, 1500)
            }
          })
      } else if (this.props.avatar.id === challenge.target_id) {
        ChallengeAPI.throwRPS(challenge.id, {target_throw: choice})
          .then(response => {

            this.setState({ rpsChoice: choice})

            const messageObj = {text: 'has made a selection! [RPS]', avatar_id: this.props.avatar.id, challenge_id: challenge.id}
            ChallengeAPI.createMessage(messageObj)
            
            if (response.winner) {
              if (response.winner.name === 'Admin') {
                const messageObj = {text: 'THE MATCH HAS ENDED IN A DRAW!', avatar_id: 1, challenge_id: challenge.id}
                setTimeout(() => ChallengeAPI.createMessage(messageObj), 500)
              } else {
                const messageObj = {text: `${response.winner.name} HAS WON THE MATCH!`, avatar_id: 1, challenge_id: challenge.id}
                setTimeout(() => ChallengeAPI.createMessage(messageObj), 500)
              }

              const messageObj = {text: 'THE ARENA WILL CLOSE IN 5 SECONDS!', avatar_id: 1, challenge_id: challenge.id}
              setTimeout(() => {
                ChallengeAPI.createMessage(messageObj)
              }, 1500)
            }
          })
      }
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.handleToggleModal} className={this.props.className}>
          <ModalHeader toggle={this.props.handleToggleModal}>The Arena</ModalHeader>
          <ModalBody>
            {this.props.challenge ? <MessagesArea challenge={this.props.challenge} avatar={this.props.avatar} /> : null}
          </ModalBody>
          <ModalFooter>
            <div className="rps">
              <img onClick={() => this.handleClick('Rock')} className={this.state.rpsChoice === 'Rock' ? "selected m-1" : "m-1"} src={Rock} alt="Rock" />
              <img onClick={() => this.handleClick('Paper')} className={this.state.rpsChoice === 'Paper' ? "selected m-1" : "m-1"} src={Paper} alt="Paper" />
              <img onClick={() => this.handleClick('Scissors')} className={this.state.rpsChoice === 'Scissors' ? "selected m-1" : "m-1"} src={Scissors} alt="Scissors" />
            </div>
            <MessageForm challenge_id={this.props.challenge ? this.props.challenge.id : null} />
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ChallengeModal;