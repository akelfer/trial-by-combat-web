import { SET_POSTS } from "./actions";

const initialState = {
  posts: []
}

function reducer(state = initialState, action) {
  const newState = {...state}
  
  switch (action.type) {
    case SET_POSTS:
      return {...newState, posts: action.payload}
    default:
    return state
  }
}

export default reducer;