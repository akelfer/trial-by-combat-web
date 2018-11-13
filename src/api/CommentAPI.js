import { API_ROOT, HEADERS } from '../constants';

const createComment = commentObj => {
  return fetch(`${API_ROOT}/comments`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
} 

const editComment = (commentObj, commentId) => {
  return fetch(`${API_ROOT}/comments/${commentId}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
}

const deleteComment = commentId => {
  return fetch(`${API_ROOT}/comments/${commentId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
}

export default {
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment
}