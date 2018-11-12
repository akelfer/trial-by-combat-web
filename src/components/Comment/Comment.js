import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { setComments } from '../../redux/actions';
import './Comment.css';
import CommentAPI from '../../api/CommentAPI';

class Comment extends Component {
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

    if (this.state.body === '') {
      alert('Field cannot be left blank!')
    } else {
      const commentObj = {body: this.state.body, avatar_id: this.props.avatar.id, post_id: this.props.comment.post_id}

    CommentAPI.editComment(commentObj, this.props.comment.id).then(updatedComment => {
      let updatedComments = [...this.props.comments]

      updatedComments[this.props.index] = updatedComment

      this.props.dispatch(setComments(updatedComments))
    })

    this.setState({ editing: false })
    }
  }

  handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      CommentAPI.deleteComment(this.props.comment.id).then(response => {
        let updatedComments = [...this.props.comments]

        updatedComments.splice(this.props.index, 1)

        this.props.dispatch(setComments(updatedComments))
      })
    }
  }

  render() {
    return (
      <div className="comment">
        <p className="submissionInfo m-1"><span className="author">{this.props.comment.author}</span><span className="ml-2">{this.props.comment.score} points</span><TimeAgo date={this.props.comment.created_at} className="ml-2" /><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"} onClick={this.handleEdit}>[Edit]</span><span className={this.props.avatar && this.props.avatar.id === this.props.comment.avatar_id ? "edit" : "hide"} onClick={this.handleDelete}>[Delete]</span></p>      
        <h5 className={this.state.editing ? "hide" : "show"}>{this.props.comment.body}</h5>
        <Form className={this.state.editing ? "show" : "hide"} onSubmit={this.handleSubmit} autoComplete="off">
          <Input id={`input${this.props.comment.id}`} name="body" value={this.state.body} onChange={this.handleChange} onBlur={this.handleSubmit}/>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Comment);