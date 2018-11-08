import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { Form, Input } from 'reactstrap';

import './Post.css';
import Vote from '../../components/Vote/Vote';
import PostApi from '../../api/PostApi';


export default class Post extends Component {
  state = {
    editing: false,
    body: ''
  }

  componentDidUpdate() {
    document.querySelector('input[name="body"]').focus()
  }

  handleEdit = () => {
    this.setState({ editing: true, body: this.props.post.body })
  }

  handleChange = e => {
    this.setState({ body: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    const postObj = {body: this.state.body}

    PostApi.updatePost(postObj, this.props.post.id).then(updatedPost => {
      this.props.handleUpdatedPost(updatedPost)
      this.setState({ editing: false })
    })
  }

  handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      PostApi.deletePost(this.props.post).then(_response => {
        this.props.history.push('/')
      })
    }
  }

  render() {
    return (
      <div className="postHeader">
        <Vote score={this.props.post.score}/>
        <div className="postContent">
          <h4>{this.props.post.title}<span className={this.props.avatar && this.props.avatar.id === this.props.post.avatar_id ? "edit" : "hide"} onClick={this.handleEdit}>[Edit]</span><span className={this.props.avatar && this.props.avatar.id === this.props.post.avatar_id ? "edit" : "hide"} onClick={this.handleDelete}>[Delete]</span></h4>
          <p className="submissionInfo ml-1">Submitted <TimeAgo date={this.props.post.created_at}/> by <span className="author">{this.props.post.author}</span></p>
          <p className={this.state.editing ? "hide" : "show"}>{this.props.post.body}</p>
          <Form className={this.state.editing ? "show" : "hide"} onSubmit={this.handleSubmit} >
            <Input name="body" value={this.state.body} onChange={this.handleChange} onBlur={this.handleSubmit}/>
          </Form>
        </div>
      </div>
    )
  }
}