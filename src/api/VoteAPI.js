const VOTE_URL = 'http://localhost:3000/votes'

const castVote = voteObj => {
  return fetch(`${VOTE_URL}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(voteObj)
  })
    .then(res => res.json())
}

export default {
  castVote: castVote
}