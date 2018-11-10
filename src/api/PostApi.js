const POST_URL = 'http://localhost:3000/posts'

const fetchPosts = avatarId => {
  return fetch(`${POST_URL}/${avatarId}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'}
  })
    .then(res => res.json())
}

const fetchPost = (postId, avatarId) => {
  return fetch(`${POST_URL}/${postId}?avatar_id=${avatarId}`)
    .then(res => res.json())
}

const createPost = postObj => {
  return fetch(`${POST_URL}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(postObj)
  })
    .then(res => res.json())
}

const updatePost = (postObj, postId) => {
  return fetch(`${POST_URL}/${postId}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(postObj)
  })
    .then(res => res.json())
}

const deletePost = post => {
  return fetch(`${POST_URL}/${post.id}`, {
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