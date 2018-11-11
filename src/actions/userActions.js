import {
  GET_USERS,
  CHANGE_STATUS_USER,
  ADD_USER,
  GET_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import setAuthToken from "../util/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const getUsers = () => async dispatch => {
  const res = await axios.get("/api/users/get");

  dispatch({
    type: GET_USERS,
    payload: res.data
  });
};

export const addUser = user => async dispatch => {
  const res = await axios.post("/api/users/add", user);

  dispatch({
    type: ADD_USER,
    payload: res.data
  });
};

export const changeStatusUser = user => async dispatch => {
  const res = await axios.post("/api/users/change_status", user);
  dispatch({
    type: CHANGE_STATUS_USER,
    payload: res.data
  });
};

export const updateUser = user => async dispatch => {
  const res = await axios.post(`/api/users/update/${user.userid}`, user);
  dispatch({
    type: UPDATE_USER,
    payload: res.data
  });
};

export const changePassword = user => async dispatch => {
  const res = await axios.post(`/api/users/change_pass/${user.userid}`, user);

  dispatch({
    type: CHANGE_PASSWORD,
    payload: res.data
  });
};

export const getUser = id => async dispatch => {
  const res = await axios.get(`/api/users/get/${id}`);

  dispatch({
    type: GET_USER,
    payload: res.data
  });
};

export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
