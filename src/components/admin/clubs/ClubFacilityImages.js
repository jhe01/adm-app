import React from "react";
import { MediaBox } from "react-materialize";

export default function ClubFacilityImages(props) {
  return (
    <React.Fragment>
      {props.facilities
        ? props.facilities.map((facility, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-image">
                  <img
                    src={`/api/upload/image/${facility.filename}`}
                    alt="Facility"
                    className="responsive-img"
                  />
                </div>
                <button
                  className="btn-floating halfway-fab waves-effect waves-light red darken-2"
                  onClick={() => {
                    props.onClickDeleteImage(facility, "facility");
                  }}
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            );
          })
        : ""}
    </React.Fragment>
  );
}
