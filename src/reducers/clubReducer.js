import {
  GET_GOLF_CLUBS,
  GET_GOLF_CLUB,
  ADD_GOLF_CLUB,
  CHANGE_STATUS_GOLF_CLUB,
  UPDATE_GOLF_CLUB,
  ADD_GOLF_COURSE,
  DELETE_GOLF_COURSE,
  UPDATE_GOLF_COURSE,
  GET_CLUB_RECENT_EVENT_ALBUM,
  UPLOAD_CLUB_IMAGE,
  UPLOAD_CLUB_FACILITY_FAIRWAY_IMAGE,
  DELETE_CLUB_FACILITY_FAIRWAY_IMAGE,
  CUD_CLUB_PRF,
  ADD_CLUB_ALBUM,
  GET_ERRORS
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
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        )
      };
    case ADD_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_CLUB:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case DELETE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case GET_CLUB_RECENT_EVENT_ALBUM:
      return {
        ...state,
        club_recent_event_album: action.payload
      };
    case UPLOAD_CLUB_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPLOAD_CLUB_FACILITY_FAIRWAY_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case DELETE_CLUB_FACILITY_FAIRWAY_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };

    case ADD_CLUB_ALBUM:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case CUD_CLUB_PRF:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    default:
      return state;
  }
}
