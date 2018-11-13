import React, { Component } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import ChallengeAPI from '../../api/ChallengeAPI';

export default class ChallengeForm extends Component {
  state = {
    title: ''
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const challengeObj = {title: this.state.title, avatar_id: 11, target_id: 12}

    ChallengeAPI.createChallenge(challengeObj)

    this.setState({ title: '' })
  }

  render() {
    return (
      <div className="challengeForm ml-3">
        <Form onSubmit={this.handleSubmit}>
          <Label>New Challenge:</Label>
          <br/>
          <Input onChange={this.handleChange} value={this.state.title} />
          <Button className="btn-sm mt-2">Submit</Button>
        </Form>
      </div>
    )
  }
}
