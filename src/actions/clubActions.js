import {
  GET_GOLF_CLUBS,
  GET_GOLF_CLUB,
  ADD_GOLF_CLUB,
  CHANGE_STATUS_GOLF_CLUB,
  UPDATE_GOLF_CLUB,
  ADD_GOLF_COURSE,
  DELETE_GOLF_COURSE,
  UPDATE_GOLF_COURSE
} from "./types";
import axios from "axios";

export const getClubs = () => async dispatch => {
  const res = await axios.get("/api/golfclubs/get");
  dispatch({
    type: GET_GOLF_CLUBS,
    payload: res.data
  });
};

export const getClub = id => async dispatch => {
  const res = await axios.get(`/api/golfclubs/get/${id}`);
  dispatch({
    type: GET_GOLF_CLUB,
    payload: res.data
  });
};

export const addClub = club => async dispatch => {
  const res = await axios.post("/api/golfclubs/add", club);

  dispatch({
    type: ADD_GOLF_CLUB,
    payload: res.data
  });
};

export const addClubCourse = course => async dispatch => {
  const res = await axios.post("/api/golfclubs/course/add", course);
  dispatch({
    type: ADD_GOLF_COURSE,
    payload: res.data
  });
};

export const deleteClubCourse = course => async dispatch => {
  const res = await axios.post(
    `/api/golfclubs/course/delete/${course.clubid}`,
    course
  );
  dispatch({
    type: DELETE_GOLF_COURSE,
    payload: res.data
  });
};

export const updateClubCourse = course => async dispatch => {
  const res = await axios.post(
    `/api/golfclubs/course/update/${course.clubid}`,
    course
  );
  dispatch({
    type: UPDATE_GOLF_COURSE,
    payload: res.data
  });
};

export const changeStatusGolfClub = club => async dispatch => {
  const res = await axios.post("/api/golfclubs/change_status", club);
  dispatch({
    type: CHANGE_STATUS_GOLF_CLUB,
    payload: res.data
  });
};

export const updateGolfClub = club => async dispatch => {
  const res = await axios.post(`/api/golfclubs/update/${club._id}`, club);
  dispatch({
    type: UPDATE_GOLF_CLUB,
    payload: res.data
  });
};
