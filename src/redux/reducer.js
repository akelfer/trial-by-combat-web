import { SET_POSTS, SET_POST, SET_USER, SET_AVATAR, SET_COMMENTS } from "./actions";

const initialState = {
  posts: [],
  post: {},
  comments: []
}

function reducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_POSTS:
      return {...state, posts: action.payload}
    case SET_USER:
      return {...state, user: action.payload.user, avatar: action.payload.avatar}
    case SET_POST:
      return {...state, post: action.payload.post, comments: action.payload.comments}
    case SET_AVATAR:
      return {...state, avatar: action.payload}
    case SET_COMMENTS:
      return {...state, comments: action.payload}
    default:
      return state
  }
}

export default reducer;