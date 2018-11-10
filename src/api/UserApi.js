const BASE_URL = 'http://localhost:3000'

const loginUser = email => {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email: email})
  })
    .then(res => res.json())
}

const createAvatar = (userId, name) => {
  return fetch(`${BASE_URL}/avatars`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({user_id: userId, name: name})
  })
    .then(res => res.json())
}

const fetchEnemies = avatarId => {
  return fetch(`${BASE_URL}/enemies?avatar_id=${avatarId}`)
    .then(res => res.json())
}

export default {
  loginUser: loginUser,
  createAvatar: createAvatar,
  fetchEnemies: fetchEnemies
}