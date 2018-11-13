import { API_ROOT, HEADERS } from '../constants';

const castVote = voteObj => {
  return fetch(`${API_ROOT}/votes`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(voteObj)
  })
    .then(res => res.json())
}

export default {
  castVote: castVote
}