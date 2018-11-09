import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import './PostForm.css';
import PostAPI from '../../api/PostAPI';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    redirect: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    const userObj = {title: this.state.title, body: this.state.body, avatar_id: this.props.avatar.id}

    if (this.state.title === '' || this.state.body === '') {
      alert('Field cannot be left empty!')
    } else {
      PostAPI.createPost(userObj).then(_newPost => this.setState({ redirect: true }))
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="postForm m-5">
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Title</Label>
            <Input name="title" autoFocus onChange={this.handleChange} />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Body</Label>
            <Input type="textarea" name="body" onChange={this.handleChange} />
          </FormGroup>
          <Button color="primary" className="mt-2">Submit</Button>
        </Form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(PostForm);