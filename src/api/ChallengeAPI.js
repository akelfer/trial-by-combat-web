import { API_ROOT, HEADERS } from '../constants';

const fetchChallenges = avatarId => {
  return fetch(`${API_ROOT}/challenges?avatar_id=${avatarId}`)
    .then(res => res.json())
}

const createChallenge = challengeObj => {
  return fetch(`${API_ROOT}/challenges`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(challengeObj)
  })
}

const deleteChallenge = challengeId => {
  return fetch(`${API_ROOT}/challenges/${challengeId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
}

const throwRPS = (challengeId, challengeObj) => {
  return fetch(`${API_ROOT}/challenges/${challengeId}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(challengeObj)
  })
    .then(res => res.json())
}

const createMessage = messageObj => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(messageObj)
  })
}



export default {
  fetchChallenges: fetchChallenges,
  createChallenge: createChallenge,
  deleteChallenge: deleteChallenge,
  throwRPS: throwRPS,
  createMessage: createMessage
}