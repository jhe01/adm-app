import React from "react";
import { MediaBox } from "react-materialize";

export default function ClubFairwaysImages(props) {
  return (
    <React.Fragment>
      {props.fairways
        ? props.fairways.map((fairway, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-image">
                  <img
                    src={`/api/upload/image/${fairway.filename}`}
                    alt="Fairway"
                    className="responsive-img"
                  />
                  <button
                    className="btn-floating halfway-fab waves-effect waves-light red darken-2"
                    onClick={() => {
                      props.onClickDeleteImage(fairway, "fairway");
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </React.Fragment>
  );
}
