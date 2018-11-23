import React from "react";
import { Link } from "react-router-dom";

export default function ViewActionButton(props) {
  return (
    <div className="row">
      <div className="col s12 view-type-action">
        <Link
          to="/calendar"
          className={`waves-effect waves-light btn grey darken-4 ${
            props.active === "calendar" ? "active" : ""
          }`}
        >
          <i className="material-icons left">date_range</i>
        </Link>
        <Link
          to="/events"
          className={`waves-effect waves-light btn grey darken-4 ${
            props.active === "list" ? "active" : ""
          }`}
        >
          <i className="material-icons left">view_list</i>
        </Link>
      </div>
    </div>
  );
}
