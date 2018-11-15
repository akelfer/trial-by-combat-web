import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './ChallengeModal.css';
import MessagesArea from '../MessagesArea/MessagesArea';
import MessageForm from '../MessageForm/MessageForm';

class ChallengeModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.handleToggleModal} className={this.props.className}>
          <ModalHeader toggle={this.props.handleToggleModal}>The Arena</ModalHeader>
          <ModalBody>
            <MessagesArea challenge={this.props.challenge} avatar={this.props.avatar} />
          </ModalBody>
          <ModalFooter>
            <MessageForm challenge_id={this.props.challenge ? this.props.challenge.id : null} />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ChallengeModal;