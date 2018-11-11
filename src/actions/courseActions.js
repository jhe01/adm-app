import {
  GET_GOLF_COURSES,
  GET_GOLF_COURSE,
  ADD_GOLF_COURSE,
  UPDATE_GOLF_COURSE
} from "./types";
import axios from "axios";

export const getCourses = () => async dispatch => {
  const res = await axios.get("http://localhost:5000/api/golfcourses/get");
  dispatch({
    type: GET_GOLF_COURSES,
    payload: res.data
  });
};

export const getCourse = id => async dispatch => {
  const res = await axios.get(
    `http://localhost:5000/api/golfcourses/get_clubid/${id}`
  );
  dispatch({
    type: GET_GOLF_COURSE,
    payload: res.data
  });
};

export const addCourse = course => async dispatch => {
  const res = await axios.post(
    "http://localhost:5000/api/golfclubs/course/add",
    course
  );

  dispatch({
    type: ADD_GOLF_COURSE,
    payload: res.data
  });
};

export const updateGolfCourse = course => async dispatch => {
  const res = await axios.post(
    `http://localhost:5000/api/golfcourses/update/${course._id}`,
    course
  );
  dispatch({
    type: UPDATE_GOLF_COURSE,
    payload: res.data
  });
};
