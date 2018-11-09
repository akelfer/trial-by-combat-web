export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const SET_USER = 'SET_USER'

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export function setPost(postData) {
  return {
    type: SET_POST,
    payload: postData
  }
}

export function setUser(userData) {
  return {
    type: SET_USER,
    payload: userData
  }
}