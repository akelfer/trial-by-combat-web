import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setComments } from '../../redux/actions';
import CommentAPI from '../../api/CommentAPI';
import VoteAPI from '../../api/VoteAPI';

class CommentForm extends Component {
  state = {
    body: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.props.avatar) {
      alert('Only active avatars can comment on posts!')
    } else if (this.state.body === '') {
      alert('Field cannot be left empty!')
    } else {
      const commentObj = {body: this.state.body, post_id: this.props.postId, avatar_id: this.props.avatar.id}
      
      CommentAPI.createComment(commentObj)
        .then(newComment => {
          let voteObj = {direction: 1, content_type: 'Comment', content_id: newComment.id, avatar_id: this.props.avatar.id}
        
          VoteAPI.castVote(voteObj)
            .then(vote => {
              newComment.vote = vote
              newComment.score = 1  
              let updatedComments = [...this.props.comments]
              
              updatedComments.unshift(newComment)
              
              this.props.dispatch(setComments(updatedComments))
            })
        })
    }
  } 

  render() {
    console.log(this.state)
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

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CommentForm);