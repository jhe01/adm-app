import { GET_ROLES } from "../actions/types";
import axios from "axios";

export const getRoles = () => async dispatch => {
  const res = await axios.get("/api/roles/get");
  dispatch({
    type: GET_ROLES,
    payload: res.data
  });
};
