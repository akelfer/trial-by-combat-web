import React, { Component } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import ChallengeAPI from '../../api/ChallengeAPI';

export default class MessageForm extends Component {
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

    const messageObj = {text: this.state.text, avatar_id: 11, challenge_id: this.state.challenge_id}

    ChallengeAPI.createMessage(messageObj)

    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="messageForm">
        <Form onSubmit={this.handleSubmit} >
          <Label>New Message:</Label>
          <br/>
          <Input onChange={this.handleChange} value={this.state.text} />
          <Button className="btn-sm mt-2">Submit</Button>
        </Form>
      </div>
    )
  }
}
