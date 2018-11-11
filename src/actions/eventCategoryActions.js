import { GET_EVENT_CATEGORY } from "./types";
import axios from "axios";

export const getEventCategory = () => async dispatch => {
  const res = await axios.get("/api/eventcategory/get");
  dispatch({
    type: GET_EVENT_CATEGORY,
    payload: res.data
  });
};
