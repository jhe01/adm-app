import { GET_EVENT_TYPES } from "../actions/types";

const initialState = {
  eventTypes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_TYPES:
      return {
        ...state,
        eventTypes: action.payload
      };
    default:
      return state;
  }
}
