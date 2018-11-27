import {
  GET_EVENTS,
  DELETE_EVENT,
  ADD_EVENT,
  CHANGE_STATUS_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
  GET_ERRORS,
  UPLOAD_EVENT_BANNER
} from "./types";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swAlert = withReactContent(Swal);

export const getEvents = isAdmin => async dispatch => {
  let res = [];
  if (isAdmin) res = await axios.get("/api/events/get_all");
  else res = await axios.get("/api/events/get");

  dispatch({
    type: GET_EVENTS,
    payload: res.data.sort((a, b) => {
      return (
        new Date(b.from || b.dateOfEvent) - new Date(a.from || a.dateOfEvent)
      );
    })
  });
};

export const getEventsByClub = id => async dispatch => {
  const res = await axios.post("/api/events/get_by_club", { clubid: id });
  dispatch({
    type: GET_EVENTS,
    payload: res.data
  });
};

export const getEvent = id => async dispatch => {
  const res = await axios.get(`/api/events/get/${id}`);
  dispatch({
    type: GET_EVENT,
    payload: res.data
  });

  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
export const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    payload: id
  };
};
export const addEvent = (event, history) => async dispatch => {
  await axios
    .post("/api/events/add", event)
    .then(res => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
      swAlert.fire({
        title: "Success",
        type: "success",
        showConfirmButton: false,
        timer: 1300,
        onClose: () => {
          history.push("/events");
        }
      });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });

  // return {
  //   type: ADD_EVENT,
  //   payload: res.data
  // };
};

export const changeStatusEvent = event => async dispatch => {
  const res = await axios.post("/api/events/change_status", event);
  dispatch({
    type: CHANGE_STATUS_EVENT,
    payload: res.data
  });
};

export const updateEvent = (event, history) => async dispatch => {
  await axios
    .post(`/api/events/update/${event._id}`, event)
    .then(res => {
      dispatch({
        type: UPDATE_EVENT,
        payload: res.data
      });
      swAlert.fire({
        title: "Success",
        type: "success",
        showConfirmButton: false,
        timer: 1300,
        onClose: () => {
          history.push("/events");
        }
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const uploadBannerEvent = event => async dispatch => {
  const formData = new FormData();
  formData.append("file", event.file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  await axios
    .post(`/api/upload/add/${event.id}`, formData, config)
    .then(res => {
      dispatch({
        type: UPLOAD_EVENT_BANNER,
        payload: res.data
      });
      swAlert.fire({
        title: "Success",
        type: "success",
        showConfirmButton: false,
        timer: 1300
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: GET_ERRORS, payload: err.response.err });
    });
};
