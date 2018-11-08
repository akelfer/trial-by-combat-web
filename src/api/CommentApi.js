const COMMENT_URL = 'http://localhost:3000/comments'

const createComment = commentObj => {
  return fetch(`${COMMENT_URL}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
} 

const editComment = (commentObj, commentId) => {
  return fetch(`${COMMENT_URL}/${commentId}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
}

const deleteComment = commentId => {
  return fetch(`${COMMENT_URL}/${commentId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
}

export default {
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment
}