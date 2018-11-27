import {
  GET_EVENTS,
  DELETE_EVENT,
  ADD_EVENT,
  CHANGE_STATUS_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
  UPLOAD_EVENT_BANNER
} from "../actions/types";

const initialState = {
  events: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events]
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? (event = action.payload) : event
        ),
        event: action.payload
      };
    case CHANGE_STATUS_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? (event = action.payload) : event
        ),
        event: action.payload
      };
    case UPLOAD_EVENT_BANNER:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? (event = action.payload) : event
        ),
        event: action.payload
      };
    default:
      return state;
  }
}
