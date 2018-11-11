import {
  GET_GOLF_COURSES,
  GET_GOLF_COURSE,
  ADD_GOLF_COURSE,
  UPDATE_GOLF_COURSE
} from "../actions/types";

const initialState = {
  courses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOLF_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case GET_GOLF_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case ADD_GOLF_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses]
      };
    case UPDATE_GOLF_COURSE:
      return {
        ...state,
        courses: state.courses.map(
          course =>
            course._id === action.payload._id
              ? (course = action.payload)
              : course
        )
      };
    default:
      return state;
  }
}
