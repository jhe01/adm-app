import {
  GET_USERS,
  CHANGE_STATUS_USER,
  ADD_USER,
  GET_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case CHANGE_STATUS_USER:
      return {
        ...state,
        users: state.users.map(
          user =>
            user._id === action.payload._id ? (user = action.payload) : user
        )
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(
          user =>
            user._id === action.payload._id ? (user = action.payload) : user
        ),
        user: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    default:
      return state;
  }
}
