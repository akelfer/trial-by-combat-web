import React, { Component } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Dashboard.css';
import UserAPI from '../../api/UserAPI';

export default class Dashboard extends Component {
  state = {
    name: ''
  }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.props.user) {
      alert("Please sign in first")
    } else if (this.state.name === '') {
      alert("Name cannot be empty")
    } else {
      UserAPI.createAvatar(this.props.user.id, this.state.name).then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          this.setState({ name: '' })
          this.props.handleNewAvatar(response)
        }
      })
    }    
  }

  render() {
    if (this.props.avatar) {
      return (
        <div className="dashboard">
          <LinkContainer to="/create-post"><div className="link mt-3">[Create New Post]</div></LinkContainer>
          <div className="avatar">{this.props.avatar.name}</div>
          <div className="rank">Peasant ({this.props.avatar.reputation})</div>
        </div>
      )
    } else {
      return (
        <div className="dashboard">
          <Form onSubmit={this.handleSubmit} autoComplete="off"> 
            <Label>Choose Avatar name: </Label>
            <Input name="name"  value={this.state.name} onChange={this.handleChange} autoFocus/>
            <Button color="success" className="btn-sm mt-2">Submit</Button>
          </Form>
        </div>
      )
    }
  }
}
