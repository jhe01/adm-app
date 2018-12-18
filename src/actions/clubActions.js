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
} from "./types";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swAlert = withReactContent(Swal);

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

export const getRecentEventAlbum = clubid => async dispatch => {
  const res = await axios.get(`/api/album/get/${clubid}/club`);

  dispatch({
    type: GET_CLUB_RECENT_EVENT_ALBUM,
    payload: res.data
  });
};

export const uploadClubImage = club => async dispatch => {
  const formData = new FormData();
  formData.append("file", club.file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  await axios
    .post(`/api/club/upload/add/${club.id}`, formData, config)
    .then(res => {
      dispatch({
        type: UPLOAD_CLUB_IMAGE,
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
      dispatch({ type: GET_ERRORS, payload: err.response.err });
    });
};

export const uploadClubFacilityFairwayImage = club => async dispatch => {
  const formData = new FormData();
  for (let i = 0; i < club.files.length; i++) {
    formData.append("files", club.files[i]);
  }
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  await axios
    .post(
      `/api/club/upload/multiple/${club.id}/${club.imageType}`,
      formData,
      config
    )
    .then(res => {
      dispatch({
        type: UPLOAD_CLUB_FACILITY_FAIRWAY_IMAGE,
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
      dispatch({ type: GET_ERRORS, payload: err.response.err });
    });
};

export const deleteClubFacilityFairwayImage = image => async dispatch => {
  await axios
    .delete(
      `/api/club/upload/files/${image.clubid}/${image.imageType}/${image._id}`
    )
    .then(res => {
      dispatch({
        type: DELETE_CLUB_FACILITY_FAIRWAY_IMAGE,
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
      dispatch({ type: GET_ERRORS, payload: err.response.err });
    });
};

export const addClubAlbum = album => async dispatch => {
  const res = await axios.post("/api/album/add/club", album);
  dispatch({
    type: ADD_CLUB_ALBUM,
    payload: res.data
  });
};

export const addClubPRF = prf => async dispatch => {
  const newPrf = { name: prf.name };
  const res = await axios.post(
    `/api/golfclubs/${prf.type}/add/${prf.clubid}`,
    newPrf
  );
  dispatch({
    type: CUD_CLUB_PRF,
    payload: res.data
  });
};

export const updateClubPRF = prf => async dispatch => {
  const newPrf = {
    name: prf.name,
    is_allowed: prf.is_allowed,
    policyid: prf._id
  };
  const res = await axios.post(
    `/api/golfclubs/${prf.type}/update/${prf.clubid}`,
    newPrf
  );
  dispatch({
    type: CUD_CLUB_PRF,
    payload: res.data
  });

  swAlert.fire({
    title: "Success",
    type: "success",
    showConfirmButton: false,
    timer: 1300
  });
};
