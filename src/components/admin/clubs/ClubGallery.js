import React from "react";

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

                  <button className="btn-floating halfway-fab waves-effect waves-light blue-grey lighten-3">
                    <i className="material-icons">more_horiz</i>
                  </button>
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
