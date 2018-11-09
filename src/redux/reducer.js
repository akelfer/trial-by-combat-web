import { SET_POSTS, SET_POST, SET_USER } from "./actions";

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
    default:
      return state
  }
}

export default reducer;