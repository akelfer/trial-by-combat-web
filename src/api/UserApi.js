const loginUser = email => {
  return fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email: email})
  })
    .then(res => res.json())
}

const createAvatar = (userId, name) => {
  return fetch('http://localhost:3000/avatars', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({user_id: userId, name: name})
  })
    .then(res => res.json())
}

export default {
  loginUser: loginUser,
  createAvatar: createAvatar
}