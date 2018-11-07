import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import './PostForm.css';
import PostApi from '../../api/PostApi';

export default class PostForm extends Component {
  state = {
    title: '',
    body: '',
    newPost: null,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    
    const userObj = {title: this.state.title, body: this.state.body, avatar_id: this.props.avatar.id}

    if (this.state.title === '' || this.state.body === '') {
      alert('Field cannot be left empty!')
    } else {
      PostApi.createPost(userObj).then(newPost => this.setState({ newPost: newPost }))
    }
  }

  render() {
    if (this.state.newPost) {
      return <Redirect to={`/posts/${this.state.newPost.id}`} />
    } else {
      return (
        <div className="postForm m-3">
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
