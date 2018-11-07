const createComment = commentObj => {
  return fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
}

export default {
  createComment: createComment
}