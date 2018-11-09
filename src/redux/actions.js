export const SET_POSTS = 'SET_POSTS'
export const SET_USER = 'SET_USER'

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts
  }
}