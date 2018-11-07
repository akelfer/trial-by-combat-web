const fetchPosts = () => {
  return fetch('http://localhost:3000/posts')
    .then(res => res.json())
}

const fetchPost = postId => {
  return fetch(`http://localhost:3000/posts/${postId}`)
    .then(res => res.json())
}

const createPost = userObj => {
  return fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(userObj)
  })
    .then(res => res.json())
} 

export default {
  fetchPosts: fetchPosts,
  fetchPost: fetchPost,
  createPost: createPost
}