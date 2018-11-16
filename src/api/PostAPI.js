import { API_ROOT, HEADERS } from '../constants';

const fetchPosts = avatarId => {
  return fetch(`${API_ROOT}/posts/${avatarId}`, {
    method: 'POST',
    headers: HEADERS
  })
    .then(res => res.json())
}

const fetchPost = (postId, avatarId) => {
  return fetch(`${API_ROOT}/posts/${postId}?avatar_id=${avatarId}`)
    .then(res => res.json())
}

const createPost = postObj => {
  return fetch(`${API_ROOT}/posts`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(postObj)
  })
    .then(res => res.json())
}

const updatePost = (postId, postObj) => {
  return fetch(`${API_ROOT}/posts/${postId}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(postObj)
  })
    .then(res => res.json())
}

const deletePost = post => {
  return fetch(`${API_ROOT}/posts/${post.id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
}

export default {
  fetchPosts: fetchPosts,
  fetchPost: fetchPost,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost
}