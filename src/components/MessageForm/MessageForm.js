import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'reactstrap';
import ChallengeAPI from '../../api/ChallengeAPI';

class MessageForm extends Component {
  state = {
    text: '',
    challenge_id: this.props.challenge_id
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ challenge_id: nextProps.challenge_id })
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const messageObj = {text: this.state.text, avatar_id: this.props.avatar.id, challenge_id: this.state.challenge_id}

    ChallengeAPI.createMessage(messageObj)

    this.setState({ text: '' })
  }

  render() {
    return (
        <Form className="messageForm" onSubmit={this.handleSubmit} autoComplete="off" >
          <br/>
          <Input id="messageInput" onChange={this.handleChange} value={this.state.text} autoFocus />
        </Form>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(MessageForm);