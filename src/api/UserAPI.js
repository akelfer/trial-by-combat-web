import { API_ROOT, HEADERS } from '../constants';

const loginUser = email => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({email: email})
  })
    .then(res => res.json())
}

const createAvatar = (userId, name) => {
  return fetch(`${API_ROOT}/avatars`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({user_id: userId, name: name})
  })
    .then(res => res.json())
}

const fetchEnemies = avatarId => {
  return fetch(`${API_ROOT}/enemies?avatar_id=${avatarId}`)
    .then(res => res.json())
}

export default {
  loginUser: loginUser,
  createAvatar: createAvatar,
  fetchEnemies: fetchEnemies
}