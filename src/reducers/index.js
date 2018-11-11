import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import clubReducer from "./clubReducer";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import eventCategoryReducer from "./eventCategoryReducer";
import eventTypesReducer from "./eventTypesReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  event: eventReducer,
  club: clubReducer,
  user: userReducer,
  role: roleReducer,
  eventType: eventTypesReducer,
  eventCategory: eventCategoryReducer,
  auth: authReducer,
  errors: errorReducer
});
