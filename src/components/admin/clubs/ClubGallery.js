import React from "react";
import { Link } from "react-router-dom";

export default function ClubGallery(props) {
  return (
    <React.Fragment>
      <div className="row">
        {props.albums.map((album, idx) => {
          return (
            <div className="col s12 m3" style={{ marginTop: "5px" }} key={idx}>
              <div className="card">
                <div className="card-image">
                  {album.images[0] ? (
                    <img
                      src={`/api/upload/image/${album.images[0].filename}`}
                      alt={album.name}
                      className="responsive-img"
                    />
                  ) : (
                    ""
                  )}

                  <Link
                    className="btn-floating halfway-fab waves-effect grey lighten-4 action-btn-floating"
                    to={`/club/${album.club_id}/album/${album._id}`}
                  >
                    <i className="material-icons black-text">more_horiz</i>
                  </Link>
                </div>
                <div className="card-content">
                  <span className="card-title">{album.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
