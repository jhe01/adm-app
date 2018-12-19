import React, { Component } from "react";

class ClubGalleryImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image
    };
  }
  render() {
    const { image } = this.state;
    return (
      <div className="col s12 m2">
        <div className="card">
          <div className="card-image">
            <img
              src={`/api/upload/image/${image.filename}`}
              alt={image.originialname}
              className="responsive-img"
            />
          </div>
          <button className="btn-floating halfway-fab waves-effect waves-light red darken-2">
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    );
  }
}

export default ClubGalleryImage;
