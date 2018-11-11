import { GET_EVENT_CATEGORY } from "../actions/types";

const initialState = {
  eventCategory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_CATEGORY:
      return {
        ...state,
        eventCategory: action.payload
      };
    default:
      return state;
  }
}
