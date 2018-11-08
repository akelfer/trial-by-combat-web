import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import TimeAgo from 'react-timeago';

import './Comment.css';
import CommentAPI from '../../api/CommentAPI';

export default class Comment extends Component {
  state = {
    body: '',
    editing: false
  }

  componentDidUpdate() {
    document.getElementById(`input${this.props.comment.id}`).focus()
  }

  handleEdit = () => {
    this.setState({ editing: true, body: this.props.comment.body })
  }

  handleChange = e => {
    this.setState({ body: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const commentObj = {body: this.state.body, avatar_id: this.props.avatar.id, post_id: this.props.comment.post_id}

    CommentAPI.editComment(commentObj, this.props.comment.id).then(updatedComment => {
      this.props.handleUpdatedComment({...updatedComment, author: this.props.avatar.name, author_rep: this.props.avatar.reputation})
    })

    this.setState({ editing: false })
  }

  handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      CommentAPI.deleteComment(this.props.comment.id).then(response => {
        console.log(response)
        this.props.handleDeletedComment(this.props.comment)
      })
    }
  }

  render() {
    return (
      <div className="comment">
        <p className="submissionInfo m-1"><span className="author">{this.props.comment.author}</span><span className="ml-2">{this.props.comment.score > 0 ? this.props.comment.score : 0} points</span><TimeAgo date={this.props.comment.created_at} className="ml-2" /><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"} onClick={this.handleEdit}>[Edit]</span><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"} onClick={this.handleDelete}>[Delete]</span></p>      
        <h5 className={this.state.editing ? "hide" : "show"}>{this.props.comment.body}</h5>
        <Form className={this.state.editing ? "show" : "hide"} onSubmit={this.handleSubmit}>
          <Input id={`input${this.props.comment.id}`} name="body" value={this.state.body} onChange={this.handleChange} onBlur={this.handleSubmit}/>
        </Form>
      </div>
    )
  }
}