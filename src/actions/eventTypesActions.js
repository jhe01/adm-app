import { GET_EVENT_TYPES } from "./types";
import axios from "axios";

export const getEventTypes = () => async dispatch => {
  const res = await axios.get("/api/eventtype/get");
  dispatch({
    type: GET_EVENT_TYPES,
    payload: res.data
  });
};
