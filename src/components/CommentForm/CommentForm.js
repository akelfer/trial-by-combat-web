import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import CommentApi from '../../api/CommentApi';

export default class CommentForm extends Component {
  state = {
    body: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    const commentObj = {body: this.state.body, post_id: this.props.postId, avatar_id: this.props.avatar.id}
    
    CommentApi.createComment(commentObj).then(newComment => this.props.handleNewComment(newComment))
    
    this.setState({ body: ''})
  }

  render() {
      return (
        <div className="commentForm m-3">
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label className="mr-sm-2">Post new comment:</Label>
              <Input type="textarea" name="body" onChange={this.handleChange} value={this.state.body}/>
            </FormGroup>
            <Button color="primary" className="mt-2">Submit</Button>
        </Form>
        </div>
      )
    }
  }
