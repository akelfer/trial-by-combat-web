export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const SET_USER = 'SET_USER'
export const SET_AVATAR = 'SET_AVATAR'
export const SET_COMMENTS = 'SET_COMMENTS'

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export function setPost(post, comments) {
  return {
    type: SET_POST,
    payload: {post: post, comments: comments}
  }
}

export function setUser(userData) {
  return {
    type: SET_USER,
    payload: userData
  }
}

export function setAvatar(avatar) {
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments
  }
}