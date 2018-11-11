import {
  GET_GOLF_CLUBS,
  GET_GOLF_CLUB,
  ADD_GOLF_CLUB,
  CHANGE_STATUS_GOLF_CLUB,
  UPDATE_GOLF_CLUB,
  ADD_GOLF_COURSE,
  DELETE_GOLF_COURSE,
  UPDATE_GOLF_COURSE
} from "../actions/types";

const initialState = {
  clubs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOLF_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case GET_GOLF_CLUB:
      return {
        ...state,
        club: action.payload
      };
    case ADD_GOLF_CLUB:
      return {
        ...state,
        clubs: [action.payload, ...state.clubs]
      };
    case CHANGE_STATUS_GOLF_CLUB:
      return {
        ...state,
        clubs: state.clubs.map(
          club =>
            club._id === action.payload._id ? (club = action.payload) : club
        )
      };
    case ADD_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(
          club =>
            club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_CLUB:
      return {
        ...state,
        clubs: state.clubs.map(
          club =>
            club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case DELETE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(
          club =>
            club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(
          club =>
            club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    default:
      return state;
  }
}
