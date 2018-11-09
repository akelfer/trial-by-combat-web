import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import TimeAgo from 'react-timeago';

import { connect } from 'react-redux';
import { setPost } from '../../redux/actions';

import './Post.css';
import Vote from '../../components/Vote/Vote';
import PostAPI from '../../api/PostAPI';


class Post extends Component { 
  state = {
    body: '',
    editing: false
  }

  componentDidUpdate() {
    document.querySelector('input[name="body"]').focus()
  }

  handleChange = e => {
    this.setState({ body: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const postObj = {body: this.state.body, avatar_id: this.props.avatar.id}

    PostAPI.updatePost(postObj, this.props.post.id).then(updatedPost => {
      this.props.dispatch(setPost(updatedPost))
    })
  }

  handleEdit = () => {
    this.setState({ editing: true, body: this.props.post.body })
  }

  handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      PostAPI.deletePost(this.props.post).then(response => {
        console.log(response)
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
          <Form className={this.state.editing ? "show" : "hide"} onSubmit={this.handleSubmit}>
            <Input name="body" value={this.state.body} onChange={this.handleChange} onBlur={this.handleSubmit}/>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Post);